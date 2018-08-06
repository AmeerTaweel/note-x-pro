<template>
    <div id="saved-notes">
        <h2 class="m-20"><span class="text-primary">S</span>aved <span class="text-primary">N</span>otes:</h2>
        <h2 v-if="isEmpty" class="m-20"><small>You don't have any saved notes yet, <span class="text-primary">click on the button below</span> to add your first note.</small></h2>
        <div class="container-fluid">
            <div class="row">
                <div class="card col-xs-12 col-sm-6 col-md-4" v-for="(note, index) in savedNotes" :key="index">
                    <div v-bind:class="note.priority.class" class="card-content">
                        <button class="close" @click="removeNote(index)">&times;</button>
                        <h3 class="text-primary">{{note.title}}</h3>
                        <h6 class="text-muted">{{note.time}}</h6>
                        <p>{{note.text}}</p>
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
            isEmpty: true
        }
    },
    methods: {
        removeNote(index){
            this.savedNotes.splice(index, 1)
            this.saveNotes()
            console.log(`Removed note with index: ${index}`)
            this.checkEmpty()
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
    }
}
</script>

<style>
    .card {
        padding: 10px;
    }

    .card-content {
        border-top: 1px solid grey; 
        border-right: 1px solid grey; 
        border-bottom: 1px solid grey; 
        border-radius: 5px;
        padding: 10px; 
    }

    .note-priority-low{
        border-left: 10px solid #4cae4c; 
    }

    .note-priority-medium{
        border-left: 10px solid #eea236; 
    }

    .note-priority-high{
        border-left: 10px solid #d9534f; 
    }
</style>
