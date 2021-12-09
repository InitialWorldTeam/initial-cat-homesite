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
    ],
    providers: {
        kusama: {
            Parity: 'wss://kusama-rpc.polkadot.io',
            OnFinality: 'wss://kusama.api.onfinality.io/public-ws',
            'Patract Elara': 'wss://pub.elara.patract.io/kusama',
            'Geometry Labs': 'wss://kusama.geometry.io/websockets',
            Dwellir: 'wss://kusama-rpc.dwellir.com',
            'light client': 'light://substrate-connect/kusama'
        },
        polkadot: {
            Parity: 'wss://rpc.polkadot.io',
            OnFinality: 'wss://polkadot.api.onfinality.io/public-ws',
            'Patract Elara': 'wss://pub.elara.patract.io/polkadot',
            'Geometry Labs': 'wss://polkadot.geometry.io/websockets',
            // Dwellir: 'wss://polkadot-rpc.dwellir.com',
            'light client': 'light://substrate-connect/polkadot'
            // Pinknode: 'wss://rpc.pinknode.io/polkadot/explorer' // https://github.com/polkadot-js/apps/issues/5721
        }
    }
};
