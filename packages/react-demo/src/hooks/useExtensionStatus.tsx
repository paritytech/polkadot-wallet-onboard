import { useEffect, useState } from 'react';

export const useExtensionStatus = (checkIsExtensionEnabled: any, extension: any) => {
  // TODO change types
  const [isExtensionEnabled, setIsExtensionsEnabled] = useState<boolean>(false);

  useEffect(() => {
    checkExtensionStatus();
  }, []);

  const checkExtensionStatus = async () => {
    const extensionStatus = await checkIsExtensionEnabled(extension);
    setIsExtensionsEnabled(extensionStatus);
  };

  return { isExtensionEnabled, checkExtensionStatus };
};
