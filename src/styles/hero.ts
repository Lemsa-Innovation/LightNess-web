// hero.ts
import { themeColor } from "../config/theme";
import { heroui } from "@heroui/react";
export default heroui({
  defaultTheme: "light",
  prefix: "hero",
  themes: {
    light: {
      colors: themeColor,
    },
    dark: {
      colors: themeColor,
    },
  },
});
