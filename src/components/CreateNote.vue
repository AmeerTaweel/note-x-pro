<template>
    <div id="create-note" class="m-20">
        <h2><span class="text-primary">C</span>reate <span class="text-primary">N</span>ew <span class="text-primary">N</span>ote:</h2>
        <div class="container-fluid">
            <div class="row">
                <form class="col-xs-12">
                    <div class="form-group">
                        <label for="note-title">Note Title:</label>
                        <input type="text" class="form-control" id="note-title" placeholder="ex: I went to the beach" v-model="note.title">
                    </div>
                    <div class="form-group">
                        <label for="note-text">Note Text:</label>
                        <textarea class="form-control" id="note-text" placeholder="ex: I really enjoyed with my best friends!" v-model="note.text"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Priority:</label><br/>
                        <input type="radio" name="priority" value="1" v-model="note.priority" checked> Low Priority<br/>
                        <input type="radio" name="priority" value="2" v-model="note.priority"> Medium Priority<br/>
                        <input type="radio" name="priority" value="3" v-model="note.priority"> High Priority
                    </div>
                    <div class="form-group">
                        <label>Tags (Add Up To 3):</label><br/>
                        <p class="text-muted">Seperate tags with spaces. Tags can only contain lowercase letters, numbers, underscores and dots.</p>
                        <div class="tags-holder">
                            <button type="button" v-for="(tag, index) in getTags" :key="index" class="tag btn btn-primary" @click="removeTag(index)">
                                {{tag}} <i class="material-icons align-middle">close</i>
                            </button>
                            <input type="text" class="tags-input" v-model="tagsInput" v-on:keyup.delete="removeLastTag">
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" @click="createNote">
                        <i class="material-icons align-middle">save</i>Save Note
                    </button>
                </form>
            </div>    
        </div>
        <notifications group="create-note" class="m-20"/>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "create-note",
    data() {
        return {
            note: {
                title: ``,
                text: ``,
                priority: 1,
                tags: []
            },
            alertMessage: `<strong>Note Saved!</strong>`,
            alertType: `success`,
            tagsInput: ``,
            isLastTagRemovable: false
        }
    },
    methods: {
        ...mapActions([
            'addNote',
            'saveNotes'
        ]),
        createNote(){
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
                        class: 'note-priority-high'
                    }
                    this.note.tags.splice(0, 0, 'high_priority')
                    break;
                case 2:
                    computedPriority = {
                        num: priorityInput,
                        class: 'note-priority-medium'
                    }
                    this.note.tags.splice(0, 0, 'medium_priority')
                    break;
                default:
                    computedPriority = {
                        num: priorityInput,
                        class: 'note-priority-low'
                    }
                    this.note.tags.splice(0, 0, 'low_priority')
            }
            // Add the note to savedNotes.
            const new_note = {
                title: titleInput,
                text: textInput,
                time: new Date(Date.now()).toLocaleString(),
                priority: computedPriority,
                mls: Math.round((new Date()).getTime() / 1000),
                tags: this.note.tags
            }
            this.addNote(new_note)
            this.saveNotes()
            this.alertMessage = `<strong>Note Saved!</strong>`
            this.alertType = `success`
            this.showAlert()
            this.note = {
                title: ``,
                text: ``,
                priority: 1,
                tags: []
            }
        },
        removeTag(index){
            this.note.tags.splice(index, 1)
        },
        showAlert(){
            this.$notify({
                group: "create-note",
                text: this.alertMessage,
                type: this.alertType
            })
        },
        removeLastTag(){
            if(this.tagsInput === `` || this.tagsInput === null || typeof this.tagsInput === `undefined`){
                if(this.isLastTagRemovable){
                    this.removeTag(this.note.tags.length - 1)
                    this.isLastTagRemovable = false
                }else{
                    this.isLastTagRemovable = true
                }
            }
        }
    },
    computed: {
        getTags(){
            // Regular expression to valiadate tags.
            const validTag = /^[a-z._0-9]+$/
            // Check if a space added to the end of the tagsInput.
            if(this.tagsInput[this.tagsInput.length - 1] === ` ` && this.tagsInput.length > 1){
                // Remove the space at the end.
                this.tagsInput = this.tagsInput.substring(0, this.tagsInput.length - 1)
                // Remove the space in the start of the tag if found.
                if(this.tagsInput[0] === ' '){
                    this.tagsInput = this.tagsInput.substring(1, this.tagsInput.length)
                }
                // Only add the tag if there is less than 3 tags.
                if(this.note.tags.length >= 3){
                    this.alertMessage = `<strong>You can't add more than 3 tags.</strong>`
                    this.alertType = `error`
                    this.showAlert()
                }else if(!validTag.test(this.tagsInput)){
                    console.log(this.tagsInput)
                    this.alertMessage = `<strong>Tags can only contain lowercase letters, numbers, underscores and dots.</strong>`
                    this.alertType = `error`
                    this.showAlert()
                }else{
                    // Add the tag to the list of tags.
                    this.note.tags.push(this.tagsInput)
                }
                // Clean the input feild.
                this.tagsInput = ``
            }
            return this.note.tags
        }
    }
}
</script>

<style>
.tags-holder {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 2px;
}
.tags-input {
    border-width: 0px;
    outline-width: 0px;
}

.tag, .tags-input {
    padding: 5px;
    margin: 3px;
}
</style>
