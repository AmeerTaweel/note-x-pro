<template>
    <div id="saved-notes">
        <div class="container-fluid">
            <h2 class="m-20"><span class="text-primary">F</span>ilter <span class="text-primary">N</span>otes:</h2>
            <div class="row">
                <div class="form-group">
                    <div v-for="(filterType, index) in filterTypes" :key="index" class="card col-xs-12 col-sm-6 col-md-3 center-children">
                        <button class="btn btn-primary" @click="filterNotes(filterType.value)">{{filterType.text}}</button>
                    </div>
                </div>
            </div>    
            <h2 class="m-20"><span class="text-primary">S</span>aved <span class="text-primary">N</span>otes:</h2>
            <h2 v-if="isEmpty" class="m-20"><small>You don't have any saved notes yet, <span class="text-primary">click on the button below</span> to add your first note.</small></h2>
            <div class="row">
                <div class="card col-xs-12 col-sm-6 col-md-4" v-for="(note, index) in savedNotes" :key="index">
                    <div v-bind:class="note.priority.class" class="card-content">
                        <button class="close" @click="removeNote(index)">&times;</button>
                        <h3 class="text-primary">{{note.title}}</h3>
                        <h6 class="text-muted">{{note.time}}</h6>
                        <p>{{note.text}}</p>
                        <h6 class="text-muted">{{note.priority.name}}</h6>
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
            ]
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
    }
}
</script>

<style>
    .center-children {
        display: flex;
        align-items: center;
        justify-content: center;
    }

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
