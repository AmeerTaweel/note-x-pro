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
        <notifications group="create-note" />
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
            savedNotesPath: `savedNotes`,
            alertMessage: `<strong>Note Saved!</strong>`,
            alertType: `success`
        }
    },
    methods: {
        addNote(){
            // Get the user input.
            const titleInput = this.note.title
            const textInput = this.note.text
            if(titleInput === `` || textInput === ``){
                this.alertMessage = `<strong>Error: You must provide a title &#38; a body.</strong>`
                this.alertType = `error`
                this.showAlert()
                return
            }
            const priorityInput = Number(this.note.priority)
            let computedPriority
            switch(priorityInput) {
                case 3:
                    computedPriority = {
                        num: priorityInput,
                        class: `note-priority-high`,
                        name: `#high_priority`
                    }
                    break;
                case 2:
                    computedPriority = {
                        num: priorityInput,
                        class: `note-priority-medium`,
                        name: `#mediummedium_priority`
                    }
                    break;
                default:
                    computedPriority = {
                        num: priorityInput,
                        class: `note-priority-low`,
                        name: `#low_priority`
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
            this.alertMessage = `<strong>Note Saved!</strong>`
            this.alertType = `success`
            this.showAlert()
            this.note = {
                title: ``,
                text: ``,
                priority: 1
            }
        },
        saveNotes(){
            Cookies.set(this.savedNotesPath, this.savedNotes)
        },
        showAlert(){
            this.$notify({
                group: "create-note",
                text: this.alertMessage,
                type: this.alertType
            })
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