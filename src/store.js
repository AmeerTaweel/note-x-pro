import Vue from 'vue'
import Vuex from 'vuex'
import * as Cookies from "js-cookie"

Vue.use(Vuex)

const NOTES_PATH = `NOTE_X_PRO`

export default new Vuex.Store({
  state: {
    action: `create`,
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
    changeAction(state, action) {
      state.action = action
    },
    addNote(state, note) {
      state.notes.unshift(note)
    },
    editNote(state, options) {
      state.notes[options.index] = options.note
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
    editNote(context, options) {
      context.commit(`editNote`, options)
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
