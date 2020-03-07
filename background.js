console.log("background running");

("use strict");

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            hostEquals: "orion.iku.edu.tr",
                            schemes: ["https"]
                        },
                        css: ["div[id='application-ZHER_EXAMS-display'"]
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

console.log("background running");
// let buttonClicked = tab => {
//     chrome.tabs.update(
//         tab.id,
//         "https://orion.iku.edu.tr:8443/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-client=100&sap-language=tr#ZHER_EXAMS-display"
//     );
//     let msg = {
//         txt: "Hello"
//     };
//     chrome.tabs.sendMessage(tab.id, msg);
// };
// chrome.pageAction.onClicked.addListener(buttonClicked);
