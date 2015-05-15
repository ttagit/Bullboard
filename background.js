var api = null;

function getNetworksApi() {
  if (api === null) {
    api = new Networks();
  }

  return api;
}

chrome.extension.onRequest.addListener(function(req, sender, res) {
	if(req.newTab){
		//chrome.tabs.remove(sender.tab.id);
		//chrome.tabs.create({'url': chrome.extension.getURL('welcome.html')}, function(tab) {
		//});
  	}
  	else
  		getNetworksApi().twitter_sign(req.verifier, res);

});


var successURL = 'https://www.facebook.com/connect/login_success.html';
function onFacebookLogin() {
    if (!localStorage.fbToken) {
        chrome.tabs.getAllInWindow(null, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].url.indexOf(successURL) == 0) {
                    var params = tabs[i].url.split('#')[1];
  access = params.split('&')[0]
                    console.log(access);
                    localStorage.setItem('fbToken',access);
                    chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                    return;
                }
            }
        });
    }
}
chrome.tabs.onUpdated.addListener(onFacebookLogin);

