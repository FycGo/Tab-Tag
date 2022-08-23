/*global chrome*/
console.log('This script has been injected')

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
    id: 'log',
    title: "请选择Tag: %s",
    contexts: ["selection"]
    });
});