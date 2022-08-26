<template>
  <div class="popup-body">
    <div>
      <ButtonTag />
      <ButtonSpace />
    </div>
    <TagItem 
      @toggle-menu="toggleMenu"></TagItem>
  </div>
</template>

<script>
/*global chrome*/
import ButtonTag from './ButtonTag.vue'
import ButtonSpace from './ButtonSpace.vue'
import TagItem from './TagItem.vue'
export default {
    components: {
      ButtonTag,
      ButtonSpace,
      TagItem
    },
    data() {
      return{
      }
    },
    methods: {
      toggleMenu(action) {
        console.log(action);
        chrome.tabs.update(1944205830, {active: true}, () => {
            console.log("make first tab active");
        })
      },

      toggleDropDown() {
        this.active = !this.active;
        console.log(this.active)
      },
    },
}
</script>

<style lang="less" scoped>
.popup-body {
  width: 350px;
  height: 550px;
  // border-radius: 24px;
  background: rgba(7, 185, 185, 0.329);
}

</style>