<template>
    <div id="editor">
        Note Editor
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
