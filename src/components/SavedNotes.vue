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
                    <button class="btn btn-primary" @click="filterNotes(filterType.value)">{{filterType.text}}</button>
                </div>
            </div>    
            <h2><span class="text-primary">S</span>aved <span class="text-primary">N</span>otes:</h2>
            <h2 v-if="isEmpty" class="m-20"><small>You don't have any saved notes yet, <span class="text-primary">click on the button below</span> to add your first note.</small></h2>
            <div class="row">
                <div class="card col-xs-12 col-md-6 col-lg-4" v-for="(note, index) in getNotes" :key="index">
                    <div v-bind:class="note.priority.class" class="card-content">
                        <button class="close" @click="removeNote(index)">&times;</button>
                        <h3 class="text-primary">{{note.title}}</h3>
                        <h6 class="text-muted">{{note.time}}</h6>
                        <p>{{note.text}}</p>
                        <h6 class="text-muted"><span v-for="(tag, index) in note.tags" :key="index">#{{tag}} </span></h6>
                     </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import * as Cookies from "js-cookie"
export default {
    name: "saved-notes",
    data() {
        return {
            savedNotes: [],
            savedNotesPath: `savedNotes`,
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
        removeNote(index){
            this.savedNotes.splice(index, 1)
            this.saveNotes()
            console.log(`Removed note with index: ${index}`)
            this.checkEmpty()
        },
        filterNotes(filter){
            switch(filter){
                // More important first.
                case 1:
                    this.savedNotes.sort((a, b) => {
                        return b.priority.num - a.priority.num
                    })
                    break
                // Less important first.    
                case 2:
                    this.savedNotes.sort((a, b) => {
                        return a.priority.num - b.priority.num
                    })
                    break
                // Newer first.    
                case 3:
                    this.savedNotes.sort((a, b) => {
                        return b.mls - a.mls
                    })
                    break
                // Older first.      
                case 4:
                    this.savedNotes.sort((a, b) => {
                        return a.mls - b.mls
                    })
                    break      
            }
            this.saveNotes()
        },
        saveNotes(){
            Cookies.set(this.savedNotesPath, this.savedNotes)
        },
        checkEmpty(){
            if(this.savedNotes === null || this.savedNotes.length === 0){
                this.isEmpty = true
            }else{
                this.isEmpty = false
            }
        }
    },
    created(){
        // Load saved notes from cookies.
        const savedNotesCookiesVersion = Cookies.getJSON(`savedNotes`)
        if(savedNotesCookiesVersion !== null && typeof savedNotesCookiesVersion !== `undefined`){
            this.savedNotes = savedNotesCookiesVersion
        }
        this.checkEmpty()
    },
    computed: {
        getNotes(){
            // Return all the notes if the user didn't search for something.
            if(this.searchFor === `` || this.searchFor === null){
                return this.savedNotes
            }
            let searchResults = []
            // Search inside notes titles, bodies, tags.
            for(let i = 0; i < this.savedNotes.length; i++){
                const note = this.savedNotes[i]
                if(note.title.toLowerCase().includes(this.searchFor) 
                    || note.text.toLowerCase().includes(this.searchFor)){
                    searchResults.push(note)
                    continue
                }
                for(let j = 0; j < note.tags.length; j++){
                    const tag = note.tags[j]
                    if(tag.includes(this.searchFor)){
                        searchResults.push(note)
                        break
                    }
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
