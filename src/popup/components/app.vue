<template>
  <div class="popup-body">
    <ButtonTag />
    <hr>
    
    <TagItem 
      v-for="(tag, index) in tags"
      :key="index"
      :tag="tag"
      :tabs="tagTabs[index]"
      @toggle-menu="toggleMenu"></TagItem>
     
    <!-- <MenuItem v-for="title in titles"
      :key="title"
      :text="title"
      :action="JoJo"
      /> -->

  </div>
</template>

<script>
/*global chrome*/
import ButtonTag from './ButtonTag.vue'
// import ButtonSpace from './ButtonSpace.vue'
import TagItem from './TagItem.vue'
// import MenuItem from './MenuItem.vue';


export default {
  mounted() {
      console.log("refresh popup.html");
      // async function getCurrentTabs() {
      //     // let queryOptions = { active: true, lastFocusedWindow: true };
      //     let queryOptions = {};
      //     // `tab` will either be a `tabs.Tab` instance or `undefined`.
      //     let tabsPromise = await chrome.tabs.query(queryOptions);
      //     return tabsPromise;
      // }
      // getCurrentTabs().then((tabsPromise) => {
      //     chrome.storage.local.clear(function (){
      //         console.log("clear all storage")
      //     });
      //     chrome.storage.local.get({ "list": [] }, function (object) {
      //         let dataList = object["list"];
      //         for (let tab of tabsPromise){
      //             dataList.push({
      //                 tag: "else",
      //                 id: tab.id,
      //                 groupId: tab.groupId,
      //                 windowId: tab.windowId,
      //                 title: tab.title,
      //                 url: tab.url,
      //             });
      //         }
      //         chrome.storage.local.set({ "list": dataList });
      //     })
      //     // console.log(tabs.length);
      //     // const tabsJson = JSON.stringify(tabs);
      //     // console.log(tabsJson);
      // });
      //把tag添加进来
    let that = this;
    chrome.storage.local.get({ "list": [] }, function (object) {
      let dataList = object["list"]
      if(dataList.length == 0) {
        // let p = document.createElement("p");
        // p.innerText = "暂无数据";
        // document.body.appendChild(p);
        console.log('no tab');
      }
      dataList.forEach(function (tab) {
        // let div = document.createElement("div");
        // div.innerText = text.title;
        // document.body.appendChild(div);
        that.tabs.push(tab);
      });
      console.log(dataList);
    });
    //tag分类
    setTimeout(() => {
      console.log(this.tabs);
      this.tags.forEach(function (tag) {
          // let div = document.createElement("div");
          // div.innerText = text.title;
          // document.body.appendChild(div);
          // that.tabs.push(text);
          let itabs = [];
          that.tabs.forEach(function (tab) {
            if(tab.tag == tag){
                itabs.push(tab);
            }
          });
          that.tagTabs.push(itabs);
      });
    }, 100);
  },
  // updated() {
  //   let that = this;
  //   chrome.storage.local.get({ "list": [] }, function (object) {
  //     let dataList = object["list"]
  //     if(dataList.length == 0) {
  //       // let p = document.createElement("p");
  //       // p.innerText = "暂无数据";
  //       // document.body.appendChild(p);
  //       return;
  //     }
  //     dataList.forEach(function (text) {
  //       // let div = document.createElement("div");
  //       // div.innerText = text.title;
  //       // document.body.appendChild(div);
  //       that.titles.push(text.title);
  //     })
  //   })
  //   return 0;
  // },
  // unmounted() {
  //   let that = this;
  //   chrome.storage.local.get({ "list": [] }, function (object) {
  //     let dataList = object["list"]
  //     if(dataList.length == 0) {
  //       // let p = document.createElement("p");
  //       // p.innerText = "暂无数据";
  //       // document.body.appendChild(p);
  //       return;
  //     }
  //     dataList.forEach(function (text) {
  //       // let div = document.createElement("div");
  //       // div.innerText = text.title;
  //       // document.body.appendChild(div);
  //       that.titles.push(text.title);
  //       // console.log(typeof(text.title));
  //     })
  //   })
  //   return 0;
  // },
  components: {
    ButtonTag,
    // ButtonSpace,
    TagItem,
    // MenuItem
  },
  data() {
    return{
      tabs: [],
      test: [{num: 8}, {num: 9}],
      tags: ["default01", "default02","default03", "default04"],
      tagTabs: []
    }
  },
  methods: {
    toggleMenu(action) {
      console.log(action);
      // chrome.tabs.update(1944205830, {active: true}, () => {
      //     console.log("make first tab active");
      // })
    },
  },
}
</script>

<style lang="less" scoped>
.popup-body {
  width: 350px;
  height: 550px;
  // border-radius: 24px;
  background: rgba(255, 255, 255, 0);
}
.topbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 5px;
  width: 350px;
  height: 40px;
  background: rgba(96, 207, 142, 0);
}

</style>