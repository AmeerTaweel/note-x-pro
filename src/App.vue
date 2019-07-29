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

    <v-footer dark padless class="white--text text-center">
      <v-card flat tile class="w-100 h-100 grey darken-3">
        <v-card-text>
          <v-btn v-for="(site, i) in sites" :key="i" class="no-underline mx-4" icon :href="site.url" target="_blank" rel="noopener">
            <v-icon>{{site.icon}}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>Ameer Taweel</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    actions: {
      create: {
        route: `/createnote`,
        icon: `add`
      },
      home: {
        route: `/`,
        icon: `home`
      }
    },
    sites: [{
      url: `https://linkedin.com/in/ameer-taweel/`,
      icon: `fab fa-linkedin`
    }, {
      url: `https://github.com/AmeerTaweel/`,
      icon: `fab fa-github`
    }, {
      url: `http://ameer-taweel.web.app/`,
      icon: `fab fa-edge`
    }]
  }),
  created() {
    this.$store.dispatch(`loadNotes`)
  },
  computed: {
    currentAction(){
      return this.$store.state.action
    },
    action(){
      return this.actions[this.currentAction]
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

.no-underline:hover
    text-decoration: none
</style>
