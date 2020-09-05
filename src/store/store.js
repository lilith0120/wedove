import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {
        id: "",
        username: "",
    },

    mutations: {
        set_id(state, id) {
            state.id = id
        },

        remove_id(state) {
            state.id = ""
        },

        set_username(state, username) {
            state.username = username
        },

        remove_username(state) {
            state.username = ""
        }
    }
}
)

export default store