import UTILS from '@/config/util';
import {
    OwnWalletIdxNameSpace
} from '@/config/util/const';

export default {
    setAccount(state, value) {
        state.walletAccounts = value;
    },
    setCurWalletIdx(state, value) {
        state.curWalletIndex = value;
        UTILS.setLocal(OwnWalletIdxNameSpace, value);
    },
    setQueryWallet(state, value) {
        state.curQueryWallet = value;
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
        state.myNftAssets = value;
    },
    setApiProvider(state, value) {
        state.apiProvider = value;
    },
    setLoadingNftSta(state, value) {
        state.loadingNftSta = value;
    },
};
