<template>
  <v-app>
    <v-app-bar :color="colorPrimary" app dark>
      
      <v-toolbar-title class="headline text-uppercase noselect">
        <span class="font-weight-light">Note</span>
        <span>X</span>
        <span class="font-weight-light">Pro</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-btn fixed dark fab bottom right :color="colorAccent">
      <v-icon>add</v-icon>
    </v-btn>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">
.noselect
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

// #app
//   font-family: 'Avenir', Helvetica, Arial, sans-serif
//   -webkit-font-smoothing: antialiased
//   -moz-osx-font-smoothing: grayscale
//   color: #2c3e50
</style>
