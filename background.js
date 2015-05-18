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

// curl -X POST \
//   -F 'object=http://hiteshjoshi.com' \
//   https://graph.facebook.com/me/og.likes?access_token=CAAMfkXeurTQBAOqCk08S5gGBAMoypIjpLiWWzGT7GozDR5Q0U3q25pcSzhRqavsQaZAkcOmayKZBVhvlGPRamCPjadrdOLQg42RTChVS0kSgi4LxoF12hM8zeIqhl36p66Ish9WVjoo1umuZAdv7drEjEZA2ZA2iTB7X5c3Kb55yGdTeJGW2EoJ0EmP6Qv7UEsd0VlKaZCYE5ujhA1W2KVc0S2GvfsrZAoZD

//https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27http://www.google.com%27
//https://graph.facebook.com/fql?q=SELECT url, like,normalized_url, share_count, like_count, comment_count, total_count,commentsbox_count, comments_fbid, click_count FROM link_stat WHERE url='http://www.google.com'
//https://graph.facebook.com/fql?access_token=CAAMfkXeurTQBAOqCk08S5gGBAMoypIjpLiWWzGT7GozDR5Q0U3q25pcSzhRqavsQaZAkcOmayKZBVhvlGPRamCPjadrdOLQg42RTChVS0kSgi4LxoF12hM8zeIqhl36p66Ish9WVjoo1umuZAdv7drEjEZA2ZA2iTB7X5c3Kb55yGdTeJGW2EoJ0EmP6Qv7UEsd0VlKaZCYE5ujhA1W2KVc0S2GvfsrZAoZD&q=SELECT url FROM url_like WHERE user_id=100000057672522 AND url='http://google.com'
//https://api.facebook.com/method/links.getStats?urls=http://hiteshjoshi.com&format=json
//URL FOR INSIGHT
//https://graph.facebook.com/fql?q=SELECT%20url%20FROM%20url_like%20WHERE%20user_id=100000057672522%20AND%20url=%27http://google.com%27




//Save token after logging in
var successURL = 'https://www.facebook.com/connect/login_success.html';
function onFacebookLogin() {
    if (!localStorage.getItem('fbToken')) {
        chrome.tabs.getAllInWindow(null, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].url.indexOf(successURL) == 0) {
                    var params = tabs[i].url.split('#')[1];
                    access = params.split('&')[0]
                    localStorage.setItem('fbToken',access);
                    chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                    return;
                }
            }
        });
    }
}
chrome.tabs.onUpdated.addListener(onFacebookLogin);

