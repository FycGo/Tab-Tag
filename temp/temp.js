
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
    }, 1500)
});