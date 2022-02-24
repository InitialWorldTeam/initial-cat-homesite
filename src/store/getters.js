export default {
    // 当前浏览器(Polkadot)环境钱包
    curRootWallet(state, getters) {
        return state.walletAccounts[state.curWalletIndex] || null;
    },
    // token精度
    tokenDecimals(state) {
        return state.apiProvider?.registry?.chainDecimals[0] || 9999;
    },
};
