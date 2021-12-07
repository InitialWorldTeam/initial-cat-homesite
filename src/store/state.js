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
            name: 'Box',
            path: '/box'
        },
        {
            name: 'My Cat',
            path: '/myCat'
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
            path: ''
        },
    ]
};
