<template>
  <v-container fluid>
    <!-- Filters & Seach Area -->
    <v-text-field hint="Search notes by title, body, or tags..." persistent-hint :color="colorAccent" v-model="search">
      <v-icon slot="append">search</v-icon>
    </v-text-field>
    <v-layout align-center justify-center row>
      <v-flex v-for="(filter, i) in filters" :key="i" xs12 sm6 lg3>
        <div class="w-100 h-100 p-3">
          <v-btn :color="colorAccent" dark block rounded @click="$store.dispatch(`applyFilter`, filter.type)">{{filter.display}}</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <!-- Notes Area -->
    <v-layout v-if="$store.state.notes.length" align-space-between justify-start row fill-height>
      <v-flex v-for="(note, i) in notes" :key="i" xs12 md6 lg4>
        <div class="pa-2 h-100">
          <v-hover class="h-100" v-slot:default="{ hover }">
            <v-card class="noselect word-break" v-ripple :elevation="hover ? 12 : 2" @click="$router.push(`/viewnote/${i}`)">
              <div class="w-100 h-100 d-flex">
                <v-sheet tile class="rounded-left" :color="note.priority.color">&nbsp;&nbsp;</v-sheet>
                <div class="flex-grow-1">
                  <div class="d-flex flex-column w-100 h-100 pa-2">
                    <p class="headline" :class="`${note.priority.color}--text`">{{note.title}}</p>
                    <p class="subtitle-1 grey--text">{{note.time}}</p>
                    <p :id="`note${i}text`" class="body-1"></p>
                    <div class="flex-grow-1">
                      <div class="h-100 d-flex align-items-end flex-wrap">
                        <v-chip class="me-2 mb-2" v-for="(tag, j) in note.tags" :key="j" outlined :color="note.priority.color">#{{tag}}</v-chip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-hover>
        </div>
      </v-flex>
    </v-layout>
    <!-- Visible if no notes created -->
    <v-layout v-if="!$store.state.notes.length" class="pa-5 headline" align-center justify-center column fill-height>
      <div>You don't have any notes.</div>
      <div>Create a note by clicking the plus <span class="font-weight-bold">(+)</span> button at the very bottom right.</div>
    </v-layout>
    <!-- Visible if no results for search -->
    <v-layout v-if="$store.state.notes.length && !notes.length" class="pa-5 headline" align-center justify-center column fill-height>
      <div>No notes match your search.</div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: ``,
    filters: [{
      display: `More Important First`,
      type: `moreImportantFirst`
    }, {
      display: `Less Important First`,
      type: `lessImportantFirst`
    }, {
      display: `Newer First`,
      type: `newerFirst`
    }, {
      display: `Older First`,
      type: `olderFirst`
    }]
  }),
  methods: {
    limitNotesLines(){
      if(this.notes.length > 0){
        const lineCapacity = this.calculateLineCapacity(document.getElementById(`note${0}text`))
        for(let i = 0; i < this.notes.length; i++){
          const noteText = document.getElementById(`note${i}text`)
          this.clamp(noteText, this.notes[i].text, 3, lineCapacity)
        }
      }
    },
    calculateLineCapacity(element){
      const s = `x`
      element.innerHTML = s // To know the height of one line
      const elementHeight = element.offsetHeight
      let i = 1 // Number of chars
      while(element.offsetHeight <= elementHeight){
        element.innerHTML += s
        i++
      }
      return i - 1
    },
    clamp(element, text, maxLines, lineCapacity){
      const chars = (maxLines * lineCapacity) - 2
      if(text.length <= chars){
        element.innerHTML = text
      } else {
        element.innerHTML = `${text.substr(0, chars - 3)}...`
      }
    }
  },
  created(){
    this.$store.commit(`changeRoute`, `home`)
  },
  mounted(){
    this.$nextTick(() => {
      this.limitNotesLines()
      window.addEventListener(`resize`, () => {
        this.limitNotesLines()
      }, true)
    })
  },
  updated(){
    this.$nextTick(() => {
      this.limitNotesLines()
    })
  },
  computed: {
    notes () {
      // Return all the notes if the user didn't search for something.
      if(this.search === `` || this.search === null){
        return this.$store.state.notes
      }
      const query = this.search.trim()
      // Get all the words from the search query.
      const keywords = query.split(` `)
      let searchResults = []
      // Search inside notes titles, bodies, tags.
      for(let i = 0; i < this.$store.state.notes.length; i++){
        const note = this.$store.state.notes[i]
        let noteScore = 0
        // Search for all keywords in every note.
        for(let k = 0; k < keywords.length; k++){
          const keyword = keywords[k].toLowerCase()
          // Increase the note score with every keyword occurence.
          if(note.title.toLowerCase().includes(keyword) || note.text.toLowerCase().includes(keyword)){
            noteScore++ 
            continue   
          }
          for(let j = 0; j < note.tags.length; j++){
            const tag = note.tags[j]
            if(tag.includes(keyword)){
              noteScore++
              break
            }
          }
        }
        // Only show notes that have score more than 75%.
        // This way search will be flixeble but shows more relevant results.
        if(noteScore >= keywords.length * 0.75){
          searchResults.push(note)
        }
      }
      return searchResults      
    }
  }
}
</script>
