<template>
  <div class="menu-item" @click="handler">
    <span class="text"> {{ text }}</span>
  </div>
</template>

<script>
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
  },

  methods: {
    handler() {
      this.$emit('click', this.action)
    },
  },
}
</script>



<style scoped>
.menu-item {
  position: relative;
  left: 0px;
  top: 0px;
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