<template>
  <div class="popup-body">
    <h1>Tag标签页</h1>
    <hr>
    <button class="bookmarks" id="show-modal" @click="showModal = true">add bookmarks</button>

    <Teleport to="body">
      <!-- 使用这个 modal 组件，传入 prop -->
      <modal :tags="tagsChecked" :show="showModal" @close="addBookmarks">
        <template #header>
          <h3>请选择你要添加到书签的Tag:</h3>
        </template>
      </modal>
    </Teleport> 


    <button class="share" id="show-share" @click="showShare = true">share tabs</button>

    <Teleport to="body">
      <!-- 使用这个 modal 组件，传入 prop -->
      <share :tags="tagsChecked" :show="showShare" @close="shareTabs" @closeShare="closeShare">
        <template #header>
          <h3>请选择你要分享的Tag:</h3>
        </template>
      </share>
    </Teleport> 


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
import TagItem from './TagItem.vue'
import Modal from './AddBookmarks.vue'
import Share from './ShareTabs.vue'


export default {
  mounted() {
    console.log("refresh popup.html");
    let that = this;  // Save component instance to that


    // get chrome.storage.session information
    chrome.storage.session.get({ "list": [] }, function (object) {
      let dataList = object["list"]
      if(dataList.length == 0) {
        console.log('no tab');
      }
      dataList.forEach(function (tab) {
        that.tabs.push(tab);
      });
    });

    //Assign the type of tag to tags[]
    setTimeout(() => {
        that.tabs.forEach(function (tab) {
          tab.tag.forEach(function (tagItem) {
            if(!(that.tags.includes(tagItem))) {
              that.tags.unshift(tagItem);
              that.tagsChecked.unshift({
                tag: tagItem,
                checked: false,
              });
            }
          });
        });
   }, 100);




    //sort tabs by tag
    setTimeout(() => {
      this.tags.forEach(function (tag) {
          let itabs = [];
          that.tabs.forEach(function (tab) {
            tab.tag.forEach(function (tagItem) {
              if(tagItem == tag){
                  itabs.push(tab);
              }
            });
          });
          that.tagTabs.push(itabs);
      });
    }, 200);
  },
  components: {
    TagItem,
    Modal,
    Share,
  },
  data() {
    return{
      tabs: [],
      tags: [],
      tagTabs: [],
      tagsChecked: [],
      showModal: false,
      showShare: false,
    }
  },
  methods: {
    toggleMenu(action) {
      console.log(action);
    },
    addBookmarks(){
      let checkedTags = [];
      let that = this;
      this.tagsChecked.forEach(function (tagChecked) {
          if(tagChecked.checked == true) {
            checkedTags.push(tagChecked.tag);
            tagChecked.checked == false;
          }
      });
      checkedTags.forEach(function (checkedTag) {
          chrome.bookmarks.create(
            {'title': checkedTag},
            function(newFolder) {
              that.tabs.forEach(function (tab) {
                if(tab.tag.includes(checkedTag)) {
                  chrome.bookmarks.create({
                    'parentId': newFolder.id,
                    'title': tab.title,
                    'url': tab.url,
                  }); 
                }
              });
              console.log("added folder: " + newFolder.title);
            }, 
          );
      });
      this.showModal = false;
    },
    closeShare() {
      this.showShare = false;
    },
    shareTabs(){
      let checkedTags = [];
      let that = this;
      let shareText = "";
      this.tagsChecked.forEach(function (tagChecked) {
          if(tagChecked.checked == true) {
            checkedTags.push(tagChecked.tag);
            tagChecked.checked == false;
          }
      });
      checkedTags.forEach(function (checkedTag) {
        that.tabs.forEach(function (tab) {
          if(tab.tag.includes(checkedTag)) {
            shareText = shareText + tab.title + ": " + tab.url + '\n';
          }
        });
      });
      navigator.clipboard.writeText(shareText).then(()=> {
        console.log("复制成功");
      }, (error)=> {
        console.log(error)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.popup-body {
  width: 350px;
  height: 550px;
  // border-radius: 24px;
  background: rgb(255, 255, 255);
}
.bookmarks {
  position: relative;
  float: left;
  background: #fa8072;
  border-radius: 8px;
}
.share {
  position: relative;
  float: right;
  background: #ee82ee;
  border-radius: 8px;
}

</style>