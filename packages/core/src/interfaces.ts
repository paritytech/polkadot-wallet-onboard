import { Injected } from '@polkadot/extension-inject/types';

export interface Browsers {
  chrome: string;
  firefox: string;
}

export interface RawExtension {
  browsers: Browsers;
  desc: string;
  name: string;
}

export type ExtensionEnabler = (origin: string) => Promise<Injected>;

export interface DotsamaWallet<T> extends DotsamaWalletBasic<T>, RawExtension {}

export interface DotsamaWalletBasic<T> {
  enable: T;
  isEnabled: () => Promise<boolean>;
  version: string;
  name: string;
}
