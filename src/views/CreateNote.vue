<template>
  <v-container class="word-break pa-5">
    
  </v-container>
</template>

<script>
export default {
  data: () => ({
    
  }),
  created(){
    this.$store.commit(`changeRoute`, `view`)
    this.note = this.$store.state.notes[this.$route.params.index]
  }
}
</script>
