import * as types from './mutation-types.js'
import * as Cookies from "js-cookie"

// Load saved notes from cookies.
export const loadNotes = ({commit}) => {
    const savedNotes = Cookies.getJSON(`savedNotes`)
    if(savedNotes !== null && typeof savedNotes !== `undefined`){
        commit(types.SET_NOTES, savedNotes)
    }
}

// Add a new note.
export const addNote = ({commit}, note) => {
    if(note !== null && typeof note !== `undefined`){
        commit(types.ADD_NOTES, [note])
    }
}

// Remove a note.
export const removeNote = ({commit}, index) => {
    commit(types.REMOVE_NOTE, index)
}

// Change a note value.
export const editNote = ({commit}, indexNote) => {
    commit(types.EDIT_NOTE, indexNote)
}

// Save notes in the browser cookies.
export const saveNotes = ({commit}) => {
    commit(types.SAVE_NOTES)
}

// Filter notes by priority, and time.
export const filterNotes = ({commit}, filter) => {
    commit(types.FILTER_NOTES, filter)
}