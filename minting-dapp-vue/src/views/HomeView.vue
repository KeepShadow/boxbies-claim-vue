<template>
  <div id="minting-dapp" :class="{ dark: isActive }">
    <div class="links">
      <ul>
        <li>
          <a href="https://discord.gg/boxbies" target="_blank">Discord</a>
        </li>
        <li>
          <a href="https://twitter.com/boxbies" target="_blank">twitter</a>
        </li>
        <li>
          <a href="https://opensea.io/collection/boxbiesnft" target="_blank">Opensea</a>
        </li>
      </ul>
    </div>
    <div class="darkTheme">
      <button @click="isActive = !isActive"></button>
    </div>
    <div class="mainCont">
      <img class="logo" src="../assets/boxbiesLogo.jpg" alt="Boxbies Logo">
      <div class="container">
        <div class="countDown" >
          <h2 class="cdTitle">Claim is updated every Monday</h2>
        </div>
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
        </div>
      </div>
      <div class="poweredBy">
        powered by:
        <a href="https://boxbies.io" target="_blank"><img src="../assets/boxbiesLogo_negative.jpg" alt="Boxbies logo"></a>
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

const isActive = ref(false)
const Web3 = useWeb3()
const merkleProofManualAddress = ref('')
watch(() => Web3.userAddress, (userAddress) => {
  if (!merkleProofManualAddress.value && userAddress) {
    merkleProofManualAddress.value = userAddress?.toString()
  }
})
</script>
