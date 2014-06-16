(function(undefined) {
  var bgPage = chrome.extension.getBackgroundPage();
  var twitter = bgPage.getTwitterAPI();

  var loginFormElement = document.querySelector("#twitter-login");
  loginFormElement.addEventListener("click", function() {
    twitter.login();
  });

  if (twitter.isAuthenticated()) {
    var root = document.querySelector("#content");
    
    var input = document.querySelector("#input");
    
    

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      twitter.fetchTimelines(root,input,tabs[0].url);

    });
    
  } else {
    loginFormElement.style.display = "block";
  }
})();
