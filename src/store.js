import Vue from 'vue'
import Vuex from 'vuex'
import * as Cookies from "js-cookie"

Vue.use(Vuex)

const NOTES_PATH = `NOTE_X_PRO`

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
    },
    saveNotes(state) {
      Cookies.set(NOTES_PATH, state.notes)
    },
    loadNotes(state) {
      const notes = Cookies.getJSON(NOTES_PATH)
      if(notes !== null && typeof notes !== `undefined`){
          state.notes = notes
      }
    }
  },
  actions: {
    applyFilter(context, filter) {
      context.commit(filter)
      context.commit(`saveNotes`)
    },
    addNote(context, note) {
      context.commit(`addNote`, note)
      context.commit(`saveNotes`)
    },
    deleteNote(context, index) {
      context.commit(`deleteNote`, index)
      context.commit(`saveNotes`)
    },
    loadNotes(context) {
      context.commit(`loadNotes`)
    }
  }
})
