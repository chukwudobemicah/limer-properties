import { useEffect } from "react";
import useScreenSize from "./useScreenSize";

interface stopScrollProps {
  isOpen: boolean;
}

export default function useStopScroll(isOpen: boolean) {
  const { isMobile } = useScreenSize();

  useEffect(() => {
    // Define the function inside useEffect to ensure it's only used client-side
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const lockScroll = () => {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    };

    const enableScroll = () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };

    if (isOpen && isMobile) {
      lockScroll();
    } else {
      enableScroll();
    }

    // Clean up function
    return () => {
      enableScroll();
    };
  }, [isOpen, isMobile]); // Dependency array ensures this effect runs only when isOpen or isMobile changes
}
