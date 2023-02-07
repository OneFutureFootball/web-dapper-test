import * as fcl from "@onflow/fcl";

import { directBuy } from "./txs/directBuy";
import { list } from "./txs/list";
import { init } from "./txs/init";


/// @notice: transaction input values are hardcoded for now


export const executeDirectBuy = async () => {

    // fixed params 
    const merchantAddress = "0xe59eaf4432b48714" // 1FF DAPPER ACC
    const storefrontAddress = "0xa7f0da507f7da951" // ADDR WITH LISTED NFT 
    const listingResourceID = "128510646"; //ID OF NFT ON SALE 
    const expectedPrice = Number(9.99).toFixed(8); // price on the listing
  
    const result = await fcl.mutate({
      cadence: directBuy,
      args: (arg: any, type: any) => [
        arg(merchantAddress, type.Address),
        arg(storefrontAddress, type.Address),
        arg(listingResourceID, type.UInt64),
        arg(expectedPrice, type.UFix64),
        arg(merchantAddress, type.Address),
      ],
      limit: 1000
    })
  
    return result
}




/*
    saleItemID: UInt64,
    saleItemPrice: UFix64,
    commissionAmount: UFix64,
    marketplacesAddress: [Address],
    expiry: UInt64,
    customID: String?
*/
export const executeList = async () => {
    // fixed params 
    
    const saleItemID = 1;
    const salePrice = Number(9.99).toFixed(8);
    const commission = Number(0).toFixed(8);
    const marketplacesAddress = "0xe59eaf4432b48714"
    const expirey = Number(Date.now() + 10000)
    const customID = ""


    const result = await fcl.mutate({
        cadence: list,
        args: (arg: any, type: any) => [
        arg(saleItemID, type.UInt64),
        arg(salePrice, type.UFix64),
        arg(commission, type.UFix64),
        arg([marketplacesAddress], type.Array(type.Address)),
        arg(expirey, type.UInt64),
        arg(customID, type.String),
        ]
    })

    return result
}


export const executeInitialiseAccount = async () => {
  const result = await fcl.mutate({
    cadence: init,
    args: (arg: any, type: any) => []
  })
  return result
}