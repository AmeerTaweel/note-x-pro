import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    }
  },
  actions: {
    applyFilter(context, filter) {
      context.commit(filter)
    }
  }
})
