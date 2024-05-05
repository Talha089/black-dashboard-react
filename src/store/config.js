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
let env = AppMode[0] || 'development', networkId = '', message = '', explorer = '';
switch (AppMode[0]) {
  case 'development':
    networkId = 11155111;
    message = 'Please switch your network to Sepolia testnet';
    SocketUrl = development;
    explorer = 'https://sepolia.etherscan.io/'
    break;
  case 'production':
    networkId = 1;
    SocketUrl = production;
    message = 'Please switch your network to Ethereum Mainnet';
    explorer = 'https://etherscan.io'
    break;
  case 'testing':
    networkId = 4;
    SocketUrl = testing;
    message = 'Please switch your network to Rinkeby testnet';
    explorer = 'https://rinkeby.etherscan.io'
    break;
  default:
    networkId = 11155111;
    // SocketUrl = 'https://dserver.cheebapet.io';
    SocketUrl = 'http://localhost:4000';
    message = 'Please switch your network to Sepolia testnet';
    explorer = 'https://sepolia.etherscan.io/'
}

let ApiUrl = `${SocketUrl}/api`;
export { AppTitle, ApiUrl, SocketUrl, networkId, message, explorer, env };