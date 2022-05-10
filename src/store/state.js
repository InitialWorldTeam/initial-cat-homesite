export default {
    walletAccounts: [], // 维护所有钱包数据，默认加载 Polkadot已有钱包
    curWalletIndex: -1, // 当前钱包索引
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
            path: '/box'
        },
        {
            name: 'Marketplace',
            path: ''
        },
        {
            name: 'Farm',
            path: ''
        },
        {
            name: 'FAQ',
            path: '/FAQ'
        },
    ],
    myNftAssets: [], // 当前钱包拥有的所有NFT列表
    curPageNftList: [], // 当前页码展示的NFT列表
    curPage: 1, // 当前页码
    nftPageSize: 10, // 每页显示NFT条目个数
    apiProvider: null, // 钱包环境Api
    loadingNftSta: -1, // 加载NFT状态, 0: Loading NFT, 1:有NFT, 2:空NFT
    kusamaPrice: 0, // 当前 Kusama 实时价格
    mintType: '1',
    curSwapData: null
};
