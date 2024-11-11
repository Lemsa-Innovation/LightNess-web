import { useTheme } from 'next-themes'
import { Button, Skeleton } from '@nextui-org/react'
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export type Theme = 'dark' | 'light' | 'system'
function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return (
        <Skeleton className="rounded-xl w-10 h-10" />
    )

    const handleSwitch = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
    return (
        <Button
            isIconOnly
            onClick={handleSwitch}
            color={theme == 'light' ? 'primary' : 'default'}
            startContent={theme == 'light' ? <Sun /> : <Moon />}
        />
    )
}

export default ThemeSwitch;