console.log("Eklenti çalışmaya hazır.");
var cal = ics("Sınavlar", null);

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message.sure, message.hatirlaticiTipi);
    moment.locale("tr");
    try {
        let sinavlar = document.querySelectorAll(
            "ul[id^=__list][id$=-listUl][role=listbox] > li"
        );
        let gun, isim, yer, vakit, sinavBaslangic, sinavBitis;
        sinavlar.forEach((e) => {
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
        }
        cal.events();
    } catch (err) {
        alert("Sınavlar Bulunamadı\nHata: " + err.message);
    }
}
