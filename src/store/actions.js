import * as types from './mutation-types.js'
import * as Cookies from "js-cookie"

// Load saved notes from cookies.
export const loadNotes = ({commit}) => {
    const savedNotes = Cookies.getJSON(`savedNotes`)
    if(savedNotes !== null && typeof savedNotes !== `undefined`){
        commit(types.SET_NOTES, savedNotes)
    }
}

// Remove a note from the notes array.
export const removeNote = ({commit}, index) => {
    commit(types.REMOVE_NOTE, index)
}

// Save notes in the browser cookies.
export const saveNotes = ({commit}) => {
    commit(types.SAVE_NOTES)
}

// Load saved notes from cookies.
export const filterNotes = ({commit}, filter) => {
    commit(types.FILTER_NOTES, filter)
}