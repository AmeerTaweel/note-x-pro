<template>
    <div id="view-and-edit">
        <h2><span class="text-primary">N</span>ote <span class="text-primary">E</span>ditor:</h2>
        <editor></editor>
    </div>   
</template>

<script>
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
        update(){
            this.index = this.$route.params.index
        }
    },
    components: {
        Editor
    }
}
</script>
