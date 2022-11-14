import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import { useState, useEffect } from 'react';
import merge from 'lodash.merge';

import {
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';


const myTheme = merge(darkTheme(), {
          colors: {
                    accentColor: 'linear-gradient(230.29deg, #FF9820 36.06%, #FFAE26 72.69%)',
                    connectButtonBackground: 'linear-gradient(230.29deg, #FF9820 36.06%, #FFAE26 72.69%)',
          },
          shadows:{
                    connectButton: '0px 10px 30px rgba(183, 50, 39, 0.2)',
          },
        } );

const { chains, provider } = configureChains(
          [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
          [publicProvider()]

        );
        
        const { connectors } = getDefaultWallets({
          appName: 'My RainbowKit App',
          chains
        });
        
        const wagmiClient = createClient({
          autoConnect: true,
          connectors,
          provider
        })



function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
          setShowChild(true);
        }, []);
      
        if (!showChild) {
          return null;
        }
      
        if (typeof window === 'undefined') {
          return <></>;
        } else {


  return (
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={myTheme}>
            <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiConfig>
        );
  
  
          }
}

export default MyApp
