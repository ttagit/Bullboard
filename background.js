/************************************************************************************
  This is your background code.
  For more information please visit our wiki site:
  http://docs.crossrider.com/#!/guide/scopes_background
*************************************************************************************/

appAPI.ready(function() {
	// Add the icon from the Resources folder
    // See the note following this code.
    appAPI.browserAction.setResourceIcon('icons/wp-icon.png');
    
    appAPI.browserAction.setPopup({resourcePath:'html/popup.html',height:'500px',width:'500px'});
    // Add a semi-transparent badge
    //
    // NOTE: Call the setBadgeUpdate method again to update the badge
    //appAPI.browserAction.setBadgeText('extn', [255,0,0,125]);
    
    // Add a tooltip
    appAPI.browserAction.setTitle('Open mySite in a new tab');
   //appAPI.db.async.set('style-css', appAPI.resources.get('style.css'));
  appAPI.db.async.set('hello', appAPI.resources.get('js/hello.min.js'));
  appAPI.db.async.set('login', appAPI.resources.get('js/login.js'));
  //appAPI.db.async.set('twitter', appAPI.resources.get('js/twitter.js'));
  appAPI.db.async.set('style-css', appAPI.resources.get('css/style.css'));
  
    
});