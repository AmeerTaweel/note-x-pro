import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    route: `home`,
    notes: []
  },
  mutations: {
    moreImportantFirst(state) {
      state.notes.sort((a, b) => {
        return b.priority.num - a.priority.num
      })
    },
    lessImportantFirst(state) {
      state.notes.sort((a, b) => {
        return a.priority.num - b.priority.num
      })
    },
    newerFirst(state) {
      state.notes.sort((a, b) => {
        return b.mls - a.mls
      })
    },
    olderFirst(state) {
      state.notes.sort((a, b) => {
        return a.mls - b.mls
      })
    },
    changeRoute(state, newRoute) {
      state.route = newRoute
    },
    addNote(state, note) {
      state.notes.unshift(note)
    },
    deleteNote(state, index) {
      state.notes.splice(index, 1)
    }
  },
  actions: {
    applyFilter(context, filter) {
      context.commit(filter)
    },
    addNote(context, note) {
      context.commit(`addNote`, note)
    },
    deleteNote(context, index) {
      context.commit(`deleteNote`, index)
    }
  }
})
