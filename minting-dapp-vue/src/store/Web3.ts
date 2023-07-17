import { defineStore } from 'pinia'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig, getContract, prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { polygon } from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { toast } from 'vue3-toastify'

import NetworkConfigInterface from '../../../smart-contract/lib/NetworkConfigInterface'
import CollectionConfig from '../../../smart-contract/config/CollectionConfig'
import Whitelist from '../scripts/lib/Whitelist'

// eslint-disable-next-line
// const ContractAbi = require(`../../../smart-contract/artifacts/contracts/${CollectionConfig.contractName}.sol/${CollectionConfig.contractName}.json`).abi
import { holderRoyaltiesClaimABI } from '../generated'

interface Network {
  name: string,
  chainId: number
}

interface State {
  contract: any,
  initDone: boolean,
  userAddress: `0x${string}`|null|undefined;
  network: Network|null;
  networkConfig: NetworkConfigInterface;
  feePrice: bigint;
  walletBalance: bigint;
  isPaused: boolean;
  loading: boolean;
  isUserInWhitelist: boolean;
  errorMessage: string|JSX.Element|null;
}

const defaultState: State = {
  contract: null,
  initDone: false,
  userAddress: null,
  network: null,
  feePrice: BigInt(0),
  walletBalance: BigInt(0),
  networkConfig: CollectionConfig.mainnet,
  isPaused: true,
  loading: false,
  isUserInWhitelist: false,
  errorMessage: null
}

// const chains = [polygon]
const projectId = '665d687852032cfc7d1c167792f3c74b'

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [publicProvider()]
)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  // publicClient
  publicClient,
  webSocketPublicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const web3modal = new Web3Modal({ projectId }, ethereumClient)

const contractConf = {
  address: CollectionConfig.contractAddress as `0x${string}`,
  abi: holderRoyaltiesClaimABI
}

export const useWeb3 = defineStore('Web3', {
  state: () => defaultState,
  actions: {
    async init () {
      console.log('Web3 init start')
      this.registerWalletEvents()

      this.contract = getContract({
        ...contractConf,
        walletClient: ethereumClient
      })

      try {
        this.$patch({
          feePrice: await this.contract.read.fee([]),
          isPaused: await this.contract.read.paused([]),
          isUserInWhitelist: await this.contract.read.walletBalance([this.userAddress]) > BigInt(0) // Whitelist.contains(this.userAddress ?? '') DISABLED WHITELIST CHECK

        })
      } catch (e) {}

      this.initDone = true
    },
    async registerWalletEvents () {
      ethereumClient.watchAccount(async ({ isConnected, address }) => {
        // console.log('ACCOUNT EVENT', isConnected, address)
        if (isConnected) {
          this.userAddress = address
          this.walletBalance = await this.contract.read.walletBalance([this.userAddress]) /* CHECKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK */
        } else {
          this.userAddress = null
        }
      })
      ethereumClient.watchNetwork(({ chain }) => {
        // console.log('NET EV', chain)
        if (chain) {
          this.network = {
            name: chain.name,
            chainId: chain.id
          }
        } else {
          this.network = null
        }
      })

      /*
      const config = {
        contracts: [{
          ...contractConf,
          functionName: 'mint',
          args: []
        }, {
          ...contractConf,
          functionName: 'whitelistMint',
          args: []
        }, {
          ...contractConf,
          functionName: 'setWhitelistMintEnabled',
          args: []
        }]
      }

      await multicall(config)
      const unwatch = watchMulticall(config, (data_) => {
        console.log('SOMEONE MINTED!', data_)
      })
      */
    },
    setError (error: any = null) {
      let errorMessage = 'Unknown error...'

      /*
      console.log('HANDLE ERROR', typeof error, JSON.stringify(error, (key, value) =>
        typeof value === 'bigint'
          ? value.toString()
          : value // return everything else unchanged
      ))
      */

      if (error === null || typeof error === 'string') {
        errorMessage = error
      } else if (typeof error === 'object') {
        // Support any type of error from the Web3 Provider...
        if (error?.details) {
          errorMessage = error.details
        } else if (error?.error?.message !== undefined) {
          errorMessage = error.error.message
        } else if (error?.data?.message !== undefined) {
          errorMessage = error.data.message
        } else if (error?.message !== undefined) {
          errorMessage = error.message
        }
      }

      this.errorMessage = errorMessage === null ? null : errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
    },
    async connectWallet () {
      await web3modal.openModal()
    },
    /* copyMerkleProofToClipboard (merkleProofManualAddress: string): void {
      const merkleProof = Whitelist.getRawProofForAddress(merkleProofManualAddress)

      if (merkleProof.length < 1) {
        this.merkleProofManualAddressStatus = false
        return
      }

      navigator.clipboard.writeText(merkleProof)
      this.merkleProofManualAddressStatus = true
    }, */
    async handleTransaction (request: any) {
      const { hash } = await writeContract(request)

      toast.info(`
        <p>Transaction sent! Please wait...</p>
        <a href=${this.generateTransactionUrl(hash)} target="_blank" rel="noopener">View on ${this.networkConfig.blockExplorer.name}</a>
      `, {
        dangerouslyHTMLString: true,
        position: 'bottom-center'
      })

      await waitForTransaction({ hash })

      toast.info(`
        <p>Success!</p>
        <a href=${this.generateTransactionUrl(hash)} target="_blank" rel="noopener">View on ${this.networkConfig.blockExplorer.name}</a>
      `, {
        dangerouslyHTMLString: true,
        position: 'bottom-center'
      })
    },
    /* async mintTokens (amount: number): Promise<void> {
      try {
        this.loading = true
        const value = this.tokenPrice * BigInt(amount)
        const { request } = await prepareWriteContract({
          ...contractConf,
          functionName: 'mint',
          args: [BigInt(amount)],
          value
        })

        await this.handleTransaction(request)

        this.loading = false
      } catch (e) {
        this.setError(e)
        this.loading = false
      }
    }, */
    async claim (): Promise<void> {
      try {
        this.loading = true
        const value = this.feePrice
        const { request } = await prepareWriteContract({
          ...contractConf,
          functionName: 'claim',
          args: undefined,
          value
        })

        await this.handleTransaction(request)

        this.loading = false
      } catch (e) {
        this.setError(e)
        this.loading = false
      }
    }/* ,
    async whitelistMint2Tokens (amount: number): Promise<void> {
      try {
        this.loading = true
        const value = this.tokenPrice * BigInt(amount)
        const { request } = await prepareWriteContract({
          ...contractConf,
          functionName: 'whitelistMint2',
          args: [Whitelist.getProofForAddress(this.userAddress!) as `0x${string}`[]],
          value
        })

        await this.handleTransaction(request)

        this.loading = false
      } catch (e) {
        this.setError(e)
        this.loading = false
      }
    } */
  },
  getters: {
    getUserAddress (): `0x${string}`|null|undefined {
      return this.userAddress
    },
    isWalletConnected (): boolean {
      return !!this.userAddress
    },
    isContractReady (): boolean {
      return this.contract !== undefined && this.initDone
    },
    /* isSoldOut (): boolean {
      return this.maxSupply !== 0 && this.totalSupply >= this.maxSupply
    }, */
    isNotMainnet (): boolean {
      return this.network !== null && this.network.chainId !== CollectionConfig.mainnet.chainId
    },
    generateContractUrl (): string {
      return this.networkConfig.blockExplorer.generateContractUrl(CollectionConfig.contractAddress!)
    },
    /* generateMarketplaceUrl (): string {
      return CollectionConfig.marketplaceConfig.generateCollectionUrl(CollectionConfig.marketplaceIdentifier, !this.isNotMainnet)
    }, */
    generateTransactionUrl (state): (arg0: any) => string {
      return (transactionHash: any) => state.networkConfig.blockExplorer.generateTransactionUrl(transactionHash)
    }/* ,
    marketPlaceName (): string {
      return CollectionConfig.marketplaceConfig.name
    } */
  }
})
