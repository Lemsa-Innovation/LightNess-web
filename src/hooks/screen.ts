import { useMediaQuery } from "react-responsive";

export const screens = {
  sm: 640,
  // => @media (min-width: 640px) { ... }

  md: 768,
  // => @media (min-width: 768px) { ... }

  lg: 1024,
  // => @media (min-width: 1024px) { ... }

  xl: 1280,
  // => @media (min-width: 1280px) { ... }

  "2xl": 1536,
  // => @media (min-width: 1536px) { ... }
};

export function useDeviceQuery() {
  const isMobile = useMediaQuery({
    query: `(max-width: ${screens.sm}px)`,
  });
  return {
    isMobile,
  };
}
