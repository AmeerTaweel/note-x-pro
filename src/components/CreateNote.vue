<template>
    <div id="create-note" class="m-20">
        <h2><span class="text-primary">C</span>reate <span class="text-primary">N</span>ew <span class="text-primary">N</span>ote:</h2>
        <editor :edit="note" :clearAfterSave="true" saveButtonText="Create Note" @save-note="createNote"></editor>
        <button type="button" class="action-btn btn btn-primary" @click="viewSavedNotes">
            <i class="material-icons align-middle">list</i> Back to saved notes
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Editor from './Editor'
export default {
    name: "create-note",
    data(){
        return {
            note: {
                title: ``,
                text: ``,
                time: ``,
                priority: {
                    num: `1`,
                    class: `note-priority-low`
                },
                mls: ``,
                tags: [`low_priority`]
            }
        }
    },
    methods: {
        ...mapActions([
            'addNote',
            'saveNotes'
        ]),
        createNote(note){
            this.addNote(note)
            this.saveNotes()
        },
        viewSavedNotes(){
            this.$router.push('/saved')
        }
    },
    components: {
        Editor
    }
}
</script>
