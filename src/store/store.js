const store = {
    state: {
        token: "",
        username: "",
    },

    mutations: {
        set_token(state, token) {
            state.token = token
        },

        remove_token(state) {
            state.token = ""
        },

        set_username(state, username) {
            state.username = username
        },

        remove_username(state) {
            state.username = ""
        }
    }
}

export default store