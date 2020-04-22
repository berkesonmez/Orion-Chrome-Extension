let button = document.getElementById("indir");
button.addEventListener("click", () => {
    let sure = document.getElementById("sure");
    let hatirlaticiTipi = document.getElementById("hatirlaticiTipi");
    let params = {
        active: true,
        currentWindow: true,
    };
    chrome.tabs.query(params, gotTab);
    function gotTab(tab) {
        let msg = {
            sure: sure.value,
            hatirlaticiTipi: hatirlaticiTipi.value,
        };
        chrome.tabs.sendMessage(tab[0].id, msg);
    }
});
