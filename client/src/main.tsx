import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider.tsx";

import { ThemeProvider } from "./components/theme-provider.tsx";
import { PremiumProvider } from "./context/PremiumProvider.tsx";
import { CoinProvider } from "./context/CoinProvider.tsx";
import { FriendsProvider } from "./context/FriendsProvider.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PremiumProvider>
          <CoinProvider>
            <FriendsProvider>
              <BrowserRouter>
                <SocketProvider>
                  <App />
                </SocketProvider>
              </BrowserRouter>
            </FriendsProvider>
          </CoinProvider>
        </PremiumProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);