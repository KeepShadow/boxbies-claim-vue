<template>
  <div className="collection-status">
    <div className="user-address">
      <span className="label">Wallet address:</span>
      <span className="address">{{Web3.userAddress}}</span>
    </div>

    <div className="current-sale">
      <span className="label">Claim status</span>
      {{isSaleOpen ? (Web3.isPaused ? 'Whitelist only' : 'Open') : 'Closed'}}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { useWeb3 } from '@/store/Web3'

export default class HelloWorld extends Vue {
  Web3 = useWeb3()

  get isSaleOpen (): boolean {
    return (/* this.Web3.isWhitelistMintEnabled || */ !this.Web3.isPaused) /* && !this.Web3.isSoldOut */
  }
}
</script>
