import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as fcl from "@onflow/fcl";
import { useState, useEffect } from 'react';

import { configFCL } from '../flow/config';
import { executeList, executeInitialiseAccount, executeDirectBuy } from '../flow/txFunctions';

configFCL();


const Home: NextPage = () => {
	const [user, setUser] = useState<fcl.User>({ loggedIn: null });
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
          {user.addr}
        </div>
        <div className={styles.grid}>
        <button className={styles.card} onClick={executeInitialiseAccount}>
            Account initialisation transaction
          </button>
          <button className={styles.card} onClick={executeList}>
            Listing transaction
          </button>
          <button className={styles.card} onClick={executeDirectBuy}>
            Direct purchase transaction 
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
