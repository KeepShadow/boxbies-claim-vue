<template>
  <div id="minting-dapp">
    <div class="links">
      <ul>
        <li>
          <a href="https://discord.gg/boxbies" target="_blank">Discord</a>
        </li>
        <li>
          <a href="https://twitter.com/dalmatiansnft" target="_blank">twitter</a>
        </li>
        <li>
          <a href="https://opensea.io/collection/dalmatiansofficial" target="_blank">Opensea</a>
        </li>
        <li>
          <a href="https://twitter.com/AtlanCoelho" target="_blank">artist</a>
        </li>
      </ul>
    </div>
    <div class="mainCont">
      <div class="container">
        <count-down-timer />
        <div v-if="Web3.isNotMainnet" class="alert alert-warning" role="alert">
          You are not connected to the main network. <span class="small">Current network: <strong>{{Web3.network?.name}}</strong></span>
        </div>

        <div v-if="Web3.errorMessage" class="alert alert-warning alert-dismissible fade show" role="alert">
          {{ Web3.errorMessage }}
          <button @click="Web3.setError()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <template v-if="Web3.isWalletConnected && Web3.isContractReady">
          <collection-status />
          <mint-widget v-if="true"/>  <!-- !Web3.isSoldOut -->
          <div v-else>
            <h2>Claim have been <strong>ended for now</strong>! <span class="emoji">🥳</span></h2>
          </div>
        </template>

        <div v-if="!Web3.isContractReady" class="collection-not-ready">
          Loading collection data...
        </div>

        <div v-else-if="!Web3.isWalletConnected" class="no-wallet">
          <button class="primary" @click="Web3.connectWallet">Connect Wallet</button>

          <!-- <div class="use-block-explorer">
            Hey, looking for a <strong>super-safe experience</strong>? <span class="emoji">😃</span><br />
            You can interact with the smart-contract <strong>directly</strong> through <a :href="Web3.generateContractUrl" target="_blank">{{Web3.networkConfig.blockExplorer.name}}</a>, without even connecting your wallet to this DAPP! <span class="emoji">🚀</span><br />
            <br />
            Keep safe! <span class="emoji">❤️</span>
          </div> -->

          <!-- <div v-if="!Web3.isWalletConnected || Web3.isWhitelistMintEnabled" class="merkle-proof-manual-address">
            <h2>Whitelist Proof</h2>
            <p>
              Anyone can generate the proof using any public address in the list, but <strong>only the owner of that address</strong> will be able to make a successful transaction by using it.
            </p>

            <div v-if="Web3.merkleProofManualAddressStatus === true" class="feedback-message">
              <strong>Congratulations!</strong> <span class="emoji">🎉</span><br />
              Your Merkle Proof <strong>has been copied to the clipboard</strong>. You can paste it into <a :href="Web3.generateContractUrl" target="_blank">{{Web3.networkConfig.blockExplorer.name}}</a> to claim your tokens.
            </div>
            <div v-else-if="Web3.merkleProofManualAddressStatus === false" class="feedback-message">
              The given address is not in the whitelist, please double-check.
            </div>

            <label htmlFor="merkle-proof-manual-address">Public address:</label>
            <input id="merkle-proof-manual-address" type="text" placeholder="0x000..." v-model="merkleProofManualAddress" />
            <button @click="merkleProofManualAddress && Web3.copyMerkleProofToClipboard(merkleProofManualAddress)">Generate and copy to clipboard</button>
          </div> -->
        </div>
      </div>
      <div>
        <div class="partners"></div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import CollectionStatus from '@/components/CollectionStatus.vue'
import MintWidget from '@/components/MintWidget.vue'
import CountDownTimer from '@/components/CountDownTimer.vue'
import { useWeb3 } from '@/store/Web3'

const Web3 = useWeb3()
const merkleProofManualAddress = ref('')
watch(() => Web3.userAddress, (userAddress) => {
  if (!merkleProofManualAddress.value && userAddress) {
    merkleProofManualAddress.value = userAddress?.toString()
  }
})
</script>
