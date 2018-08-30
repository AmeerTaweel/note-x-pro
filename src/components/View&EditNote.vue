<template>
    <div id="view-and-edit">
        <h2><span class="text-primary">N</span>ote <span class="text-primary">E</span>ditor:</h2>
        <editor :edit="$store.state.notes[index]" saveButtonText="Save Edits" @save-note="saveEdits"></editor>
    </div>   
</template>

<script>
import { mapActions } from 'vuex'
import Editor from './Editor'
export default {
    name: `view-and-edit`,
    data(){
        return {
            index: this.$route.params.index
        }
    },
    watch: {
        '$route': 'update'
    },
    methods:{
        ...mapActions([
            'editNote',
            'saveNotes'
        ]),
        update(){
            this.index = this.$route.params.index
            if(!Number.isInteger(parseInt(this.index)) 
            || this.$store.state.notes[this.index] === null
            || typeof this.$store.state.notes[this.index] === 'undefined'){
                this.$router.push('/404')
            }
        },
        saveEdits(note){
            this.editNote({
                note: note,
                index: parseInt(this.index)
            })
            this.saveNotes()
        }
    },
    created(){
        this.update()
    },
    components: {
        Editor
    }
}
</script>
