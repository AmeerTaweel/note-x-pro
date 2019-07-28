import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    route: `home`,
    notes: [{
      title: `TestrgrwgwrvfTestrgrwgwrvfTestrgrwgwrvfTestrgrwgwrvfTestrgrwgwrvfTestrgrwgwrvfTestrgrwgwrvf`,
        text: `10`,
        time: `7/27/2019, 4:36:14 PM`,
        priority: {
          num: 1,
          color: `green`
        },
        mls: `10`,
        tags: [`low_priority`]
    }, {
      title: `Testrgrwgwrvf`,
        text: `20`,
        time: `7/27/2019, 4:36:14 PM`,
        priority: {
          num: 1,
          color: `green`
        },
        mls: `20`,
        tags: [`low_priority`]
    }, {
      title: `Testrgrwgwrvf`,
        text: `30`,
        time: `7/27/2019, 4:36:14 PM`,
        priority: {
          num: 1,
          color: `green`
        },
        mls: `30`,
        tags: [`low_priority`]
    }, {
      title: `TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTt`,
        text: `40`,
        time: `7/27/2019, 4:36:14 PM`,
        priority: {
          num: 1,
          color: `green`
        },
        mls: `40`,
        tags: [`low_priority`]
    }, {
      title: `Testrgrwgwrvf`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
        time: `7/27/2019, 4:36:14 PM`,
        priority: {
          num: 1,
          color: `green`
        },
        mls: `50`,
        tags: [`low_priority`]
    }, {
      title: `Testrgrwgwrvf`,
        text: ` 60`,
        time: `7/27/2019, 4:36:14 PM`,
        priority: {
          num: 2,
          color: `orange`
        },
        mls: `60`,
        tags: [`low_priority`, `low_priority`, `low_priority`,`low_priority`]
    }, {
      title: `Testrgrwgwrvf`,
        text: `70`,
        time: `7/27/2019, 4:36:14 PM`,
        priority: {
          num: 3,
          color: `red`
        },
        mls: `70`,
        tags: [`low_priority`]
    }]
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
    deleteNote(state, index) {
      state.notes.splice(index, 1)
    }
  },
  actions: {
    applyFilter(context, filter) {
      context.commit(filter)
    },
    deleteNote(context, index) {
      context.commit(`deleteNote`, index)
    }
  }
})
