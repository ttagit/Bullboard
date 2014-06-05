/************************************************************************************
  This is your background code.
  For more information please visit our wiki site:
  http://docs.crossrider.com/#!/guide/scopes_background
*************************************************************************************/

appAPI.ready(function() {
	// Add the icon from the Resources folder
    // See the note following this code.
    appAPI.browserAction.setResourceIcon('icons/wp-icon.png');
    
    appAPI.browserAction.setPopup({resourcePath:'html/popup.html',height:'300px',width:'300px'});
    // Add a semi-transparent badge
    //
    // NOTE: Call the setBadgeUpdate method again to update the badge
    //appAPI.browserAction.setBadgeText('extn', [255,0,0,125]);
    
    // Add a tooltip
    appAPI.browserAction.setTitle('Open mySite in a new tab');
    
});