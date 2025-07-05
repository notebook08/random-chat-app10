import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CoinContextType {
  coins: number;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => boolean;
  watchAd: () => void;
  referFriend: () => void;
}

const CoinContext = createContext<CoinContextType | null>(null);

export const useCoin = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("useCoin must be used within a CoinProvider");
  }
  return context;
};

interface CoinProviderProps {
  children: ReactNode;
}

export const CoinProvider = ({ children }: CoinProviderProps) => {
  const [coins, setCoins] = useState(0);

  // Initialize coins on mount
  useEffect(() => {
    const savedCoins = localStorage.getItem("ajnabicam_coins");
    const hasOnboarded = localStorage.getItem("ajnabicam_onboarded");
    
    if (savedCoins) {
      setCoins(parseInt(savedCoins));
    } else if (!hasOnboarded) {
      // Give 30 free coins for new users
      setCoins(30);
      localStorage.setItem("ajnabicam_coins", "30");
      localStorage.setItem("ajnabicam_onboarded", "true");
    }
  }, []);

  const addCoins = (amount: number) => {
    const newAmount = coins + amount;
    setCoins(newAmount);
    localStorage.setItem("ajnabicam_coins", newAmount.toString());
  };

  const deductCoins = (amount: number): boolean => {
    if (coins >= amount) {
      const newAmount = coins - amount;
      setCoins(newAmount);
      localStorage.setItem("ajnabicam_coins", newAmount.toString());
      return true;
    }
    return false;
  };

  const watchAd = () => {
    // Simulate watching an ad
    addCoins(4);
    alert("🎉 You earned 4 coins for watching an ad!");
  };

  const referFriend = () => {
    // Simulate successful referral
    addCoins(25);
    alert("🎉 You earned 25 coins for referring a friend!");
  };

  return (
    <CoinContext.Provider
      value={{
        coins,
        addCoins,
        deductCoins,
        watchAd,
        referFriend,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};