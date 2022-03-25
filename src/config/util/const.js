// Base素材库命名空间
const BaseNameSpace = 'Initial_World_Base';

// 测试环境Provider
const Providers_Test = {
    ws: 'wss://twskusama.initialworld.net',
    http: 'https://thttpkusama.initialworld.net'
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
const IpfsSwitchDomain = 'https://initialworld.mypinata.cloud/';

// 最低钱包Balance限制
const Min_Ksm_Balance = 0.0015 * Math.pow(10, 12);

// 过滤 NFT id 的特定字符串
const Filter_NftId_Symbol = 'INITIALWORLD';

// 标记是否过滤 NFT id
const Is_Filter_NftId = true;

// Kusama Api Host
const Api_Host_Kusama = 'https://kusama.api.subscan.io';

// NFT Type List
const Nft_Type_List = [
    'CAT_CLOTHES_V0',
    'CAT_HAT_V0',
    'CAT_SHOES_V0'
]


export {
    BaseNameSpace,
    Providers_Test,
    Providers_Product,
    Env_Debug,
    OwnWalletNameSpace,
    OwnWalletIdxNameSpace,
    IpfsSwitchDomain,
    Min_Ksm_Balance,
    Filter_NftId_Symbol,
    Is_Filter_NftId,
    Api_Host_Kusama,
    Nft_Type_List
}