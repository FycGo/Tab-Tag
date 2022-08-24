/*global chrome*/
async function getCurrentTabs() {
    // let queryOptions = { active: true, lastFocusedWindow: true };
    let queryOptions = {};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let tabsPromise = await chrome.tabs.query(queryOptions);
    return tabsPromise;
}

async function getTabsInformation() {

    const PromiseA = chrome.tabs.onCreated.addListener(() => {
        setTimeout(() => {
            getCurrentTabs().then((tabsPromise) => {
                let tabs = [];
                for (let tab of tabsPromise){
                    tabs.push( {
                            id: tab.id,
                            title: tab.title,
                            url: tab.url,
                        }
                    )
                }
                chrome.storage.local.get({ "list": [] }, function (object) {
                    let dataList = object["list"];
                    for (let tab of tabsPromise){
                        dataList.push(tab);
                    }
                    chrome.storage.local.set({ "list": dataList });
                })
                console.log(tabs.length);
                const tabsJson = JSON.stringify(tabs);
                console.log(tabsJson);
            });
        }, 1000)
    });
    const PromiseB = chrome.tabs.onRemoved.addListener(() => {
        setTimeout(() => {
            getCurrentTabs().then((tabsPromise) => {
                let tabs = [];
                for (let tab of tabsPromise){
                    tabs.push( {
                            id: tab.id,
                            title: tab.title,
                            url: tab.url,
                        }
                    )
                }
                console.log(tabs.length);
                const tabsJson = JSON.stringify(tabs);
                console.log(tabsJson);
            });
        }, 1000)
    });
    const [a, b] = await Promise.all([PromiseA, PromiseB]);
    return [a, b];
}

getTabsInformation();



chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "log") {
        chrome.storage.local.get({ "list": [] }, function (object) {
            let dataList = object["list"];
            dataList.push(info.selectionText);
            chrome.storage.local.set({ "list": dataList });
        })
    }
});

// chrome.tabs.onCreated.addListener(() => {
//     getCurrentTabs().then((tabsPromise) => {
//         let tabs = {
//             id: tabsPromise[0].id,
//             title: tabsPromise[0].title,
//             url: tabsPromise[0].url,
//             tag: -1,
//         };
//         console.log(tabsPromise.length);
//         const tabsJson = JSON.stringify(tabs);
//         console.log(tabsJson);
//     });
// });
// chrome.tabs.onRemoved.addListener(() => {
//     getCurrentTabs().then((tabsPromise) => {
//         let tabs = {
//             id: tabsPromise[0].id,
//             title: tabsPromise[0].title,
//             url: tabsPromise[0].url,
//             tag: -1,
//         };
//         console.log(tabsPromise.length);
//         const tabsJson = JSON.stringify(tabs);
//         console.log(tabsJson);
//     });
// })
// getCurrentTabs().then((tabsPromise) => {
//     let tabs = {
//         id: tabsPromise[0].id,
//         title: tabsPromise[0].title,
//         url: tabsPromise[0].url,
//     };
//     console.log(tabsPromise.length);
//     const tabsJson = JSON.stringify(tabs);
//     console.log(tabsJson);
// });
// const tabs = getCurrentTabs();
// tabs.then()
// console.log(getCurrentTabs()[0].id);

// let tabs = await chrome.tabs.query()
// chrome.runtime.onInstalled.addListener(() => {
//     chrome.contextMenus.create({
//     id: 'log',
//     title: "请选择Tag:",
//     contexts: ["selection"]
//     });
// });