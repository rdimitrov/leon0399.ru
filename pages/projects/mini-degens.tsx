// Utils
import dynamic from 'next/dynamic'

import { InjectedConnector } from 'wagmi/connectors/injected'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// Hooks
import { createClient, configureChains, defaultChains, useAccount } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

// Components
import Head from 'next/head'
import { WagmiConfig } from 'wagmi'
// import Connect from '../../components/organisms/web3/Connect'
import ProjectHeader from '../../components/molecules/projects/ProjectHeader'
import MintCollection from '../../components/organisms/web3/f0/MintCollection'

// Types
import type { GetStaticProps, NextPage } from 'next'
import type { FC } from 'react'
import { Post } from '../../types/hashnode'

// Content
import { getPost } from '../../utils/hashnode'
import PostItem from '../../components/molecules/blog/PostItem'

const DynamicConnect = dynamic(
  () => import('../../components/organisms/web3/Connect'),
)

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
])

const web3Client = createClient({
  provider,
  webSocketProvider,
  connectors: [
    // new MetaMaskConnector(),
    new InjectedConnector(),
    new CoinbaseWalletConnector({
      options: {
        appName: 'Mini DeGens',
      },
    }),
    new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
  ],
})

interface Props {
  contractAddress: string
  article: Post
}

const MiniDegens: FC<Props> = ({ contractAddress, article }) => {
  const { address } = useAccount()

  return (
    <article className="mx-auto max-w-2xl prose dark:prose-invert">
      <ProjectHeader
        title="Mini DeGens"
        category="Web3"
        logo="/images/projects/minidegens/logo.gif"
        tags={['TypeScript', 'React.js']}
        url="https://twitter.com/mini_degens"
      />

      <p>
        Mini DeGens is a collection of 10,000 Generative AI art NFTs. Each DeGen
        is 1/1 unique generated by Craiyon (ex DALL-E Mini) neural network
      </p>

      <DynamicConnect className="my-4 not-prose" />

      {address && (
        <MintCollection
          contractAddress={contractAddress}
          className="not-prose"
        />
      )}

      <h3>Links</h3>

      <ul>
        <li>
          <a
            href="https://opensea.io/collection/mini-degens"
            target={'_blank'}
            rel="noopener noreferrer"
          >
            OpenSea
          </a>
        </li>
        <li>
          <a
            href="https://etherscan.io/address/0x24f6328cddddad9475c9a3dc2675b5ef851a7c5e"
            target={'_blank'}
            rel="noopener noreferrer"
          >
            Etherscan
          </a>
        </li>
      </ul>

      <h3>Read full article</h3>

      <PostItem className="my-3 not-prose" post={article} />

      <a
        className="inline-block my-4 not-prose"
        href="https://opensea.io/collection/mini-degens"
        title="Buy on OpenSea"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="w-[220px] rounded-lg border shadow-lg"
          src="https://storage.googleapis.com/opensea-static/Logomark/Badge%20-%20Available%20On%20-%20Light.png"
          alt="Available on OpenSea"
        />
      </a>
    </article>
  )
}

const MiniDegensPage: NextPage<Props> = (props) => (
  <div className="container mx-auto">
    <Head>
      <title>Mini Degens NFT</title>
    </Head>
    <WagmiConfig client={web3Client}>
      <MiniDegens {...props} />
    </WagmiConfig>
  </div>
)

export default MiniDegensPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      contractAddress: '0x24F6328cdDDdad9475c9a3DC2675b5ef851A7C5E',
      article: await getPost(
        'leon0399',
        'launching-nft-collection-with-factoria',
      ),
    },
  }
}
