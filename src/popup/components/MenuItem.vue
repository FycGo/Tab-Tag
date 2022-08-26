<template>
  <div class="menu-item" @click="handler">
    <span class="text"> {{ text }}</span>
  </div>
</template>

<script>
/*global chrome*/
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    
    action: {
      type: String,
      default: 'hello',
    },
    tabId: {
      type: Number,
      default: 0,
    }
  },

  methods: {
    handler() {
      chrome.tabs.update(this.tabId, {active: true}, () => {
          console.log("make first tab active");
      })
      this.$emit('click', this.action)
    },
  },
}
</script>



<style scoped>
.menu-item {
  position: static;
  width: 250px;
  height: 30px;
  display: flex;
  padding: 8px 8px 16px 16px;
  align-self: stretch;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.733);
  box-sizing: border-box;
  border: 1px solid #1A1A1A;
  display: flex;
  cursor: pointer;
}

span.text {
  position: absolute;
  display: inline;
  align-items: right;
  justify-content: right;
  opacity: 0.5;
}
span.text:hover {
  opacity: 1;
  cursor: pointer;
}
</style>