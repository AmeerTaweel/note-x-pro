<template>
    <div id="page-not-found">
        <div class="row">
            <div class="col-4 col-md-5"/>
            <div class="col-4 col-md-2 p-2">
                <svg class="vector rounded mx-auto d-block" viewBox="0 0 24 24">
                    <path fill="#dc3545" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
            </div>
            <div class="col-4 col-md-5"/>
        </div>
        <h1 class="text-danger text-center">Error 404: Page Not Found</h1>
        <h1 class="text-muted text-center"><small>This page isn't available</small></h1>
        <h2 class="text-muted text-center"><small>The link you followed may be broken, or the page may have been removed.</small></h2>
        <div class="row justify-content-center m-4">
            <button type="button" class="btn btn-primary btn-lg" @click="goHome">Go To Homepage</button>
        </div>
    </div>    
</template>

<script>
export default {
    name: `page-not-found`,
    methods: {
        goHome(){
            this.$router.push('/saved')
        }
    }
}
</script>
