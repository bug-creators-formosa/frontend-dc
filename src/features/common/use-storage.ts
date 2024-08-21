import SecureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";

type UseStoreResult =
  | {
      loading: true;
      value: string | null;
      setItem: (value: string | null) => void;
    }
  | {
      loading: false;
      value: string;
      setItem: (value: string | null) => void;
    };

export default function useSecureStorage(key: string) {
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState<string | null>(null);

  const getItem = () => {
    const result = SecureLocalStorage.getItem(key);
    
    if (result === null) {
      setValue(null);
      setLoading(false);
      return;
    }
    setValue(result as string);
    setLoading(false);
  };

  useEffect(() => {
    getItem();
  }, [key]);

  const setItem = (value: string | null) => {
    if (value === null) {
      SecureLocalStorage.removeItem(key);
      setValue(null);

      return;
    }
    SecureLocalStorage.setItem(key, value);
    setValue(value);
    setLoading(false);
  };

  return {
    loading,
    value,
    setItem,
  } as UseStoreResult;
}
