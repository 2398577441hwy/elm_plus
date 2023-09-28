<template>
  <h1>About~~~</h1>
</template>

<script>
import {groupcity} from '../../service/getData'
export default {
  mounted(){
    this.getAllcity()
  },
  methods:{
    async getAllcity(){
      const result = await groupcity()
      console.log(result)
    }
  }

};
</script>

<style>
</style>
