/*global chrome*/
async function getCurrentTabs() {
    // let queryOptions = { active: true, lastFocusedWindow: true };
    let queryOptions = {};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let tabsPromise = await chrome.tabs.query(queryOptions);
    return tabsPromise;
}

chrome.tabs.onCreated.addListener((tab) => {
    setTimeout(() => {
        console.log(tab.id);
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
            // console.log(tabs.length);
            // const tabsJson = JSON.stringify(tabs);
            // console.log(tabsJson);
        });
    }, 500)
});
chrome.tabs.onRemoved.addListener(() => {
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
            // console.log(tabs.length);
            // const tabsJson = JSON.stringify(tabs);
            // console.log(tabsJson);
        });
    }, 500)
});
// chrome.tabs.onAttached.addListener(() => {
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
// chrome.tabs.onDetached.addListener(() => {
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
// chrome.tabs.onMoved.addListener(() => {
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
// chrome.tabs.onUpdated.addListener(() => {
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
                // let p = document.createElement("p");
                // p.innerText = "暂无数据";
                // document.body.appendChild(p);
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                // let div = document.createElement("div");
                // div.innerText = text.title;
                // document.body.appendChild(div);
                // that.tabs.push(text);
                if(tabTag.id == tab.id) {
                    tabTag.tag = info.menuItemId;
                }

            });
            chrome.storage.local.set({ "list": dataList });
        })
        // chrome.storage.local.get({ "list": [] }, function (object) {
        //     let dataList = object["list"];
        //     console.log(dataList);
        // })
    }
    if (info.menuItemId == "default02") {
        chrome.storage.local.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                // let p = document.createElement("p");
                // p.innerText = "暂无数据";
                // document.body.appendChild(p);
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                // let div = document.createElement("div");
                // div.innerText = text.title;
                // document.body.appendChild(div);
                // that.tabs.push(text);
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
                // let p = document.createElement("p");
                // p.innerText = "暂无数据";
                // document.body.appendChild(p);
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                // let div = document.createElement("div");
                // div.innerText = text.title;
                // document.body.appendChild(div);
                // that.tabs.push(text);
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
                // let p = document.createElement("p");
                // p.innerText = "暂无数据";
                // document.body.appendChild(p);
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                // let div = document.createElement("div");
                // div.innerText = text.title;
                // document.body.appendChild(div);
                // that.tabs.push(text);
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
                // let p = document.createElement("p");
                // p.innerText = "暂无数据";
                // document.body.appendChild(p);
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                // let div = document.createElement("div");
                // div.innerText = text.title;
                // document.body.appendChild(div);
                // that.tabs.push(text);
                if(tabTag.id == tab.id) {
                    tabTag.tag = info.menuItemId;
                    console.log("add tag: " + tabTag.tag);
                }

            })
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