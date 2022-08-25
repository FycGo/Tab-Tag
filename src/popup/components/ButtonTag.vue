<script>
export default {
  data() {
    return {
        classType: "buttonOff"
    }
  },

  methods: {
    changeClassType() {
        if(this.classType == "buttonOff"){
            this.classType = "buttonOn";
        }else {
            this.classType = "buttonOff";
        }
    }
  } 
}
</script>

<template>
  <button @click="changeClassType()" :class="classType">
    Tag标签页管理
  </button>
</template>

<style scoped>
.buttonOn {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 130px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    background: rgba(2, 86, 255, 0.6);
    z-index: NaN
}

.buttonOff {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 130px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    background: rgb(251, 251, 251);
    z-index: NaN
}
</style>