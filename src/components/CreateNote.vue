<template>
    <div id="create-note">
        <h2 class="m-20"><span class="text-primary">C</span>reate <span class="text-primary">N</span>ew <span class="text-primary">N</span>ote:</h2>
        <div class="container-fluid">
            <div class="row">
                <form class="col-xs-12">
                    <div class="form-group">
                        <label for="note-title">Note Title</label>
                        <input type="text" class="form-control" id="note-title" placeholder="ex: I went to the beach" v-model="note.title">
                    </div>
                    <div class="form-group">
                        <label for="note-text">Note Text</label>
                        <textarea class="form-control" id="note-text" placeholder="ex: I really enjoyed with my best friends!" v-model="note.text"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Priority</label><br/>
                        <input type="radio" name="priority" value="1" v-model="note.priority" checked> Low Priority<br/>
                        <input type="radio" name="priority" value="2" v-model="note.priority"> Medium Priority<br/>
                        <input type="radio" name="priority" value="3" v-model="note.priority"> High Priority
                    </div>
                    <button type="button" class="btn btn-primary" @click="addNote">Save Note</button>
                </form>
            </div>    
        </div>    
    </div>
</template>

<script>
import * as Cookies from "js-cookie"
export default {
    name: "create-note",
    data() {
        return {
            note: {
                title: ``,
                text: ``,
                priority: 1
            },
            savedNotes: [],
            savedNotesPath: `savedNotes`
        }
    },
    methods: {
        addNote(){
            // Get the user input.
            const titleInput = this.note.title
            const textInput = this.note.text
            const priorityInput = Number(this.note.priority)
            let computedPriority
            switch(priorityInput) {
                case 3:
                    computedPriority = {
                        num: priorityInput,
                        class: `note-priority-high`
                    }
                    break;
                case 2:
                    computedPriority = {
                        num: priorityInput,
                        class: `note-priority-medium`
                    }
                    break;
                default:
                    computedPriority = {
                        num: priorityInput,
                        class: `note-priority-low`
                    }
            }
            // Add the note to savedNotes.
            this.savedNotes.push({
                title: titleInput,
                text: textInput,
                time: new Date(Date.now()).toLocaleString(),
                priority: computedPriority,
                mls: Math.round((new Date()).getTime() / 1000)
            })
            this.saveNotes()
            console.log(`New note created.`)
            this.note = {
                title: ``,
                text: ``,
                priority: 1
            }
        },
        saveNotes(){
            Cookies.set(this.savedNotesPath, this.savedNotes)
        }
    },
    created(){
        // Load saved notes from cookies.
        const savedNotesCookiesVersion = Cookies.getJSON(`savedNotes`)
        if(savedNotesCookiesVersion !== null && typeof savedNotesCookiesVersion !== `undefined`){
            this.savedNotes = savedNotesCookiesVersion
        }
    }
}
</script>
