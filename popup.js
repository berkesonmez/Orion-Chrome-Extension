let button = document.getElementById("indir");
button.addEventListener("click", () => {
    let sure = document.getElementById("sure");
    let hatirlaticiTipi = document.getElementById("hatirlaticiTipi");
    let params = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(params, gotTab);
    function gotTab(tab) {
        let msg = {
            sure: sure.value,
            hatirlaticiTipi: hatirlaticiTipi.value
        };
        chrome.tabs.sendMessage(tab[0].id, msg);
        // let buttonClicked = tab => {
        //     // chrome.tabs.update(
        //     //     tab.id,
        //     //     "https://orion.iku.edu.tr:8443/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-client=100&sap-language=tr#ZHER_EXAMS-display"
        //     // );
        // };

        // chrome.pageAction.onClicked.addListener(buttonClicked);
    }
    // alert(
    //     sure.value +
    //         " " +
    //         hatirlaticiTipi.options[hatirlaticiTipi.selectedIndex].value +
    //         " önce hatırlat"
    // );
    // console.log(
    //     sure.value,
    //     hatirlaticiTipi.options[hatirlaticiTipi.selectedIndex].value
    // );
});
