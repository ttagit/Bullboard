OAuth.initialize('5Xq8DNluLF0rZ4zXaTkBgaMG1');

var twitterLogin = function(){
	OAuth.popup('twitter', function(error, success){
  	// See the result below
  	console.log(error,success);
	});
}