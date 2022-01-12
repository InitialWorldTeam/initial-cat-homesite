export default {
    walletAccounts: [], // 维护所有钱包数据
    curWalletIndex: 0, // 当前钱包索引
    isApp: false, // 是否移动端
    loading: false, // 全局Loading
    curNav: 'Home', // 标记当前路由页面
    navList: [ // 导航菜单列表
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'My NFTs',
            path: '/myNft'
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
            name: 'FAQ',
            path: '/faq'
        },
    ],
    myNftAssets: [], // 当前钱包拥有的NFT列表
    apiProvider: null, // 钱包环境Api
    loadingNftSta: -1, // 加载NFT状态, 0: Loading NFT, 1:有NFT, 2:空NFT
};
