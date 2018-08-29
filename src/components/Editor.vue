<template>
    <div id="editor">
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
                        <input type="radio" name="priority" value="1" v-model="note.priority.num" checked> Low Priority<br/>
                        <input type="radio" name="priority" value="2" v-model="note.priority.num"> Medium Priority<br/>
                        <input type="radio" name="priority" value="3" v-model="note.priority.num"> High Priority
                    </div>
                    <div class="form-group">
                        <label>Tags (Add Up To 3):</label><br/>
                        <p class="text-muted">Seperate tags with spaces. Tags can only contain lowercase letters, numbers, underscores and dots.</p>
                        <div class="tags-holder">
                            <button type="button" v-for="(tag, index) in getTags" :key="index" class="tag btn btn-primary" @click="removeTag(index + 1)">
                                {{tag}} <i class="material-icons align-middle">close</i>
                            </button>
                            <input type="text" class="tags-input" v-model="tagsInput" v-on:keyup.delete="removeLastTag">
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" @click="save">
                        <i class="material-icons align-middle mr-2">save</i>{{saveButtonText}}
                    </button>
                </form>
            </div>    
        </div>
        <notifications group="edit-note" class="m-20"/>
    </div>    
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: `editor`,
    data(){
        return {
            note: {},
            alertMessage: `<strong>Note Saved!</strong>`,
            alertType: `success`,
            tagsInput: ``,
            isLastTagRemovable: true
        }
    },
    props: [
        'edit',
        'saveButtonText'
    ],
    watch: {
        'note.priority.num': 'updatePriority'
    },
    methods: {
        updatePriority(){
            const priority = Number(this.note.priority.num)
            switch(priority) {
                case 3:
                    this.note.priority.class = 'note-priority-high'
                    this.note.tags[0] = 'high_priority'
                    break
                case 2:
                    this.note.priority.class = 'note-priority-medium'
                    this.note.tags[0] = 'medium_priority'
                    break
                default:
                    this.note.priority.class = 'note-priority-low'
                    this.note.tags[0] = 'low_priority'
            }
        },
        save(){
            // Check for invalid notes.
            if(this.note.title === `` || this.note.text === ``){
                this.alertMessage = `<strong>Error: You must provide a title &#38; a body.</strong>`
                this.alertType = `error`
                this.showAlert()
                return
            }
            if(this.note.time === `` || typeof this.note.time === `undefined` || this.note.time === null){
                this.note.time = new Date(Date.now()).toLocaleString()
                this.note.mls = Math.round((new Date()).getTime() / 1000)
            }
            // Emit the note with an event.
            this.$emit('save-note', this.note)
            this.alertMessage = `<strong>Note Saved!</strong>`
            this.alertType = `success`
            this.showAlert()
        },
        removeTag(index){
            this.note.tags.splice(index, 1)
        },
        showAlert(){
            this.$notify({
                group: "edit-note",
                text: this.alertMessage,
                type: this.alertType
            })
        },
        removeLastTag(){
            if(this.tagsInput === `` || this.tagsInput === null || typeof this.tagsInput === `undefined`){
                if(this.isLastTagRemovable){
                    if(this.note.tags.length !== 1){
                        this.removeTag(this.note.tags.length - 1)
                    }
                }else{
                    this.isLastTagRemovable = true
                }
            }
        },
        viewSavedNotes(){
            this.$router.push('./saved')
        }
    },
    computed: {
        getTags(){
            // Regular expression to valiadate tags.
            const validTag = /^[a-z._0-9]+$/
            // Check if a space added to the end of the tagsInput.
            if(this.tagsInput[this.tagsInput.length - 1] === ` ` && this.tagsInput.length > 1){
                this.isLastTagRemovable = true
                // Remove the space at the end.
                this.tagsInput = this.tagsInput.substring(0, this.tagsInput.length - 1)
                // Remove the space in the start of the tag if found.
                if(this.tagsInput[0] === ' '){
                    this.tagsInput = this.tagsInput.substring(1, this.tagsInput.length)
                }
                // Only add the tag if there is less than 3 tags.
                if(this.note.tags.length >= 4){
                    this.alertMessage = `<strong>You can't add more than 3 tags.</strong>`
                    this.alertType = `error`
                    this.showAlert()
                }else if(!validTag.test(this.tagsInput)){
                    this.alertMessage = `<strong>Tags can only contain lowercase letters, numbers, underscores and dots.</strong>`
                    this.alertType = `error`
                    this.showAlert()
                }else{
                    // Add the tag to the list of tags.
                    this.note.tags.push(this.tagsInput)
                }
                // Clean the input feild.
                this.tagsInput = ``
            }else if(this.tagsInput.length > 0){
                this.isLastTagRemovable = false
            }
            return this.note.tags.slice(1)
        }
    },
    created(){
        this.note = JSON.parse(JSON.stringify(this.edit))
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