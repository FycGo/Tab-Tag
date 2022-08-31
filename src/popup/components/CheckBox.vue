<template>
    <div>
      <ul>
        <li v-for="(obj,index) in tags" :key="index">
          <input type="checkbox" v-model="obj.checked"/>
          <span>{{obj.tag}}</span>
        </li>
      </ul>
    </div>
  </template>
   
  <script>
  export default {
    data() {
      return {
      };
    },
    props: {
        tags: {
            type: Array,
            default: () => [],
        }
    },
    computed:{
    }
  };
  </script>
  
  