export const list = `
import FutureFootball from 0xa1d82983873b0a61
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import DapperUtilityCoin from 0x82ec283f88a62e65
import FungibleToken from 0x9a0766d93b6608b7
import NFTStorefrontV2 from 0x2d55b98eb200daef
import TokenForwarding from 0x51ea0e37c27a1f1a
// This transaction was auto-generated with the NFT Catalog (https://github.com/dapperlabs/nft-catalog)
//
// This transaction purchases an NFT from a dapp directly (i.e. **not** on a peer-to-peer marketplace).
// 
// Collection Identifier: FutureFootball
// Vault Identifier: duc
//
// Version: 0.1.1

transaction(saleItemID: UInt64, saleItemPrice: UFix64, commissionAmount: UFix64, marketplacesAddress: [Address], expiry: UInt64, customID: String?) {
    /// saleItemID - ID of the NFT that is put on sale by the seller.
    /// saleItemPrice - Amount of tokens (FT) buyer needs to pay for the purchase of listed NFT.
    /// commissionAmount - Commission amount that will be taken away by the purchase facilitator.
    /// marketplacesAddress - List of addresses that are allowed to get the commission.
    /// expiry - Unix timestamp at which created listing become expired.
    /// customID - Optional string to represent identifier of the dapp.
    let sellerPaymentReceiver: Capability<&{FungibleToken.Receiver}>
    let nftProvider: Capability<&FutureFootball.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &NFTStorefrontV2.Storefront
    var saleCuts: [NFTStorefrontV2.SaleCut]
    var marketplacesCapability: [Capability<&AnyResource{FungibleToken.Receiver}>]

    // It's important that the dapp account authorize this transaction so the dapp has the ability
    // to validate and approve the royalty included in the sale.
    prepare(seller: AuthAccount) {
        self.saleCuts = []
        self.marketplacesCapability = []

        // If the account doesn't already have a storefront, create one and add it to the account
        if seller.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath) == nil {
            // Create a new empty Storefront
            let storefront <- NFTStorefrontV2.createStorefront() as! @NFTStorefrontV2.Storefront
            // save it to the account
            seller.save(<-storefront, to: NFTStorefrontV2.StorefrontStoragePath)
            // create a public capability for the Storefront
            seller.link<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(NFTStorefrontV2.StorefrontPublicPath, target: NFTStorefrontV2.StorefrontStoragePath)
        }

         // FT Setup if the user's account is not initialized with FT receiver
        if seller.borrow<&{FungibleToken.Receiver}>(from: /storage/dapperUtilityCoinReceiver) == nil {

            let dapper = getAccount(0x82ec283f88a62e65)
            let dapperFTReceiver = dapper.getCapability<&{FungibleToken.Receiver}>(/public/dapperUtilityCoinReceiver)!

            // Create a new Forwarder resource for FUT and store it in the new account's storage
            let ftForwarder <- TokenForwarding.createNewForwarder(recipient: dapperFTReceiver)
            seller.save(<-ftForwarder, to: /storage/dapperUtilityCoinReceiver)

            // Publish a Receiver capability for the new account, which is linked to the FUT Forwarder
            seller.link<&DapperUtilityCoin.Vault{FungibleToken.Receiver}>(
                /public/dapperUtilityCoinReceiver,
                target: /storage/dapperUtilityCoinReceiver
            )
        }

        // Get a reference to the receiver that will receive the fungible tokens if the sale executes.
        // Note that the sales receiver aka MerchantAddress should be an account owned by Dapper or an end-user Dapper Wallet account address.
        self.sellerPaymentReceiver = getAccount(seller.address).getCapability<&{FungibleToken.Receiver}>(/public/dapperUtilityCoinReceiver)
        assert(self.sellerPaymentReceiver.borrow() != nil, message: "Missing or mis-typed DapperUtilityCoin receiver")

        // If the user does not have their collection linked to their account, link it.
        if seller.borrow<&FutureFootball.Collection>(from: /storage/FutureFootballCollection) == nil {
            let collection <- FutureFootball.createEmptyCollection()
            seller.save(<-collection, to: /storage/FutureFootballCollection)
        }
        if (seller.getCapability<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/FutureFootballCollection).borrow() == nil) {
            seller.unlink(/public/FutureFootballCollection)
            seller.link<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/FutureFootballCollection, target: /storage/FutureFootballCollection)
        }

        if (seller.getCapability<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(/private/FutureFootballCollection).borrow() == nil) {
            seller.unlink(/private/FutureFootballCollection)
            seller.link<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(/private/FutureFootballCollection, target: /storage/FutureFootballCollection)
        }

        self.nftProvider = seller.getCapability<&FutureFootball.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(/private/FutureFootballCollection)!
        assert(self.nftProvider.borrow() != nil, message: "Missing or mis-typed collection provider")

        if seller.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath) == nil {
            // Create a new empty Storefront
            let storefront <- NFTStorefrontV2.createStorefront() as! @NFTStorefrontV2.Storefront
            // save it to the account
            seller.save(<-storefront, to: NFTStorefrontV2.StorefrontStoragePath)
            // create a public capability for the Storefront
            seller.link<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(NFTStorefrontV2.StorefrontPublicPath, target: NFTStorefrontV2.StorefrontStoragePath)
        }
        self.storefront = seller.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath)
            ?? panic("Missing or mis-typed NFTStorefront Storefront")

        
        let collectionRef = seller
            .getCapability(/public/FutureFootballCollection)
            .borrow<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>()
            ?? panic("Could not borrow a reference to the collection")
        var totalRoyaltyCut = 0.0
        let effectiveSaleItemPrice = saleItemPrice - commissionAmount

        let nft = collectionRef.borrowViewResolver(id: saleItemID)!       
        if (nft.getViews().contains(Type<MetadataViews.Royalties>())) {
            let royaltiesRef = nft.resolveView(Type<MetadataViews.Royalties>()) ?? panic("Unable to retrieve the royalties")
            let royalties = (royaltiesRef as! MetadataViews.Royalties).getRoyalties()
            for royalty in royalties {
                // TODO - Verify the type of the vault and it should exists
                self.saleCuts.append(NFTStorefrontV2.SaleCut(receiver: royalty.receiver, amount: royalty.cut * effectiveSaleItemPrice))
                totalRoyaltyCut = totalRoyaltyCut + royalty.cut * effectiveSaleItemPrice
            }
        }

        // Append the cut for the seller.
        self.saleCuts.append(NFTStorefrontV2.SaleCut(
            receiver: self.sellerPaymentReceiver,
            amount: effectiveSaleItemPrice - totalRoyaltyCut
        ))

        for marketplace in marketplacesAddress {
            self.marketplacesCapability.append(getAccount(marketplace).getCapability<&{FungibleToken.Receiver}>(/public/dapperUtilityCoinReceiver))
        }
    }

    execute {

         self.storefront.createListing(
            nftProviderCapability: self.nftProvider,
            nftType: Type<@FutureFootball.NFT>(),
            nftID: saleItemID,
            salePaymentVaultType: Type<@DapperUtilityCoin.Vault>(),
            saleCuts: self.saleCuts,
            marketplacesCapability: self.marketplacesCapability.length == 0 ? nil : self.marketplacesCapability,
            customID: customID,
            commissionAmount: commissionAmount,
            expiry: expiry
        )
    }
}

`