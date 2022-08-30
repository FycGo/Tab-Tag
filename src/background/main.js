/*global chrome*/
// get all tabs information 
async function getCurrentTabs() {
    // let queryOptions = {currentWindow: true};
    let queryOptions = {};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let tabsPromise = await chrome.tabs.query(queryOptions);
    return tabsPromise;
}
// get tab information by tabId
async function getTab(tabId) {
    const tab = await chrome.tabs.get(tabId);
    return tab;
}

// get current tab information
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}




// when create a new tab, add tab information to chrome.storage.session
chrome.tabs.onCreated.addListener((tab) => {
    setTimeout(() => {
        chrome.storage.session.get({ "list": [] }, function (object) {
            let dataList = object["list"];
            getTab(tab.id).then((nowTab) => {
                dataList.splice(tab.index, 0 , {
                    tag: [],
                    id: nowTab.id,
                    groupId: nowTab.groupId,
                    windowId: nowTab.windowId,
                    title: nowTab.title,
                    url: nowTab.url,

                });
            }).then(() => {
                chrome.storage.session.set({ "list": dataList });
                console.log("already create a new tab");
            });
        })
    }, 500)
});


// when remove a new tab, delete tab information from chrome.storage.session
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log("onRemoved " + removeInfo);
    chrome.storage.session.get({ "list": [] }, function (object) {
        let dataList = object["list"];
        const isTabId = (element) => element.id == tabId;
        let index = dataList.findIndex(isTabId);
        dataList.splice(index, 1)
        chrome.storage.session.set({ "list": dataList });
    });
});

// when activate a tab, update tab information of chrome.storage.session
chrome.tabs.onActivated.addListener((activateInfo) => {
    setTimeout(() => {

        chrome.storage.session.get({ "list": [] }, function (object) {
            let dataList = object["list"];
            try {
                getTab(activateInfo.tabId).then((nowTab) => {
                    const isTabId = (element) => element.id == activateInfo.tabId;
                    let index = dataList.findIndex(isTabId);
                    dataList[index].title = nowTab.title;
                    dataList[index].url = nowTab.url;
                }).then(() => {
                    chrome.storage.session.set({ "list": dataList });
                    console.log("onActivated: " + activateInfo.tabId);
                });
            }
            catch(err) {
                console.log("onAcitvate failure " + err.message);
            }
        });
    }, 1000);
});



// when update a tab, update tab information of chrome.storage.session
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("onUpdated " + changeInfo);
    setTimeout(() => {
        chrome.storage.session.get({ "list": [] }, function (object) {
            let dataList = object["list"];
            const isTabId = (element) => element.id == tabId;
            let index = dataList.findIndex(isTabId);
            if(index == -1) {
                getCurrentTabs().then((tabsPromise) => {
                    chrome.storage.session.clear(function (){
                        console.log("clear all storage")
                    });
                    chrome.storage.session.get({ "list": [] }, function (object) {
                        let dataList = object["list"];
                        for (let tab of tabsPromise){
                            dataList.push({
                                tag: [],
                                id: tab.id,
                                groupId: tab.groupId,
                                windowId: tab.windowId,
                                title: tab.title,
                                url: tab.url,
                            });
                        }
                        chrome.storage.session.set({ "list": dataList });
                        console.log("already get tabs information");
                    })
                });
            } else {
                dataList[index].id = tabId;
                dataList[index].groupId = tab.groupId;
                dataList[index].windowId = tab.windowId;
                dataList[index].title = tab.title;
                dataList[index].url = tab.url;
                chrome.storage.session.set({ "list": dataList });
            }
        })
    }, 500);
});
// when replace a tab, update tab information of chrome.storage.session
chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
    setTimeout(() => {
        chrome.storage.session.get({ "list": [] }, function (object) {
            let dataList = object["list"];
            const isTabId = (element) => element.id == removedTabId;
            let index = dataList.findIndex(isTabId);
            dataList[index].id = addedTabId;
            getTab(addedTabId).then((tab) => {
                dataList[index].groupId = tab.groupId;
                dataList[index].windowId = tab.windowId;
                dataList[index].title = tab.title;
                dataList[index].url = tab.url;
            }).then(() => {
                chrome.storage.session.set({ "list": dataList });
                console.log("onReplaced: replace " + addedTabId + "from " + removedTabId);
            });
        })
    }, 500);
});

// 监听消息
chrome.runtime.onMessage.addListener(data => {
    chrome.storage.session.get({ "list": [] }, function (object) {
        let dataList = object["list"];
        let index = 0;
        getCurrentTab().then((currentTab) => {
            for (let i = 0; i < dataList.length; i++) {
                if( dataList[i].id == currentTab.id) {
                    index = i;
                }
            }
            console.log("the tab index of currentTab " + index);
            data.addTags.forEach(function (oneTag) {
                if (!(dataList[index].tag.includes(oneTag))) {
                    dataList[index].tag.push(oneTag);
                }
            });
            chrome.storage.session.set({ "list": dataList });
        }); 
    });
});



// 鼠标右键菜单
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
    id: 'Red',
    title: "Red",
    contexts: ["all"],
    type: "normal"
    });
    chrome.contextMenus.create({
    id: 'Blue',
    title: "Blue",
    contexts: ["all"],
    type: "normal"
    });
    chrome.contextMenus.create({
    id: 'Orange',
    title: "Orange",
    contexts: ["all"],
    type: "normal"
    });
    chrome.contextMenus.create({
    id: 'Yellow',
    title: "Yellow",
    contexts: ["all"],
    type: "normal"
    });
});


//鼠标右键菜单点击响应事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "Red") {
        chrome.storage.session.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                if(tabTag.id == tab.id) {
                    if(!(tabTag.tag.includes(info.menuItemId))) {
                        tabTag.tag.push(info.menuItemId);
                    }
                }
            });
            chrome.storage.session.set({ "list": dataList });
        })
    }
    if (info.menuItemId == "Blue") {
        chrome.storage.session.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                if(tabTag.id == tab.id) {
                    if(!(tabTag.tag.includes(info.menuItemId))) {
                        tabTag.tag.push(info.menuItemId);
                    }
                }
            });
            chrome.storage.session.set({ "list": dataList });
        })
    }
    if (info.menuItemId == "Orange") {
        chrome.storage.session.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                if(tabTag.id == tab.id) {
                    if(!(tabTag.tag.includes(info.menuItemId))) {
                        tabTag.tag.push(info.menuItemId);
                    }
                }
            });
            chrome.storage.session.set({ "list": dataList });
        })
    }
    if (info.menuItemId == "Yellow") {
        chrome.storage.session.get({ "list": [] }, function (object) {
            let dataList = object["list"]
            if(dataList.length == 0) {
                console.log('no tab');
            }
            dataList.forEach(function (tabTag) {
                if(tabTag.id == tab.id) {
                    if(!(tabTag.tag.includes(info.menuItemId))) {
                        tabTag.tag.push(info.menuItemId);
                    }
                }
            });
            chrome.storage.session.set({ "list": dataList });
        })
    }
});




