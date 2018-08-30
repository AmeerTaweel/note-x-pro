import * as types from './mutation-types.js'
import * as Cookies from "js-cookie"

const SAVED_NOTES_PATH = 'savedNotes'

export const mutations = {
    // Init notes.
    [types.SET_NOTES] (state, notes){
        state.notes = notes
    },
    // Add a new note.
    [types.ADD_NOTES] (state, notes){
        state.notes.push(...notes)
    },
    // Change the value of a note.
    [types.EDIT_NOTE] (state, indexNote){
        state.notes[indexNote.index] = indexNote.note
    },
    // Remove a note.
    [types.REMOVE_NOTE] (state, index){
        state.notes.splice(index, 1)
    },
    // Save notes in the browser cookies.
    [types.SAVE_NOTES] (state){
        Cookies.set(SAVED_NOTES_PATH, state.notes)
    },
    // Filter notes by priority, and time.
    [types.FILTER_NOTES] (state, filter){
        switch(filter){
            // More important first.
            case 1:
                state.notes.sort((a, b) => {
                    return b.priority.num - a.priority.num
                })
                break
            // Less important first.    
            case 2:
                state.notes.sort((a, b) => {
                    return a.priority.num - b.priority.num
                })
                break
            // Newer first.    
            case 3:
                state.notes.sort((a, b) => {
                    return b.mls - a.mls
                })
                break
            // Older first.      
            case 4:
                state.notes.sort((a, b) => {
                    return a.mls - b.mls
                })
                break      
        }
    }
}