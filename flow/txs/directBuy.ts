export const directBuy = `
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
        merchantAccountAddress == 0xe59eaf4432b48714
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