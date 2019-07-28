<template>
  <v-app>
    <v-app-bar :color="colorPrimary" app dark>
      
      <v-toolbar-title class="headline text-uppercase noselect pointer" @click="$router.push(`/`)">
        <span class="font-weight-light">Note</span>
        <span>X</span>
        <span class="font-weight-light">Pro</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-fab-transition>
      <v-btn fixed dark fab bottom right :color="colorAccent" :key="action.icon" @click="$router.push(action.route)">
        <v-icon>{{action.icon}}</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    actions: {
      home: {
        route: `/createnote`,
        icon: `add`
      },
      view: {
        route: `/`,
        icon: `home`
      },
      create: {
        route: `/`,
        icon: `home`
      }
    }
  }),
  computed: {
    currentRoute(){
      return this.$store.state.route
    },
    action(){
      return this.actions[this.currentRoute]
    }
  }
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

.word-break
  word-break: break-all

.pointer
  cursor: pointer
</style>
