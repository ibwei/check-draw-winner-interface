import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';


class Provider {
  provider: any;
  chain: any;
  chainId: any;
  props: any;
  fullnode: any;
  constructor(props: any = {}) {
    this.props = props;
    this.chain = props.chain;
    this.chainId = props.chainId;
    this.fullnode = props.fullnode;
    this.provider = new ethers.providers.JsonRpcProvider(
      this.fullnode,
      this.chainId
    );
  }

  getProvider() {
    return this.provider;
  }

  async getBlockNumber() {
    return await this.provider.getBlockNumber();
  }


  async getChainBalance(address, blockTag = 'latest') {
    return await this.provider.getBalance(address, blockTag);
  }

  async getTokenBalance(address, contract, blockTag = 'latest') {
    const balanceOfAbi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ];
    const erc20 = new ethers.Contract(contract, balanceOfAbi, this.provider);

    return await erc20.balanceOf(address, { blockTag });
  }

  async getTransactionCount(address, blockTag = 'latest') {
    return await this.provider.getTransactionCount(address, blockTag);
  }

  async getTransaction(hash) {
    return await this.provider.getTransaction(hash);
  }

  async getTransactionReceipt(hash) {
    return await this.provider.getTransactionReceipt(hash);
  }

  async getGasPrice() {
    return await this.provider.getGasPrice();
  }

  async estimateGas(transaction) {
    return await this.provider.estimateGas(transaction);
  }

  async sendTransaction(transaction) {
    return await this.provider.sendTransaction(transaction);
  }
}

export function getWalletProvider() {
  
  const privateKey = process.env.REACT_APP_WALLET_PRIVATE_KEY

  const provider = new ethers.Wallet(
    privateKey,
    new Provider({
      chain: 'kcc',
      chainId: Number(process.env.REACT_APP_CHAIN_ID),
      fullnode: process.env.REACT_APP_NETWORK_URL,
    }).getProvider()
  );

  return provider
}