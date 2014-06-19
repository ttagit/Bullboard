(function(undefined) {
  var bgPage = chrome.extension.getBackgroundPage();
  var twitter = bgPage.getTwitterAPI();

  var loginFormElement = document.querySelector("#twitter-login");
  loginFormElement.addEventListener("click", function() {
    $("#loading").addClass('show').removeClass('hide');
    $("#loading > #loadingInformation").html("Redirecting you to twitter autentication");
    twitter.login();
  });

  if (twitter.isAuthenticated()) {
    var root = document.querySelector("#content");
    
    var input = document.querySelector("#input");

    var loading = document.querySelector("#loading");
    
    

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      twitter.fetchTimelines(root,input,loading,tabs[0].url);

      // var tweetInput = $("<div>").attr("id","newTweet").prepend(
      //  $("<textarea>").attr("class","inputbox")
      // );
      
      // tweetInput.append(
      //   $("<button>").html("Tweet about this page").attr("id","sendTweet")
      //   .click(function(){
      //     twitter.postTweet(tweetInput,tabs[0].url);
      //     })
      // );

      // $(input).append(tweetInput);

    });

  } else {
    $("#loading").addClass('hide').removeClass('show');
    loginFormElement.style.display = "block";
  }
})();
