<template>
  <div id="app" class="m-20">
    <h1 class="text-center">Note<span class="text-primary">X</span>Pro</h1>
    <h1 class="text-center"><small>Fast, Clean, Responsive &#38; Professional Notepad!</small></h1>
    <router-view></router-view>
    <button type="button" class="action-btn btn btn-primary" aria-label="Create Note">
      <i class="material-icons align-middle">add</i>Create new note
    </button>
    <button type="button" class="action-btn btn btn-primary" aria-label="Back">
      <i class="material-icons align-middle">list</i> Back to saved notes
    </button>
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
