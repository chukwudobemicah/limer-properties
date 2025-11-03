import { useWindowSize } from "@uidotdev/usehooks";

export default function useScreenSize() {
  const screenWidth = useWindowSize()?.width ?? 0;
  const isDesktop = screenWidth >= 1024;
  const isTablet = screenWidth < 1024;
  const isMobile = screenWidth < 768;

  return {
    isTablet,
    isMobile,
    isDesktop,
    screenWidth,
  };
}
