/*global chrome*/
async function getCurrentTabs() {
    // let queryOptions = { active: true, lastFocusedWindow: true };
    let queryOptions = {currentWindow: true};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let tabsPromise = await chrome.tabs.query(queryOptions);
    return tabsPromise;
}
async function getTab(tabId) {
    const tab = await chrome.tabs.get(tabId);
    return tab;
}
setTimeout(() => {
    getCurrentTabs().then((tabsPromise) => {
        chrome.storage.local.clear(function (){
            console.log("clear all storage")
        });
        chrome.storage.local.get({ "list": [] }, function (object) {
            let dataList = object["list"];
            for (let tab of tabsPromise){
                dataList.push({
                    tag: "else",
                    id: tab.id,
                    groupId: tab.groupId,
                    windowId: tab.windowId,
                    title: tab.title,
                    url: tab.url,
                });
            }
            chrome.storage.local.set({ "list": dataList });
        })
    });
}, 500);


// when create a new tab, add tab information to chrome.storage.local
chrome.tabs.onCreated.addListener((tab) => {
    setTimeout(() => {
        chrome.storage.local.get({ "list": [] }, function (object) {
            let dataList = object["list"];
            setTimeout(() => {
                getTab(tab.id).then((nowTab) => {
                    dataList.splice(tab.index, 0 , {
                        tag: "else",
                        id: nowTab.id,
                        groupId: nowTab.groupId,
                        windowId: nowTab.windowId,
                        title: nowTab.title,
                        url: nowTab.url,

                    });
                })
            }, 300);
            setTimeout(() => {chrome.storage.local.set({ "list": dataList })}, 400);
        })
    }, 500)
});
// when remove a new tab, delete tab information from chrome.storage.local
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log(removeInfo);
    chrome.storage.local.get({ "list": [] }, function (object) {
        let dataList = object["list"];
        const isTabId = (element) => element.id == tabId;
        let index = dataList.findIndex(isTabId);
        dataList.splice(index, 1)
        chrome.storage.local.set({ "list": dataList });
    });
});
chrome.tabs.onDetached.addListener((tabId, detachInfo) => {
    console.log(detachInfo);
    chrome.storage.local.get({ "list": [] }, function (object) {
        let dataList = object["list"];
        const isTabId = (element) => element.id == tabId;
        let index = dataList.findIndex(isTabId);
        dataList.splice(index, 1)
        chrome.storage.local.set({ "list": dataList });
    });
});
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log(changeInfo);
//     console.log(tab);
//     setTimeout(() => {
//         chrome.storage.local.get({ "list": [] }, function (object) {
//             let dataList = object["list"];
//             setTimeout(() => {
//                 getTab(tabId).then((nowTab) => {
//                     dataList.splice(nowTab.index, 1 , {
//                         tag: "else",
//                         id: nowTab.id,
//                         groupId: nowTab.groupId,
//                         windowId: nowTab.windowId,
//                         title: nowTab.title,
//                         url: nowTab.url,
//                     });
//                 })
//             }, 300);
//             setTimeout(() => {chrome.storage.local.set({ "list": dataList })}, 400);
//         })
//     }, 500)
// });
// chrome.tabs.onAttached.addListener((tabId, attachedInfo) => {
//     console.log(attachedInfo);
//     setTimeout(() => {
//         chrome.storage.local.get({ "list": [] }, function (object) {
//             let dataList = object["list"];
//             setTimeout(() => {
//                 getTab(tabId).then((nowTab) => {
//                     dataList.splice(nowTab.index, 0 , {
//                         tag: "else",
//                         id: nowTab.id,
//                         groupId: nowTab.groupId,
//                         windowId: nowTab.windowId,
//                         title: nowTab.title,
//                         url: nowTab.url,
//                     });
//                 })
//             }, 300);
//             setTimeout(() => {chrome.storage.local.set({ "list": dataList })}, 400);
//         })
//     }, 500)
// });
// chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
//     setTimeout(() => {
//         chrome.storage.local.get({ "list": [] }, function (object) {
//             let dataList = object["list"];
//             console.log(tabId);
//             dataList[moveInfo.fromIndex] = dataList.splice(moveInfo.toIndex, 1, dataList[moveInfo.fromIndex])[0];
//             setTimeout(() => {chrome.storage.local.set({ "list": dataList })}, 300);
//         });
//     }, 500);
// });
// chrome.tabs.onActivated.addListener(() => {
//     setTimeout(() => {
//         getCurrentTabs().then((tabsPromise) => {
//             chrome.storage.local.clear(function (){
//                 console.log("clear all storage")
//             });
//             chrome.storage.local.get({ "list": [] }, function (object) {
//                 let dataList = object["list"];
//                 for (let tab of tabsPromise){
//                     dataList.push({
//                         tag: "else",
//                         id: tab.id,
//                         groupId: tab.groupId,
//                         windowId: tab.windowId,
//                         title: tab.title,
//                         url: tab.url,
//                     });
//                 }
//                 chrome.storage.local.set({ "list": dataList });
//             })
//             // console.log(tabs.length);
//             // const tabsJson = JSON.stringify(tabs);
//             // console.log(tabsJson);
//         });
//     }, 500)
// });

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
    id: 'default01',
    title: "default01",
    contexts: ["page"],
    type: "normal"
    });
    chrome.contextMenus.create({
    id: 'default02',
    title: "default02",
    contexts: ["page"],
    type: "normal"
    });
    chrome.contextMenus.create({
    id: 'default03',
    title: "default03",
    contexts: ["page"],
    type: "normal"
    });
    chrome.contextMenus.create({
    id: 'default04',
    title: "default04",
    contexts: ["page"],
    type: "normal"
    });
    chrome.contextMenus.create({
    id: 'default05',
    title: "add a new tag",
    contexts: ["page"],
    type: "normal"
    });
});
//鼠标右键菜单点击响应事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "default01") {
        chrome.storage.local.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                if(tabTag.id == tab.id) {
                    tabTag.tag = info.menuItemId;
                }
            });
            chrome.storage.local.set({ "list": dataList });
        })
    }
    if (info.menuItemId == "default02") {
        chrome.storage.local.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                if(tabTag.id == tab.id) {
                    tabTag.tag = info.menuItemId;
                }
            });
            chrome.storage.local.set({ "list": dataList });
        })
    }
    if (info.menuItemId == "default03") {
        chrome.storage.local.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                if(tabTag.id == tab.id) {
                    tabTag.tag = info.menuItemId;
                }
            });
            chrome.storage.local.set({ "list": dataList });
        })
    }
    if (info.menuItemId == "default04") {
        chrome.storage.local.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                if(tabTag.id == tab.id) {
                    tabTag.tag = info.menuItemId;
                }
            });
            chrome.storage.local.set({ "list": dataList });
        })
    }
    if (info.menuItemId == "default05") {
        chrome.storage.local.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                if(tabTag.id == tab.id) {
                    tabTag.tag = info.menuItemId;
                }
            });
            console.log(dataList);
        })
    }
});






// async function getTabsInformation() {

//     const PromiseA = chrome.tabs.onCreated.addListener(() => {
//         setTimeout(() => {
//             getCurrentTabs().then((tabsPromise) => {
//                 // let tabs = [];
//                 // for (let tab of tabsPromise){
//                 //     tabs.push( {
//                 //             id: tab.id,
//                 //             title: tab.title,
//                 //             url: tab.url,
//                 //         }
//                 //     )
//                 // }
//                 chrome.storage.local.clear(function (){
//                     console.log("clear all storage")
//                 });
//                 chrome.storage.local.get({ "list": [] }, function (object) {
//                     let dataList = object["list"];
//                     for (let tab of tabsPromise){
//                         dataList.push(tab);
//                     }
//                     chrome.storage.local.set({ "list": dataList });
//                 })
//                 // console.log(tabs.length);
//                 // const tabsJson = JSON.stringify(tabs);
//                 // console.log(tabsJson);
//             });
//         }, 500)
//     });
//     const PromiseB = chrome.tabs.onRemoved.addListener(() => {
//         setTimeout(() => {
//             getCurrentTabs().then((tabsPromise) => {
//                 chrome.storage.local.clear(function (){
//                     console.log("clear all storage")
//                 });
//                 chrome.storage.local.get({ "list": [] }, function (object) {
//                     let dataList = object["list"];
//                     for (let tab of tabsPromise){
//                         dataList.push(tab);
//                     }
//                     chrome.storage.local.set({ "list": dataList });
//                 })
//                 // let tabs = [];
//                 // for (let tab of tabsPromise){
//                 //     tabs.push( {
//                 //             id: tab.id,
//                 //             title: tab.title,
//                 //             url: tab.url,
//                 //         }
//                 //     )
//                 // }
//                 // console.log(tabs.length);
//                 // const tabsJson = JSON.stringify(tabs);
//                 // console.log(tabsJson);
//             });
//         }, 500)
//     });
//     const [a, b] = await Promise.all([PromiseA, PromiseB]);
//     return [a, b];
// }

// getTabsInformation();


// chrome.contextMenus.onClicked.addListener((info, tab) => {
//     if (info.menuItemId == "log") {
//       chrome.storage.local.get({ "list": [] }, function (object) {
//         let dataList = object["list"];
//         dataList.push(info.selectionText);
//         chrome.storage.local.set({ "list": dataList });
//       })
//     }
//   });

// switch to a specified tab
// chrome.tabs.update(1944205521, {active: true}, () => {
//     console.log("make first tab active");
// })


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