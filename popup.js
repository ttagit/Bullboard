(function(undefined) {
  var bgPage = chrome.extension.getBackgroundPage();
  var twitter = bgPage.getNetworksApi();

  var loginFormElement = document.querySelector("#twitter-login");
  loginFormElement.addEventListener("click", function() {
    $("#loading").addClass('show').removeClass('hide');
    $("#loading > #loadingInformation").html("Redirecting you to twitter autentication");
    twitter.login();
  });

  $("#loading").addClass('hide').removeClass('show');

  if (twitter.isAuthenticated()) {
    loginFormElement.style.display = "none";

    $("#welcome").addClass('hide').removeClass('show');
    
    var root = document.querySelector("#content");
    
    var input = document.querySelector("#input");

    var loading = document.querySelector("#loading");
    
    

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      $("#loading").addClass('show').removeClass('hide');
      twitter.fetchTwitter(root,input,loading,tabs[0].url);

    });

  } else {
    $("#welcome").addClass('show').removeClass('hide');
    loginFormElement.style.display = "block";
  }

  var fbLoginFormElement = document.querySelector("#facebook-login");
  if (localStorage.fbToken) {
      fbLoginFormElement.style.display = "none";
      var fb_root = document.querySelector("#fb_content");
    
      var fb_input = document.querySelector("#fb_input");

      var fb_loading = document.querySelector("#fb_loading");

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        $("#fb_loading").addClass('show').removeClass('hide');
        twitter.fetchFacebook(fb_root,fb_input,fb_loading,tabs[0].url);
      });
  }


})();
