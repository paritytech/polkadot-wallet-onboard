import { DotsamaWalletsContextProvider } from '@dotsama-wallets/react';

import Wallets from './Wallets';

const App = () => (
  <DotsamaWalletsContextProvider>
    <Wallets />
  </DotsamaWalletsContextProvider>
);

export default App;
