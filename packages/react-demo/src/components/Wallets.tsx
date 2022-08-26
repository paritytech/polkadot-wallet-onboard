import { memo, useContext } from 'react';
import { DotsamaWalletsContext } from '@dotsama-wallets/react';

import SupportedWallets from './SupportedWallets';

const Wallets = () => {
  const { setupWallets, extensions } = useContext(DotsamaWalletsContext);

  return <>
    <button onClick={setupWallets}>get extensions</button>
    <SupportedWallets extensions={extensions} />
    {/* <OtherWallets extensions={otherExtensions} /> */}
  </>;
};

export default memo(Wallets);
