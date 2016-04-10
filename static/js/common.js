// Cookie + csrftoken things
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});


// The cat - messenger
var isTalking = false;

function saySomething(standup, message) {
  if (isTalking) {
    $("#the-message").text(message);
    return;
  }
  isTalking = true;
  $("#the-message").text(message);
  if (standup) {
    $('#the-cat').animate({ 'margin-top' : "-20px"});
    setTimeout(function(){ $("#the-message").transition('swing down'); }, 400);
    setTimeout(function(){ $("#the-message").transition('swing down'); }, 3400);
    setTimeout(function(){ $('#the-cat').animate({ 'margin-top' : "5px"}); }, 3800);
    setTimeout(function(){isTalking = false;}, 3900);
  } else {
    $("#the-message").transition('swing down');
    setTimeout(function(){ $("#the-message").transition('swing down'); }, 3000);
    setTimeout(function(){isTalking = false;}, 3100);
  }
}

// Touch the cat
$("#the-cat").mouseover(function() {
  console.log(isTalking);
  if (!isTalking) {
    saySomething(false, "Don't touch me! I am eating!");
  }
});


// Cookies
var createCookie = function(name, value) {
    var expires;
    expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
