export default {
    curWallet(state, getters) {
        return state.walletAccounts[state.curWalletIndex] || null;
    },
    // token精度
    tokenDecimals(state) {
        return state.apiProvider?.registry?.chainDecimals[0] || 9999;
    }
};
