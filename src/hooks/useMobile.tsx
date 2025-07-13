import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobMinWidth = 768;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= mobMinWidth);
    };
    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

export default useMobile;
