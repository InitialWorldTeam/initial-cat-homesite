export default {
    walletAccounts: [], // 维护所有钱包数据，默认加载 Polkadot已有钱包
    curWalletIndex: 0, // 当前钱包索引
    curQueryWallet: null, // 当前Url参数中的钱包数据
    isApp: false, // 是否移动端
    loading: false, // 全局Loading
    navList: [ // 导航菜单列表
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'My NFTs',
            path: '/myNft/'
        },
        {
            name: 'Box',
            path: ''
        },
        {
            name: 'Maketplace',
            path: ''
        },
        {
            name: 'Farm',
            path: ''
        },
        {
            name: 'Faq',
            path: '/faq'
        },
    ],
    myNftAssets: [], // 当前钱包拥有的NFT列表
    apiProvider: null, // 钱包环境Api
    loadingNftSta: -1, // 加载NFT状态, 0: Loading NFT, 1:有NFT, 2:空NFT
};
