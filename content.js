console.log("Eklenti çalışmaya hazır.");
var cal = ics();
// window.addEventListener("load", myMain, false);

// function myMain(evt) {
//     // alert("hello");
//     // let indir = document.querySelectorAll(
//     //     "ul[id^=__list][id$=-listUl][role=listbox]"
//     // );
//     // console.log(indir);
//     // .appendChild(document.createElement("button"));
//     // '<button id="__button0" data-sap-ui="__button0" aria-describedby="__text0" class="sapMBarChild sapMBtn sapMBtnBase sapMBtnInverted" style="margin-left: auto;"><span id="__button0-inner" class="sapMBtnEmphasized sapMBtnHoverable sapMBtnIconFirst sapMBtnInner sapMBtnText sapMFocusable"><span id="__button0-img" data-sap-ui="__button0-img" role="presentation" aria-hidden="true" data-sap-ui-icon-content="" class="sapMBtnCustomIcon sapMBtnIcon sapMBtnIconLeft sapUiIcon sapUiIconMirrorInRTL" style="font-family:'SAP-icons'"></span><span class="sapMBtnContent" id="__button0-content"><button style="background-color: transparent; color: white; padding: 0; border:none;
//     //            ">Indir</button></span></span></button>
// }

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log("helo");
    console.log(message.sure, message.hatirlaticiTipi);
    moment.locale("tr");
    let sinavlar = document.querySelectorAll(
        "ul[id^=__list][id$=-listUl][role=listbox] > li"
    );
    let gun, isim, yer, vakit, sinavBaslangic, sinavBitis;
    sinavlar.forEach(e => {
        // Sınavlar için
        if (e.id.includes("list")) {
            isim = e
                .querySelector("[id^=__item][id$=titleText-inner]")
                .textContent.split(" - ")[1];
            [sinavBaslangic, sinavBitis] = e
                .querySelector(".sapMObjectNumberText")
                .textContent.split(" - ");
            yer = e.querySelectorAll(".sapMObjLAttrDiv > div > span")[1]
                .textContent;
            vakit = moment(gun + " " + sinavBaslangic, "DD.MM.YYYY HH:mm");
            // console.log(
            //     vakit.format("DD/MM/YY HH:mm"),
            //     isim,
            //     yer,
            //     sinavBaslangic,
            //     "-",
            //     sinavBitis
            // );
            // (str += yer), sinavBaslangic, "-", sinavBitis, "<br>";
            cal.addEvent(
                isim,
                "",
                yer,
                vakit.format("MM/DD/YYYY" + " " + sinavBaslangic),
                vakit.format("MM/DD/YYYY" + " " + sinavBitis),
                message
            );
            // console.log(cal);
        } else if (e.id.includes("__item")) {
            // Tarih için
            gun = e.querySelector(".sapMGHLITitle").textContent;
            // console.log(gun);
        }
    });

    // İndirme bölümü
    javascript: cal.download("Sınavlar");
    let a = [];
    let b = cal.events().length;
    for (let i = 0; i < b; i++) {
        a.push(cal.events().pop());
        // console.log(i);
    }
    cal.events();
}
