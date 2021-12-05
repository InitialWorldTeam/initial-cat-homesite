export default {
    setAccount(state, value) {
        state.accounts = value;
    },
    setClientType(state, value) {
        state.isApp = value;
    },
    setCurNav(state, value) {
        state.curNav = value;
    }
};
