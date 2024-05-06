import { Ethereum } from "@thirdweb-dev/chains";
/* -- set app title --*/
const AppTitle = 'Admin Cheeba NFT Collection';


/* -- set app mode -- */
// const AppMode = [''];
// const AppMode = ['development'];
const AppMode = ['production'];

/* -- set API URLs --*/
const testing = 'https://dserver.cheebapet.io';
const production = 'https://server.cheebapet.io';
const development = 'https://dserver.cheebapet.io';

let SocketUrl;
// let env = AppMode[0] || 'development', networkId = '', message = '', explorer = '';
let env = AppMode[0] || 'development', network, networkId, message, explorer, REACT_APP_TEMPLATE_CLIENT_ID;

switch (AppMode[0]) {
  case 'development':
    network = Ethereum;
    networkId = 11155111;
    message = 'Please switch your network to Sepolia testnet';
    SocketUrl = development;
    explorer = 'https://sepolia.etherscan.io/'
    REACT_APP_TEMPLATE_CLIENT_ID = 'd4e861e5e630a3d6aeb6b5197f45ac5c';
    break;
  case 'production':
    network = Ethereum;
    networkId = 1;
    SocketUrl = production;
    message = 'Please switch your network to Ethereum Mainnet';
    explorer = 'https://etherscan.io'
    REACT_APP_TEMPLATE_CLIENT_ID = 'd4e861e5e630a3d6aeb6b5197f45ac5c';
    break;
  case 'testing':
    network = Ethereum;
    networkId = 4;
    SocketUrl = testing;
    message = 'Please switch your network to Rinkeby testnet';
    explorer = 'https://rinkeby.etherscan.io'
    REACT_APP_TEMPLATE_CLIENT_ID = 'd4e861e5e630a3d6aeb6b5197f45ac5c';
    break;
  default:
    network = Ethereum;
    networkId = 11155111;
    // SocketUrl = 'https://dserver.cheebapet.io';
    SocketUrl = 'http://localhost:4000';
    message = 'Please switch your network to Sepolia testnet';
    explorer = 'https://sepolia.etherscan.io/'
    REACT_APP_TEMPLATE_CLIENT_ID = 'd4e861e5e630a3d6aeb6b5197f45ac5c';
}

let ApiUrl = `${SocketUrl}/api`;
export { AppTitle, ApiUrl, SocketUrl, networkId, message, explorer, env , REACT_APP_TEMPLATE_CLIENT_ID, network};