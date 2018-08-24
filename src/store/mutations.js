import * as types from './mutation-types.js'

export const mutations = {
    // Modify the notes array.
    [types.SET_NOTES] (state, notes){
        state.notes.push(...notes)
    }
}