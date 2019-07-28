<template>
  <v-container class="pa-5">
    <editor :edit="false" @save-note="save($event)"></editor>
  </v-container>
</template>

<script>
import Editor from './Editor.vue'
export default {
  methods: {
      save(note){
        this.$store.dispatch(`addNote`, note)
        this.$router.push(`/`)
      }
  },
  created(){
    this.$store.commit(`changeRoute`, `create`)
  },
  components: {
    Editor
  }
}
</script>
