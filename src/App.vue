<template>
  <div id="app" class="m-20">
    <h1 class="text-center">Note<span class="text-primary">X</span>Pro</h1>
    <h1 class="text-center"><small>Fast, Clean, Responsive &#38; Professional Notepad!</small></h1>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "app",
  data () {
    return {

    }
  },
  methods: {
    ...mapActions([
      'loadNotes'
    ])
  },
  created(){
    this.loadNotes()
    this.$router.push('/saved')
  }
}
</script>

<style>
  .action-btn {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 25px;
  }
  .m-20{
    margin: 20px;
  }
</style>
