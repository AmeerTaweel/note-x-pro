<template>
  <div id="app" class="m-20">
    <h1 class="text-center">Note<span class="text-primary">X</span>Pro</h1>
    <h1 class="text-center"><small>Fast, Clean, Responsive &#38; Professional Notepad!</small></h1>
    <saved-notes v-if="isDisplayed('saved-notes')"></saved-notes>
    <create-note v-if="isDisplayed('create-note')"></create-note>
    <button v-if="isDisplayed('saved-notes')" type="button" class="action-btn btn btn-primary" aria-label="Create Note" @click="display('create-note')">
      <i class="material-icons align-middle">add</i>Create new note
    </button>
    <button v-if="isDisplayed('create-note')" type="button" class="action-btn btn btn-primary" aria-label="Back" @click="display('saved-notes')">
      <i class="material-icons align-middle">list</i> Back to saved notes
    </button>
  </div>
</template>

<script>
import SavedNotes from "./components/SavedNotes"
import CreateNote from "./components/CreateNote"
export default {
  name: "app",
  data () {
    return {
      displayed: "saved-notes"
    }
  },
  methods: {
    isDisplayed(componentName){
      return this.displayed === componentName
    },
    display(componentName){
      this.displayed = componentName
    }
  },
  components: {
    SavedNotes,
    CreateNote
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
