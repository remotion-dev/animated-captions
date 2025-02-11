import React, { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender } from "remotion";
import { fontLoading } from "./config";

export const WaitForFonts: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    fontLoading
      .waitUntilDone()
      .then(() => {
        continueRender(handle);
        setFontsLoaded(true);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [fontsLoaded, handle]);

  if (!fontsLoaded) {
    return null;
  }

  return <>{children}</>;
};
