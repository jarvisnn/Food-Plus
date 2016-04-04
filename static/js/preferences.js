// current dishes results
var currentData;
var currentDish;
var currentTab;


// Preference button clicked
$("#preference-button").on("click", function() {
  $('#outer-box').transition('slide down');
})


// Show preference box & preference button
$( document ).ready(function() {
  $("#preference-link").hide();
  $("#preference-button").show();
  $('#outer-box').transition('slide down');
  setTimeout(function(){ saySomething(true, "Hello, how are you today?"); }, 500);
});


// Uncheckable Radio buttons
$('.ui.radio').checkbox({
  uncheckable: true
});


// Image slider
$('#left-arr').click(function() {
  currentTab = (currentTab + 1) % currentData[currentDish].images;
  resetTab(currentTab);
});
$('#right-arr').click(function() {
  console.log("testing")
  currentTab = (currentTab + currentData[currentDish].images - 1) % currentData[currentDish].images;
  resetTab(currentTab);
});
function resetTab(index) {
  for (i = 0; i < currentData[currentDish].images; i++) {
    $('#tab'+i).removeClass('active')
  }
  $('#tab'+index).addClass('active')
}


// Preference Form Validation
$("#form-preference").form({
  cuisine: {
  identifier: 'cuisine',
  rules: [{
    type    : 'empty',
    prompt  : 'Please choose the cuisine'
  }]
}}, {
  onSuccess: function() {
    submitForm();
    return false;
  },
  onFailure: function() {
    saySomething(true, "Opss, there are some errors :(")
    return false;
  }
});


// Submiting Preference Form
function submitForm() {
  // set form to loading
  $('#form-preference').addClass("loading");

  // preparing data
  var formData = {
    cuisine:      $('#form-preference').find('select[name="cuisine"]').val(),
    sweetLevel:   filter($('#form-preference').find('input[name="sweet-level"]:checked').val()),
    spicyLevel:   filter($('#form-preference').find('input[name="spicy-level"]:checked').val()),
    sourLevel:    filter($('#form-preference').find('input[name="sour-level"]:checked').val()),
    saltyLevel:   filter($('#form-preference').find('input[name="salty-level"]:checked').val()),
    fatLevel:     filter($('#form-preference').find('input[name="fat-level"]:checked').val()),
    calorieLevel: filter($('#form-preference').find('input[name="calorie-level"]:checked').val()),
    fiberLevel:   filter($('#form-preference').find('input[name="fiber-level"]:checked').val()),
    isVegetarian: filter($('#form-preference').find('input[name="is-vegetarian"]:checked').val()),
  };

  // Ajax post
  $.ajax({ type: 'POST', url: '/api/preferences', data: formData,
    success: function(data) {
      $('#form-preference').removeClass("loading");
      $('#outer-box').transition('slide down');
      renderCards(data);
    },
    error: function() {

  }});
}


//Rendering cards
var cardColors = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"];
var numColors = cardColors.length;

function renderCards(data) {
  currentData = data;
  var content = "";
  var index = 0;

  for (i = 0; i < data.length; i++) {
    content += `
      <div id="card-`+i+`" class="dish-card ui `+cardColors[index]+` card" style="display:none" onclick="clickCard(`+i+`)">
        <div class="image">
          <img src="/static/images/dishes/`+data[i].id+`_1_square.jpeg">
        </div>
        <div class="content">
          <div class="header left floated">`+data[i].name+`</div>
          <div class="right floated">
            <i class="star icon card-star"></i>`+Math.round(data[i].stars * 100) / 100+`
          </div>
        </div>
      </div>`;
    index = (index + 1) % numColors;
  }
  $("#dish-cards").html(content);
  // show cards
  $('.dish-card').transition({
    animation : 'horizontal flip',
    interval  : 140
  })
  saySomething(false, "You can click the dishes for more information!")
}


// Card Clicked - Show detail
function clickCard(id) {
  currentDish = id;

  // Name
  $("#detail-name").text(currentData[id].name);

  // Description
  $("#detail-description").text(currentData[id].description);

  // Tags
  var index = 0;
  var tags = "";
  if (currentData[id].vegetarian == 'TRUE') {
    tags += `<a class="ui `+cardColors[index]+` basic label">vegetarian</a>`;
    index = (index + 1) % numColors;
  }
  tags += `<a class="ui `+cardColors[index]+` basic label">`+currentData[id].spicyLevel+`</a>`;
  index = (index + 1) % numColors;
  tags += `<a class="ui `+cardColors[index]+` basic label">`+currentData[id].sourLevel+`</a>`;
  index = (index + 1) % numColors;
  tags += `<a class="ui `+cardColors[index]+` basic label">`+currentData[id].saltyLevel+`</a>`;
  index = (index + 1) % numColors;
  tags += `<a class="ui `+cardColors[index]+` basic label">`+currentData[id].sweetLevel+`</a>`;
  index = (index + 1) % numColors;
  tags += `<a class="ui `+cardColors[index]+` basic label">`+currentData[id].fatLevel+`</a>`;
  index = (index + 1) % numColors;
  tags += `<a class="ui `+cardColors[index]+` basic label">`+currentData[id].calorieLevel+`</a>`;
  index = (index + 1) % numColors;
  tags += `<a class="ui `+cardColors[index]+` basic label">`+currentData[id].fiberLevel+`</a>`;
  index = (index + 1) % numColors;
  $("#detail-tags").html(tags);

  // Stars
  $("#detail-rating").text("Rating: "+Math.round(currentData[id].stars * 100) / 100);
  for (i = 1; i <= 5; i ++) {
    if (currentData[id].stars < i-1 + 0.25) {
      $("#header-star-"+i).removeClass("star")
      $("#header-star-"+i).removeClass("empty star")
      $("#header-star-"+i).removeClass("star half empty")
      $("#header-star-"+i).addClass("empty star")
    } else if (currentData[id].stars > i-1 + 0.75) {
      $("#header-star-"+i).removeClass("star")
      $("#header-star-"+i).removeClass("empty star")
      $("#header-star-"+i).removeClass("star half empty")
      $("#header-star-"+i).addClass("star")
    } else {
      $("#header-star-"+i).removeClass("star")
      $("#header-star-"+i).removeClass("empty star")
      $("#header-star-"+i).removeClass("star half empty")
      $("#header-star-"+i).addClass("star half empty")
    }
  }

  // Images
  var imagesText = "";
  for (i = 1; i <= currentData[id].images; i++) {
    if (i == 1) {
      imagesText += `
      <div id="tab`+(i-1)+`" class="ui bottom attached tab active" data-tab="`+(i-1)+`">
        <img src="/static/images/dishes/`+currentData[id].id+`_`+i+`_square.jpeg" style="width:100%"/>
      </div>`;
    } else {
      imagesText += `
      <div id="tab`+(i-1)+`" class="ui bottom attached tab" data-tab="`+(i-1)+`">
        <img src="/static/images/dishes/`+currentData[id].id+`_`+i+`_square.jpeg" style="width:100%"/>
      </div>`;
    }
  }
  $("#modal-image-tabs").html(imagesText);
  currentTab = 0;
  if (currentData[id].images == 1) {
    $('#left-arr').hide();
    $('#right-arr').hide();
  } else {
    $('#left-arr').show();
    $('#right-arr').show();
  }

  // Comments
  $.ajax({ type: 'GET', url: '/api/reviews', data: {"dishId": currentData[id].id},
    success: function(data) {
      showComments(data);
    },
    error: function() {

  }});
  // Show
  $("#modal-card-detail").modal('show');
}

// Show comments
function showComments(data) {
  var text = "";
  for (i = 0; i < data.length; i++) {
    var imageSize = 500;
    var margintop  =  Math.floor((Math.random() * (imageSize-50)) + 1);
    var marginleft =  Math.floor((Math.random() * (imageSize-50)) + 1);;
    text +=
    `<div class="comment">
      <div class="avatar" style="height:35px !important;overflow: hidden;">
        <img src="/static/images/avatar.png" style="width:`+imageSize+`px;height:`+imageSize+`px;
                                            margin-top:-`+margintop+`px;margin-left:-`+marginleft+`px">
      </div>
      <div class="content">
        <a class="author">`+data[i].reviewer+`</a>
        <div class="metadata">
          <span class="date">`+(new Date(data[i].createdTime)).toDateString()+`</span>
        </div>
        <div class="text">
          `+data[i].comment+`
        </div>
      </div>
    </div>`;
  }
  $("#comments").html(text);
}


//------------------------------------------------------------------------------
// REVIEWSSSSS

// Show the new review form
$("#review-new-button").click(function() {
  $("#review-form").transition('slide down');
});


// Click a star
function clickStar(id) {
  for(i = 1; i <= id; i++) {
    $("#star-"+i).removeClass("empty star")
    $("#star-"+i).addClass("star")
  }
  for(i = id+1; i <= 5; i++) {
    $("#star-"+i).removeClass("star")
    $("#star-"+i).addClass("empty star")
  }
  $('#review-form').find('input[name="review-stars"]').val(id);
}


// REview Form Validation
$("#review-form").form({
    reviewName: {
      identifier: 'review-name',
      rules: [{
        type   : 'empty',
        prompt : 'Please enter name'
      }]
    },
    reviewComment: {
      identifier: 'review-comment',
      rules: [{
        type    : 'empty',
        prompt  : 'Please give some comment'
      }]
    },
    reviewStars: {
      identifier: 'review-stars',
      rules: [{
        type    : 'empty',
        prompt  : 'Please rate the dish'
      }]
    }
}, {
  onSuccess: function() {
    submitReview();
    // Reset Form
    $("#review-form").transition('slide down');
    clickStar(0);
    $("#review-form").form('reset');
    return false;
  },
  onFailure: function() {
    return false;
  }
});


// Submitting Review Form
function submitReview() {
  // preparing data
  var formData = {
    reviewer:         $('#review-form').find('input[name="review-name"]').val(),
    comment:          $('#review-comment').val(),
    stars:            $('#review-form').find('input[name="review-stars"]').val(),
    dishName:         currentData[currentDish].name,
    dishId:           currentData[currentDish].id,
  };

  // Ajax post
  $.ajax({ type: 'POST', url: '/api/reviews', data: formData,
    success: function(data) {
      var text = $("#comments").text();
      var imageSize = 500;
      var margintop  =  Math.floor((Math.random() * (imageSize-50)) + 1);
      var marginleft =  Math.floor((Math.random() * (imageSize-50)) + 1);
      var currentTime = new Date();
      text =
      `<div class="comment">
        <div class="avatar" style="height:35px !important;overflow: hidden;">
          <img src="/static/images/avatar.png" style="width:`+imageSize+`px;height:`+imageSize+`px;
                                              margin-top:-`+margintop+`px;margin-left:-`+marginleft+`px">
        </div>
        <div class="content">
          <a class="author">`+formData.reviewer+`</a>
          <div class="metadata">
            <span class="date">`+currentTime.toDateString()+`</span>
          </div>
          <div class="text">
            `+formData.comment+`
          </div>
        </div>
      </div>` + $("#comments").html();
      $("#comments").html(text);
    },
    error: function() {

  }});
}



// Utilities
function filter(text) {
  return (text == undefined) ? "?" : text;
}
