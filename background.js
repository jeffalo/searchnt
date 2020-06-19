var host = "https://google.com";

var rulesArr = []
//load saved rules in
function loadRules(){
    //TODO: make it load rules to an array or something
    chrome.storage.sync.get(['rules'], function(result) {
        rulesArr = JSON.parse(result.rules)
        console.log(rulesArr)
      });
    
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
         return {redirectUrl: host + details.url.match(/^https?:\/\/[^\/]+([\S\s]*)/)[1]};
    },
    {
        urls: [
            "*://bing.com/search*",
            "*://www.bing.com/search*"
        ],
        types: ["main_frame"]
    },
    ["blocking"]
);
