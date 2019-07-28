<template>
  <v-container class="word-break pa-5">
    <div>
      <v-btn class="ma-3" outlined :color="colorPrimary" @click="$router.push(`/editnote/${index}`)">Edit</v-btn>
      <v-btn class="ma-3" outlined color="error" @click="deleteDialog = true">Delete</v-btn>
      <v-dialog v-model="deleteDialog" max-width="50%">
        <v-card>
          <v-card-title class="headline">Delete this note?</v-card-title>
          <v-card-text>This action can't be undone.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deleteDialog = false">Cancel</v-btn>
            <v-btn color="red" text @click="deleteNote">Yes, Delete Note</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="display-3 text-center ma-5">{{note.title}}</div>
    <div class="display-1 text-center grey--text m-3">{{note.time}}</div>
    <div class="text-center">
      <v-chip v-for="(tag, i) in note.tags" :key="i" class="ma-3 noselect" :color="note.priority.color" filter link outlined pill>#{{tag}}</v-chip>
    </div>
    <br/>
    <div class="display-1 text-justify m-3">{{note.text}}</div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    note: {},
    deleteDialog: false,
    index: 0
  }),
  methods: {
    deleteNote(){
      this.$store.dispatch(`deleteNote`, this.$route.params.index)
      this.deleteDialog = false
      this.$router.push(`/`)
    }
  },
  created(){
    this.$store.commit(`changeRoute`, `view`)
    this.index = parseInt(this.$route.params.index)
    this.note = this.$store.state.notes[this.index]
  }
}
</script>
