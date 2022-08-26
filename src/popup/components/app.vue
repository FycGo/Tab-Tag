<template>
  <div class="popup-body">
    <ButtonTag />
    <hr>
    
    <TagItem 
      :tabs="tabs"
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

console.log("refresh popup.html");

export default {
  mounted() {
    let that = this;
    chrome.storage.local.get({ "list": [] }, function (object) {
      let dataList = object["list"]
      if(dataList.length == 0) {
        // let p = document.createElement("p");
        // p.innerText = "暂无数据";
        // document.body.appendChild(p);
        return;
      }
      dataList.forEach(function (text) {
        // let div = document.createElement("div");
        // div.innerText = text.title;
        // document.body.appendChild(div);
        that.tabs.push(text);
      })
    })
    return 0;
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
      tabs: []
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