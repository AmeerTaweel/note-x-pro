<template>
    <div id="saved-notes" class="m-20">
        <div class="container-fluid">
            <h2><span class="text-primary">F</span>ilter <span class="text-primary">N</span>otes:</h2>
            <form>
                <div class="form-group">
                    <label>Search Notes:</label>
                    <div class="input-group">
                        <input type="search" class="form-control" v-model="searchFor">
                        <div class="input-group-append">
                            <i class="input-group-text material-icons">search</i>
                        </div>
                    </div>
                    <small class="form-text text-muted">You can search notes by title, body and tags.</small>
                </div>
            </form>
            <div class="row">
                <div v-for="(filterType, index) in filterTypes" :key="index" class="card col-xs-12 col-md-6 col-lg-3">
                    <button class="btn btn-primary" @click="sortNotes(filterType.value)">{{filterType.text}}</button>
                </div>
            </div>    
            <h2><span class="text-primary">S</span>aved <span class="text-primary">N</span>otes:</h2>
            <h2 v-if="isEmpty" class="m-20"><small>You don't have any saved notes yet, <span class="text-primary">click on the button below</span> to add your first note.</small></h2>
            <div class="row">
                <div class="card col-xs-12 col-md-6 col-lg-4" v-for="(note, index) in getNotes" :key="index">
                    <div v-bind:class="note.priority.class" class="card-content">
                        <button class="close" @click="deleteNote(index)">&times;</button>
                        <h3 :id="`note-title-${index}`" class="text-primary" :title="note.title">{{note.title}}</h3>
                        <h6 class="text-muted">{{note.time}}</h6>
                        <p :id="`note-body-${index}`">{{note.text}}</p>
                        <h6 class="text-muted"><span v-for="(tag, index) in note.tags" :key="index">#{{tag}} </span></h6>
                     </div>
                </div>
            </div>
        </div>
        <button type="button" class="action-btn btn btn-primary" @click="createNote">
            <i class="material-icons align-middle">add</i>Create new note
        </button>
    </div>    
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "saved-notes",
    data() {
        return {
            isEmpty: true,
            filterTypes: [
                {
                    value: 1,
                    text: `More Important First`
                },
                {
                    value: 2,
                    text: `Less Important First`
                },
                {
                    value: 3,
                    text: `Newer First`
                },
                {
                    value: 4,
                    text: `Older First`
                }
            ],
            searchFor: ``
        }
    },
    methods: {
        ...mapActions([
            'removeNote',
            'saveNotes',
            'filterNotes'
        ]),
        deleteNote(index){
            this.removeNote(index)
            this.saveNotes()
            this.checkEmpty()
        },
        sortNotes(filter){
            this.filterNotes(filter)
            this.saveNotes()
        },
        checkEmpty(){
            if(this.$store.state.notes === null || this.$store.state.notes.length === 0){
                this.isEmpty = true
            }else{
                this.isEmpty = false
            }
        },
        relayout(){
            this.getNotes.forEach((note, index) => {
                let noteBody = document.getElementById(`note-body-${index}`)
                let noteTitle = document.getElementById(`note-title-${index}`)
                const layout = () => {
                    this.clamp(noteTitle, note.title, 1)
                    this.clamp(noteBody, note.text, 3)
                }
                layout()
                window.addEventListener(`resize`, layout)
            })
        },
        clamp(element, text, maxLines){
            element.innerHTML = text[0]
            let elementHeight = element.offsetHeight
            let lines = 1
            for(let i = 1; i < text.length; i++){
                element.innerHTML += text[i]
                if(element.offsetHeight > elementHeight){
                    lines++
                    elementHeight = element.offsetHeight
                }
                if(lines >= (maxLines + 1)){
                    element.innerHTML = element.innerHTML.substr(0, element.innerHTML.length - 4) + `...`
                    break
                }
            }
            if(lines < maxLines){
                for(let i = 0; i < maxLines + 1 - lines; i++){
                    element.innerHTML += '<br/>'
                }
            }
        },
        createNote(){
            this.$router.push('/create')
        }
    },
    watch: {
        'getNotes': `relayout`
    },
    created(){
        this.checkEmpty()
    },
    mounted(){
        this.relayout()
    },
    computed: {
        getNotes(){
            let query = this.searchFor
            // Return all the notes if the user didn't search for something.
            if(query === `` || query === null){
                return this.$store.state.notes
            }
            // Remove the space at the beggining if exists.
            if(query[0] === ` `){
                query = query.substring(1, query.length)
            }
            // Remove the space at the end if exists.
            if(query[query.length - 1] === ` `){
                query = query.substring(0, query.length - 1)
            }
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
                    if(note.title.toLowerCase().includes(keyword) 
                        || note.text.toLowerCase().includes(keyword)){
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
                // Only show notes that have score more than 70%.
                // This way search will be flixeble but shows more relevant results.
                if(noteScore >= keywords.length * 70/100){
                    searchResults.push(note)
                }
            }
            return searchResults
        }
    }
}
</script>

<style>
.card {
    padding: 10px;
    border-width: 0px;
}

.card-content {
    border-top: 1px solid grey; 
    border-right: 1px solid grey; 
    border-bottom: 1px solid grey; 
    border-radius: 5px;
    padding: 10px;
    word-wrap: break-word;
    height: 100%;
}

.note-priority-low {
    border-left: 10px solid #4cae4c; 
}

.note-priority-medium {
    border-left: 10px solid #eea236; 
}

.note-priority-high {
    border-left: 10px solid #d9534f; 
}
</style>
