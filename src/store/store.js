const store = {
    state: {
        token: "",
    },

    mutations: {
        set_token(state, token) {
            state.token = token
        },

        remove_token(state) {
            state.token = ""
        }
    }
}

export default store