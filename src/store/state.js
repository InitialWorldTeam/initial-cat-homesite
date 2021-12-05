export default {
    accounts: [], // 维护所有钱包数据
    curWallet: {  // 当前钱包
        address: '0x97893kjf7fsjkb38rdsf89shf3s67E5'
    }, 
    isApp: false, // 是否移动端
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
