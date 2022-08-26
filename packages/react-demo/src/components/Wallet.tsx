import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { utils } from 'ethers';
import { DotsamaWallet, ExtensionEnabler } from '@dotsama-wallets/core';
import { DotsamaWalletsContext } from '@dotsama-wallets/react';
import { Injected, InjectedAccount } from '@polkadot/extension-inject/types';
import { ApiPromise, WsProvider } from '@polkadot/api';

import { useExtensionStatus } from '../hooks';

const Wallet = ({ extension }: { extension: DotsamaWallet<ExtensionEnabler> }) => {
  const { connectToExtension, checkIsExtensionEnabled } = useContext(DotsamaWalletsContext);
  const [accounts, setAccounts] = useState<InjectedAccount[]>([]);
  const [injector, setInjector] = useState<Injected>();
  const [api, setApi] = useState<ApiPromise | null>(null);
  const { isExtensionEnabled, checkExtensionStatus } = useExtensionStatus(checkIsExtensionEnabled, extension);

  useEffect(() => {
    const setupApi = async () => {
      const provider = new WsProvider('wss://westend-rpc.polkadot.io');
      const api = await ApiPromise.create({ provider });

      setApi(api);
    };

    setupApi();
    checkExtensionStatus();
  }, []);

  const getAccounts = async () => {
    // TODO prevent multi-click, add try catch
    const { injectedExtension, accounts } = await connectToExtension('wallet-sdk', extension);
    checkExtensionStatus();

    setAccounts(accounts);
    setInjector(injectedExtension);
  };

  const sendTransaction = useCallback(
    async (senderAddress: string) => {
      if (api && injector?.signer) {
        const decimals = api.registry.chainDecimals[0];
        const amountBN = utils.parseUnits('0.01', decimals);

        await api.tx.balances
          .transfer('5CK3fkziX4aEJTfbnwUek53obhpKi56CsNC19PfTNqrQ6EWz', amountBN.toString())
          .signAndSend(senderAddress, { signer: injector.signer }, () => {
            // do something with result
          });
      }
    },
    [api, injector],
  );

  const computeExtensionStatus = () => {
    if (isExtensionEnabled === null) {
      return 'loading status';
    }

    return isExtensionEnabled ? 'Connected' : 'Disconnected'
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={getAccounts}>{`${extension.name} ${extension.version}`}</button>
      <div>{`status: ${computeExtensionStatus()}`}</div>
      {accounts.length > 0 &&
        accounts.map(({ address, name = '' }) => (
          <div key={address} style={{ marginBottom: '10px' }}>
            <div>Account name: {name}</div>
            <div>Account address: {address}</div>
            <button onClick={() => sendTransaction(address)}>Send donation</button>
          </div>
        ))}
    </div>
  );
};

export default memo(Wallet);
