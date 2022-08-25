<template>
  <div class="popup-body">
    <ButtonTag />
    <ButtonSpace />
  </div>
</template>

<script>
import ButtonTag from './ButtonTag.vue'
import ButtonSpace from './ButtonSpace.vue'
export default {
    components: { 
      ButtonTag,
      ButtonSpace
    
    }
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