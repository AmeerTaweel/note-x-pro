<template>
  <v-container class="pa-5">
    <editor :edit="true" :index="index" @save-note="save($event)"></editor>
  </v-container>
</template>

<script>
import Editor from './Editor.vue'
export default {
  data: () => ({
    index: 0
  }),
  methods: {
      save(note){
        this.$store.dispatch(`editNote`, {
          note: note,
          index: this.index
        })
        this.$router.push(`/`)
      }
  },
  created(){
    this.$store.commit(`changeAction`, `home`)
    this.index = parseInt(this.$route.params.index)
  },
  components: {
    Editor
  }
}
</script>
