// Base素材库命名空间
const BaseNameSpace = 'Initial_World_Base';

// 测试环境Provider
const Providers_Test = {
    ws: 'ws://104.198.42.65:9944',
    http: 'http://104.198.42.65:9933'
}

// 正式环境Provider
const Providers_Product = {
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

// 当前环境
const Env_Debug = process.env.NODE_ENV != 'production';

// 已查询到钱包命名空间
const OwnWalletNameSpace = 'Initial_World_Wallets';

// 已查询到当前钱包索引
const OwnWalletIdxNameSpace = 'Initial_World_Wallet_Index';

// 可直接访问ipfs静态资源替换域名
const IpfsSwitchDomain = 'https://test-initialworld.mypinata.cloud/';

export {
    BaseNameSpace,
    Providers_Test,
    Providers_Product,
    Env_Debug,
    OwnWalletNameSpace,
    OwnWalletIdxNameSpace,
    IpfsSwitchDomain
}