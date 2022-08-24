import { createApp } from 'vue'
import App from './components/App.vue'

const app = createApp(App)
app.mount('#app')

chrome.storage.local.get({ "list": [] }, function (object) {
    let dataList = object["list"]
    if(dataList.length == 0) {
        let p = document.createElement("p");
        p.innerText = "暂数据";
        document.body.appendChild(p);
        return;
        }
    dataList.forEach(function (text) {
        let div = document.createElement("div");
        div.innerText = text;
        document.body.appendChild(div);
        })
})