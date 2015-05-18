(function(undefined) {
  var bgPage = chrome.extension.getBackgroundPage();
  var network = bgPage.getNetworksApi();

  var loginFormElement = document.querySelector("#twitter-login");
  loginFormElement.addEventListener("click", function() {
    $("#loading").addClass('show').removeClass('hide');
    $("#loading > #loadingInformation").html("Redirecting you to twitter autentication");
    network.login();
  });

  $("#loading").addClass('hide').removeClass('show');

  if (network.isAuthenticated()) {
    loginFormElement.style.display = "none";

    $("#welcome").addClass('hide').removeClass('show');
    
    var root = document.querySelector("#content");
    
    var input = document.querySelector("#input");

    var loading = document.querySelector("#loading");
    
    

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      $("#loading").addClass('show').removeClass('hide');
      network.fetchTwitter(root,input,loading,tabs[0].url);

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
        network.fetchFacebook(fb_root,fb_input,fb_loading,tabs[0].url);
      });
  }






  var  b_loading = document.querySelector("#b_loading")
      ,b_content = document.querySelector("#b_content");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    $("#b_loading").addClass('show').removeClass('hide');
    network.showSentiments(b_content,b_loading,tabs[0].url,function(chartData){
        
        var dataSet = [];
        _.each(chartData,function(d,i){
          
          if(d.text && dataSet.length<11){
            dataSet.push({label:d.text,data:d.relevance,color: '#'+(Math.random()*0xFFFFFF<<0).toString(16) })
          }
          
        })

        var options = {
          series: {
            pie: {
                show: true,                
                radius: 500,
                label: {
                    show:true,
                    radius: 0.8,
                    formatter: function (label, series) {                
                        return '<div style="border:1px solid grey;font-size:8pt;text-align:center;padding:5px;color:white;">' +
                        label + ' : ' +
                        Math.round(series.percent) +
                        '%</div>';
                    },
                    background: {
                        opacity: 0.8,
                        color: '#000'
                    }
                }
            }
        },
        legend: {
            show: false
        }
      }
      $("#canvas").attr({"style":"height:400px;width:520px;"});
      $.plot($("#canvas"), dataSet, options);

    });

        
  });


})();
