// Variables to store file uploaded.
var allFiles = [];
var numberOfValidatedFile = 0;

// Show form
$( document ).ready(function() {
  $('#preference-box').transition('slide down');
  setTimeout(function(){ saySomething(false, "Welcome welcome, you can give the dish detail below :)"); }, 500);
});

// Fake file-upload-button clicked
$("#file-upload").on("click", function() {
   $('#hidden-file-upload').click();
});

// Uploading a new file
$("#hidden-file-upload").on("change", function(e) {
  var files = e.target.files;
  var f = files[0];

  if (f.type.match('image.*') && numberOfValidatedFile <= 4) {
    // update necessary things
    numberOfValidatedFile ++;
    $('#images').val('ok');

    // render to view
    var id = allFiles.length;
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        allFiles.push(e.target.result);
        var text = '<div class="thumb" id="image-'+id+'" style="display: none">' +
          '<img src="'+e.target.result+'">' +
          '<i class="remove circle icon red big remove-button" onclick="removeFile('+id+')"></i>' +
        '</div>';

        $("#list").append(text);
        $("#image-"+id).transition('scale');
      };
    })(f);
    reader.readAsDataURL(f);
  } else {
    saySomething(true, "Sorry you cannot upload too many images!")
  }
})

// Delete an uploaded image
function removeFile(id) {
  $("#image-"+id).transition('scale');
  allFiles[id] = 'null';
  numberOfValidatedFile --;
  if (numberOfValidatedFile == 0) {
    $('#images').val('');
  }
}
function removeAllFiles() {
  numberOfValidatedFile = 0;
  allFiles = [];
  $('#images').val('');
  $('#list').html('');
}

// Submit Form Handling
$("#submit-button").on("click", function() {
  // $("#submit-button").addClass("loading");
});

// Form Validation
$("#form-new-dish").form({
    dishname: {
      identifier: 'dish-name',
      rules: [{
        type   : 'empty',
        prompt : 'Please enter the dish name'
      }]
    },
    cuisine: {
      identifier: 'cuisine',
      rules: [{
        type    : 'empty',
        prompt  : 'Please choose the cuisine'
      }]
    },
    vegetarian: {
      identifier: 'is-vegetarian',
      rules: [{
        type    : 'checked',
        prompt  : 'Please specify if the food is vegetarian'
      }]
    },
    vegetarian: {
      identifier: 'is-vegetarian',
      rules: [{
        type    : 'checked',
        prompt  : 'Please specify if the food is vegetarian'
      }]
    },
    spicy: {
      identifier: 'spicy-level',
      rules: [{
        type    : 'checked',
        prompt  : 'Please specify the spicy level'
      }]
    },
    sour: {
      identifier: 'sour-level',
      rules: [{
        type    : 'checked',
        prompt  : 'Please specify the sour level'
      }]
    },
    sweet: {
      identifier: 'sweet-level',
      rules: [{
        type    : 'checked',
        prompt  : 'Please specify the sweet level'
      }]
    },
    salty: {
      identifier: 'salty-level',
      rules: [{
        type    : 'checked',
        prompt  : 'Please specify the salty level'
      }]
    },
    fat: {
      identifier: 'fat-level',
      rules: [{
        type    : 'checked',
        prompt  : 'Please specify the fat level'
      }]
    },
    fiber: {
      identifier: 'fiber-level',
      rules: [{
        type    : 'checked',
        prompt  : 'Please specify the fiber level'
      }]
    },
    calorie: {
      identifier: 'calorie-level',
      rules: [{
        type    : 'checked',
        prompt  : 'Please specify the calorie level'
      }]
    },
    description: {
      identifier: 'description',
      rules: [{
        type    : 'empty',
        prompt  : 'Please give some description about the dish'
      }]
    },
    images: {
      identifier: 'images',
      rules: [{
        type    : 'empty',
        prompt  : 'Please upload at least 1 image of the dish'
      }]
    }
}, {
  onSuccess: function() {
    submitForm();
    return false;
  },
  onFailure: function() {
    saySomething(true, "Opss, there are some errors :(")
    return false;
  }
});

// Submitting Form
function submitForm() {
  // preparing data
  var formData = {
    name:         $('#form-new-dish').find('input[name="dish-name"]').val(),
    cuisine:      $('#form-new-dish').find('select[name="cuisine"]').val(),
    sweetLevel:   $('#form-new-dish').find('input[name="sweet-level"]:checked').val(),
    spicyLevel:   $('#form-new-dish').find('input[name="spicy-level"]:checked').val(),
    sourLevel:    $('#form-new-dish').find('input[name="sour-level"]:checked').val(),
    saltyLevel:   $('#form-new-dish').find('input[name="salty-level"]:checked').val(),
    fatLevel:     $('#form-new-dish').find('input[name="fat-level"]:checked').val(),
    carbLevel:    $('#form-new-dish').find('input[name="carb-level"]:checked').val(),
    calorieLevel: $('#form-new-dish').find('input[name="calorie-level"]:checked').val(),
    fiberLevel:   $('#form-new-dish').find('input[name="fiber-level"]:checked').val(),
    isVegetarian: $('#form-new-dish').find('input[name="is-vegetarian"]:checked').val(),
    hasSoup:      $('#form-new-dish').find('input[name="has-soup"]:checked').val(),
    description:  $('#description').val(),
    images:       JSON.stringify(allFiles),
  };

  $("#form-new-dish").addClass("loading");

  // Ajax post
  $.ajax({ type: 'POST', url: '/api/dishes', data: formData,
    success: function(data) {
      console.log(data);
      removeAllFiles();
      $("#form-new-dish").form("reset");
      $("#form-new-dish").removeClass("loading");
      saySomething(true, "Thanks for the dish. I am gonna get fat <3");
    },
    error: function() {

  }});
}
