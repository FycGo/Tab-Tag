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
     
  </div>
</template>

<script>
/*global chrome*/
import ButtonTag from './ButtonTag.vue'
// import ButtonSpace from './ButtonSpace.vue'
import TagItem from './TagItem.vue'


export default {
  mounted() {
    console.log("refresh popup.html");
    let that = this;  // Save component instance to that


    // get chrome.storage.local information
    chrome.storage.local.get({ "list": [] }, function (object) {
      let dataList = object["list"]
      if(dataList.length == 0) {
        console.log('no tab');
      }
      dataList.forEach(function (tab) {
        that.tabs.push(tab);
      });
      console.log(dataList);
    });

    //Assign the type of tag to tags[]
    setTimeout(() => {
        that.tabs.forEach(function (tab) {
          if((tab.tag != 'else') && !(that.tags.includes(tab.tag))) {
            that.tags.unshift(tab.tag);
          }
        });
   }, 100);




    //sort tabs by tag
    setTimeout(() => {
      this.tags.forEach(function (tag) {
          let itabs = [];
          that.tabs.forEach(function (tab) {
            if(tab.tag == tag){
                itabs.push(tab);
            }
          });
          that.tagTabs.push(itabs);
      });
    }, 200);
  },
  components: {
    ButtonTag,
    // ButtonSpace,
    TagItem,
  },
  data() {
    return{
      tabs: [],
      // tags: ["default01", "default02","default03", "default04"],
      tags: ['else'],
      tagTabs: []
    }
  },
  methods: {
    toggleMenu(action) {
      console.log(action);
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