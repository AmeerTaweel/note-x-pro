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
    </div>    
</template>

<script>
export default {
    name: `editor`,
    data(){
        return {
            note: {
                title: ``,
                text: ``,
                priority: 1,
                tags: []
            }
        }
    }
}
</script>
