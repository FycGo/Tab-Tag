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
    共享空间
  </button>
</template>

<style scoped>
.buttonOn {
    position: absolute;
    left: 170px;
    top: 8px;
    width: 110px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 0px;
    border-radius: 8px;
    background: rgba(2, 86, 255, 0.6);
}

.buttonOff {
    position: absolute;
    left: 170px;
    top: 8px;
    width: 110px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 0px;
    border-radius: 8px;
    background: rgb(212, 217, 226);
}
</style>