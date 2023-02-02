import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as fcl from "@onflow/fcl";
import { configFCL, buyTx } from '../flow/config';
import { useState, useEffect } from 'react';

configFCL();
//merchantAccountAddress, storefrontAddress, listingResourceID, expectedPrice
// testnet addr, testnet addr, nft id, expected price



const sendTransaction = async () => {
  // This FCL code snippet showcases FCL code interaction with the Dapper Wallet
  const dapperAuthz = fcl.authz;

  const merchantAddress = "0xa1d82983873b0a61"
  const storefrontAddress = merchantAddress
  const listingResourceID = 0;
  const expectedPrice = Number(9.99).toFixed(8);


  const tx = await fcl.send([
    fcl.transaction(buyTx),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([dapperAuthz, fcl.authz]),
    fcl.args([
      fcl.arg(merchantAddress, fcl.t.Address),
      fcl.arg(storefrontAddress, fcl.t.Address),
      fcl.arg(listingResourceID, fcl.t.UInt64),
      fcl.arg(expectedPrice, fcl.t.UFix64),
    ]),
    fcl.limit(1000),
  ]).then(tx => {
    console.log(tx);
    console.log(fcl.decode(tx));
    return fcl.decode(tx);
  });
}

const Home: NextPage = () => {
	const [user, setUser] = useState({ loggedIn: null });
	useEffect(() => fcl.currentUser().subscribe(setUser), []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dapper test</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Dapper transaction test
        </h1>

        <div className={styles.grid}>
          <button className={styles.card} onClick={fcl.authenticate}>
            Connect wallet
          </button>
          <button className={styles.card} onClick={fcl.unauthenticate}>
            Disconnect wallet
          </button>
          <button className={styles.card} onClick={sendTransaction}>
            Test transaction
          </button>
          {user.addr}


        </div>
      </main>
    </div>
  )
}

export default Home
