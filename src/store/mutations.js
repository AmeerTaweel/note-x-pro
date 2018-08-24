import * as types from './mutation-types.js'
import * as Cookies from "js-cookie"

const SAVED_NOTES_PATH = 'savedNotes'

export const mutations = {
    // Modify the notes array.
    [types.SET_NOTES] (state, notes){
        state.notes.push(...notes)
    },
    // Remove a note from the notes array.
    [types.REMOVE_NOTE] (state, index){
        state.notes.splice(index, 1)
    },
    // Save notes in the browser cookies.
    [types.SAVE_NOTES] (state){
        Cookies.set(SAVED_NOTES_PATH, state.notes)
    },
    // Filter notes array.
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