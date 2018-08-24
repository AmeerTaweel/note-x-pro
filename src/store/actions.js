import * as types from './mutation-types.js'

// Load saved notes from cookies.
export const loadNotes = ({commit}) => {
    const savedNotes = Cookies.getJSON(`savedNotes`)
    if(savedNotes !== null && typeof savedNotes !== `undefined`){
        commit(types.SET_NOTES, savedNotes)
    }
}