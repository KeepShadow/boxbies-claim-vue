<template>
  <div>
    <div v-if="canMint" class="mint-widget">
      <!--       <div className="preview">
        <img src="../assets/logo.png" alt="Collection preview" />
      </div> -->

      <div className="price">
        <strong>Claim Available:</strong> {{ formattedPrice }} {{ Web3.networkConfig.symbol }}
      </div>

      <div className="controls">
        <!-- <button className="decrease" @click="changeAmount(-1)" :disabled="Web3.loading">-</button>
        <span className="mint-amount">{{mintAmount}}</span>
        <button className="increase" @click="changeAmount(1)" :disabled="Web3.loading">+</button> -->
        <button className="primary" @click="claim" :disabled="Web3.loading">Mint</button>
      </div>
    </div>
    <div v-else>
      <div className="cannot-mint">
        <template v-if="!Web3.isUserInWhitelist">You are not included in the <strong>Claim</strong>.</template> <!-- NOT WORKING PROPERLY -->
        <template v-else>The contract is <strong>paused</strong>.</template>
        <br /> Please come back later!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { utils } from 'ethers'
import { useWeb3 } from '@/store/Web3'

export default class HelloWorld extends Vue {
  Web3 = useWeb3()
  mintAmount = 0

  get canMint (): boolean {
    return !this.Web3.isPaused && this.Web3.isUserInWhitelist
  }

  private get canWhitelistMint (): boolean {
    return /* this.Web3.isWhitelistMintEnabled || (this.Web3.isWhitelistMint2Enabled && */ /* this.Web3.isUserInWhitelist */ true
  }

  get formattedPrice (): string {
    return utils.formatEther(this.Web3.walletBalance).toString()
  }

  /*   get maxMintAmount (): number {
      if (this.Web3.boxieOwned >= 50) {
        return 100
      } else if (this.Web3.boxieOwned >= 30) {
        return 60
      } else if (this.Web3.boxieOwned >= 10) {
        return 20
      } else if (this.Web3.boxieOwned >= 5) {
        return 10
      } else if (this.Web3.boxieOwned >= 1) {
        return 2
      }
      return 0
    } */

  /*   changeAmount (off: number) {
      if (this.mintAmount + off >= 0 && this.mintAmount + off <= this.maxMintAmount) {
        this.mintAmount += off
      }
    } */

  async claim (): Promise<void> {
    if (!this.Web3.isPaused) {
      await this.Web3.claim()
    }

    /* if (this.Web3.isWhitelistMint2Enabled) {
      await this.Web3.whitelistMint2Tokens(this.mintAmount)
      return
    }

    await this.Web3.whitelistMintTokens(this.mintAmount) */
  }
}
</script>
