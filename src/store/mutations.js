export default {
    setAccount(state, value) {
        state.walletAccounts = value;
    },
    setClientType(state, value) {
        state.isApp = value;
    },
    setCurNav(state, value) {
        state.curNav = value;
    },
    setLoading(state, value) {
        state.loading = value;
    },
    setCatAssetList(state, value) {
        state.myCatAssets = value;
    }
};
