import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    notes: []
}

export default new Vuex.Store({
    state
})