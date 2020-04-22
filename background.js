console.log("background running");

("use strict");

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            hostEquals: "orion.iku.edu.tr",
                            schemes: ["https"],
                        },
                        css: ["div[id='application-ZHER_EXAMS-display'"],
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
});

console.log("background running");
