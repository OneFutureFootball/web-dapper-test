import { config } from "@onflow/fcl";

export const configFCL = () => config({
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "discovery.authn.include": [
    "0x82ec283f88a62e65", // Dapper Wallet
  ],
  "app.detail.title": "1FF TEST",
  "app.detail.icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAh1BMVEX///8DBwgFBgj+//8CCAgEBgUjJSRjZWQECAuXmZiOkI/U1df6+/0EBQcfICK6vLtISUtkZGZrbG4cHR8/QELq6uqgpKUlJyYcHh1LTUz19fUOEA+YmZsODxHk5efa3t94enk1Nzaxs7LMzs0WGhlzd3YuMjOoqKru7/HAwcPM0NGLjI5cXFzBNIc0AAAEHUlEQVR4nO2bi2KaMBSGuQjTNbG6aUGQVtdtbWff//mWEEFuQk4QbO3/Wa21niQfCXASxbIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAl4VduwEX4bzFFf3MqmbNYcyK+rTFlMhymWsQxwqP9TKvhknVLL01vH4lD9bcnO64q275RpjZTuK6YlA2wU6/mt8wCJF6MPJwd0HgVwn84Im5bB8c/xqLwA9FZb+MPNzQ85wG7kRX/HQcLm7jwdOfByOR5/jTi6hhufMmnl2hKlL9/8CYiewn3uQWRB7jGxF5ECPrJobWRnTILfRI9Nu7DZF7oVHfRyRKhHP5fEpkUkE7kE85n05NRP5MmnrkJKJ6Y0QR+WAgwnzRIfWdPRcZf1hJDETuPC8+HbWmDSJ8ZAlZ35Yswr7HYmDlZ/ZSo7OdXT73iFQzD2L4jN4jexlXT1EykflxHxlRRGR+MT1pXMcyMK04sTmviZj2CK9Ai46pPWJZz5vNZiHvgr9JXWS3XC6/GbCsQAx/JotkiWN6Rjken+Th8ijims4OWWXGqh+ofn0YEVlycZ2JGG6+pnYSUSewk4gZTC2GsGL5FC4twh62ktl2RmQru4O9bA9Hvku0ItN3PRmLSJUmkSzXopI8ym5Z5UctUnrAk5eLi2TnESrOq+zjVX4e0XZQJ+X7HiKW1SgiN6com5o0JmsmeyQXoUVz+nJQt4hR9ms7a3m4W3C6SJrH9+kROTMpd3PT0MrScrtjVSdZZ0OrXGZnfLocxN8uJKKq7yPifBqRdrpF2vkwInZPEZNciyZSPBiYiGjG/7sVkbsRRPQ4L6JFzxTlS4gktJbESqS6BqORt6VJytA9om2jDr+M3iNSQ9wfhxNR2VyecnROu1/lh4GLogifihI049eD9ogQSXQXE2KZxqe5VnF7y/UNnfh4WBHx+qo0UWrhEDWIBIdDd/xM3s1niJoiy2wi2j1VTbPf8j6yKfz3PMzs42mKCHd+6M6n1ZLFaWdPD1crtZLR2ZIeFnoitr6I2ubFw69QWegsLMjvYRh9rYYmQitxkUfKpMRZ9GgepVqInC0RIn2ASEuJEOkDRFpKhEgfINJSIkT6AJGWEq8m4tjpTWKr72vN1fPsdbJIFptunTFE5Ezmbe6Hc1/cJH7oP0UW2wdz9VoYhH4Y7EiFsncVK24i2g/fB2l6U8Wlj5PVxNllLP2sWUzdIsK36F3LLX1hIDp3LcHFiTquGGm7PuNcQFR6v3ulywlYlLfbVe2iblG38tzwKgRypVF1+aJh+2k3JB2Lpbf3WlAgUrr2pTykGXmVhuUPR9zeCz26NVeqqddK2qgV9ZrXkLTVY3q5UOH5iGMLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfFL+A8+TdDKBWILNAAAAAElFTkSuQmCC", //image url
  "0xNonFungibleToken": "0x631e88ae7f1d7c20",
  "0xExampleNFT": "0xee10359c2898dc81",
  "0xMetadataViews": "0x631e88ae7f1d7c20",
});


export const buyTx = `
import FutureFootball from 0xa1d82983873b0a61
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import DapperUtilityCoin from 0x82ec283f88a62e65
import FungibleToken from 0x9a0766d93b6608b7
import NFTStorefrontV2 from 0x2d55b98eb200daef
// This transaction was auto-generated with the NFT Catalog (https://github.com/dapperlabs/nft-catalog)
//
// This transaction purchases an NFT from a dapp directly (i.e. **not** on a peer-to-peer marketplace).
// 
// Collection Identifier: FutureFootball
// Vault Identifier: duc
//
// Version: 0.1.1

transaction(merchantAccountAddress: Address, storefrontAddress: Address, listingResourceID: UInt64, expectedPrice: UFix64, commissionRecipient: Address?) {
    /* This transaction purchases an NFT from a dapp directly (i.e. **not** on a peer-to-peer marketplace). */
    
    /// merchantAccountAddress - The merchant account address provided by Dapper Labs
    /// storefrontAddress - The address that owns the storefront listing
    /// listingResourceID - ID of the Storefront listing resource
    /// expectedPrice: UFix64 - How much you expect to pay for the NFT
    /// commissionRecipient - Optional recipient for transaction commission if comission exists.


    let paymentVault: @FungibleToken.Vault
    let nftCollection: &FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}
    let storefront: &NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}
    let listing: &NFTStorefrontV2.Listing{NFTStorefrontV2.ListingPublic}
    let salePrice: UFix64
    let balanceBeforeTransfer: UFix64
    let mainUtilityCoinVault: &DapperUtilityCoin.Vault
    var commissionRecipientCap: Capability<&{FungibleToken.Receiver}>?

    prepare(dapper: AuthAccount, buyer: AuthAccount) {
        self.commissionRecipientCap = nil
        
        // Initialize the buyer's collection if they do not already have one
        if buyer.borrow<&FutureFootball.Collection>(from: /storage/FutureFootballCollection) == nil {
            let collection <- FutureFootball.createEmptyCollection() as! @FutureFootball.Collection
            buyer.save(<-collection, to: /storage/FutureFootballCollection)
        }

        if (buyer.getCapability<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/FutureFootballCollection).borrow() == nil) {
            buyer.unlink(/public/FutureFootballCollection)
            buyer.link<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/FutureFootballCollection, target: /storage/FutureFootballCollection)
        }

        if (buyer.getCapability<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(/private/FutureFootballCollection).borrow() == nil) {
            buyer.unlink(/private/FutureFootballCollection)
            buyer.link<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(/private/FutureFootballCollection, target: /storage/FutureFootballCollection)
        }

        self.storefront = getAccount(storefrontAddress)
            .getCapability<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(
                NFTStorefrontV2.StorefrontPublicPath
            )!
            .borrow()
            ?? panic("Could not borrow Storefront from provided address")

        // Get the listing by ID from the storefront
        self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
            ?? panic("No Offer with that ID in Storefront")
        self.salePrice = self.listing.getDetails().salePrice

        // Get a vault from Dapper's account
        self.mainUtilityCoinVault = dapper.borrow<&DapperUtilityCoin.Vault>(from: /storage/dapperUtilityCoinVault)
            ?? panic("Cannot borrow UtilityCoin vault from account storage")
        self.balanceBeforeTransfer = self.mainUtilityCoinVault.balance
        self.paymentVault <- self.mainUtilityCoinVault.withdraw(amount: self.salePrice)

        // Get the collection from the buyer so the NFT can be deposited into it
        self.nftCollection = buyer.borrow<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(
            from: /storage/FutureFootballCollection
        ) ?? panic("Cannot borrow NFT collection receiver from account")

         // Fetch the commission amt.
        let commissionAmount = self.listing.getDetails().commissionAmount

        if commissionRecipient != nil && commissionAmount != 0.0 {
            // Access the capability to receive the commission.
            let _commissionRecipientCap = getAccount(commissionRecipient!).getCapability<&{FungibleToken.Receiver}>(/public/dapperUtilityCoinReceiver)
            assert(_commissionRecipientCap.check(), message: "Commission Recipient doesn't have flowtoken receiving capability")
            self.commissionRecipientCap = _commissionRecipientCap
        } else if commissionAmount == 0.0 {
            self.commissionRecipientCap = nil
        } else {
            panic("Commission recipient can not be empty when commission amount is non zero")
        }
    }

    // Check that the price is right
    pre {
        self.salePrice == expectedPrice: "unexpected price"
        merchantAccountAddress == 
    }

    execute {
        let item <- self.listing.purchase(
            payment: <-self.paymentVault,
            commissionRecipient: self.commissionRecipientCap
        )

        self.nftCollection.deposit(token: <-item)
    }

    // Check that all utilityCoin was routed back to Dapper
    post {
        self.mainUtilityCoinVault.balance == self.balanceBeforeTransfer: "UtilityCoin leakage"
    }
}

`