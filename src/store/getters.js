export default {
    curWallet(state, getters) {
        return state.walletAccounts[state.curWalletIndex] || null;
    }
};
