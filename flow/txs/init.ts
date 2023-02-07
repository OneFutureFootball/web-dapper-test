export const init = `
import FutureFootball from 0xa1d82983873b0a61
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
// This transaction was auto-generated with the NFT Catalog (https://github.com/dapperlabs/nft-catalog)
//
// This transaction initializes a user's collection to support a specific NFT
// 
// Collection Identifier: FutureFootball
//
// Version: 0.1.1

transaction {

  prepare(signer: AuthAccount) {
    if signer.borrow<&FutureFootball.Collection>(from: /storage/FutureFootballCollection) == nil {
      let collection <- FutureFootball.createEmptyCollection()
      signer.save(<-collection, to: /storage/FutureFootballCollection)
    }
    if (signer.getCapability<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/FutureFootballCollection).borrow() == nil) {
      signer.unlink(/public/FutureFootballCollection)
      signer.link<&FutureFootball.Collection{FutureFootball.FutureFootballCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/FutureFootballCollection, target: /storage/FutureFootballCollection)
    }
  }

}

`