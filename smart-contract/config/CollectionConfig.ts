import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import * as Networks from "../lib/Networks";
import * as Marketplaces from "../lib/Marketplaces";
import whitelistAddresses from "./whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.polygonTestnet,
  mainnet: Networks.polygonMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: "Dalmatians",
  tokenName: "Dalmatians",
  tokenSymbol: "WOOF",
  hiddenMetadataUri: "ipfs://QmbLU3Hy8YtMyEgQLhZ2t4odQqf5f2TCf2dUUApAFuUKnM/0.json",
  maxSupply: 5000,
  whitelistSale: {
    price: 0.49,
    maxMintAmountPerTx: 1500,
  },
  preSale: {
    price: 0.49,
    maxMintAmountPerTx: 1500,
  },
  publicSale: {
    price: 0.49,
    maxMintAmountPerTx: 1500,
  },
  contractAddress: "0x7CE5Bebcb5368304054880B85f5D97330E6115Ef",
  marketplaceIdentifier: "dalmatians-official",
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
  whitelist2Limit: 0,
  royaltyReceiver: "0x4af9CA5Fd841D2B04c59cf38290891ceEE9b8981",
  royaltyNumerator: "1000",
  boxbiesContract: "0x0ae568DfC0745387C504B240D8AdE5e74b9fD2bB"
};

export default CollectionConfig;
