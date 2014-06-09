hello.init({ 
      twitter : '5Xq8DNluLF0rZ4zXaTkBgaMG1'
    },{redirect_uri:'redirect.html',oauth_proxy : 'http://labs.stirringminds.com:8888/oauthproxy'});


    hello.on('auth.login', function(r){
    console.log(r);    
      hello.api(r.network+':/me', function(p){
        console.log(p)
        document.getElementById('login').innerHTML = "<img src='"+ p.thumbnail + "' width=24/>Connected to "+ r.network+" as " + p.name;
      });

    });