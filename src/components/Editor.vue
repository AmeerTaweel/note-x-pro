<template>
    <div id="editor">
        <h2><span class="text-primary">N</span>ote <span class="text-primary">E</span>ditor:</h2>
    </div>   
</template>

<script>
export default {
    name: `editor`,
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
    }
}
</script>
