import { useTheme } from "next-themes";
import { Button, Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export type Theme = "dark" | "light" | "system";
function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="rounded-xl w-10 h-10" />;

  const handleSwitch = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <Button
      isIconOnly
      onPress={handleSwitch}
      color={theme == "light" ? "primary" : "default"}
      startContent={
        theme == "light" ? (
          <Icon
            width={20}
            height={20}
            color="white"
            icon="line-md:moon-alt-to-sunny-outline-loop-transition"
          />
        ) : (
          <Icon
            width={20}
            height={20}
            color="white"
            className="text-primary"
            icon="line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition"
          />
        )
      }
    />
  );
}

export default ThemeSwitch;
