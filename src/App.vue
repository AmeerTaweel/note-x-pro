<template>
  <div id="app" class="m-20">
    <h1 class="text-center">Note<span class="text-primary">X</span>Pro</h1>
    <h1 class="text-center"><small><span class="text-primary">F</span>ast, <span class="text-primary">C</span>lean, <span class="text-primary">R</span>esponsive &#38; <span class="text-primary">P</span>rofessional <span class="text-primary">N</span>otepad!</small></h1>
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
