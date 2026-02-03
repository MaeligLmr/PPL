import { lightBlue } from './tokens/colors.light.blue'
import { darkBlue } from './tokens/colors.dark.blue'
import { lightCherry } from './tokens/colors.light.cherry'
import { darkCherry } from './tokens/colors.dark.cherry'
import { spacing } from './spacing'
import { typography } from './typography'

export const themes = {
    light: {
        blue: {
            colors: lightBlue,
            spacing,
            radius: { sm: 10, md: 15, lg: 17, full: 1000 },
            typography,
        },
        cherry: {
            colors: lightCherry,
            spacing,
            radius: { sm: 10, md: 15, lg: 17, full: 1000 },
            typography,
        },
    },
    dark: {
        blue: {
            colors: darkBlue,
            spacing,
            radius: { sm: 10, md: 15, lg: 17, full: 1000 },
            typography,
        },
        cherry: {
            colors: darkCherry,
            spacing,
            radius: { sm: 10, md: 15, lg: 17, full: 1000 },
            typography,
        },
    },
} as const

export type ThemeColors = {
    button: {
        primaryBackground: string
        primaryBackgroundHover: string
        primaryText: string
        outlinedText: string
        outlinedHoverBackground: string
    }
    tile: {
        background: string
        textColor: string
        border: string
    }
    body: {
        background: string
    }
    tag: {
        textColor: string
    }
    title: {
        textColor: string
    }
    input: {
        text: string
        border: string
        selectSelected: string
        textFilled: string
    }
    text: {
        primary: string
    }
    toggle: {
        background: string
        itemBackgroundSelected: string
        itemTextSelected: string
        itemText: string
    }
    shadow: {
        primary: string
        button: string
    }
    border: {
        primary: string
    }
}

export type AppTheme = {
    colors: ThemeColors
    spacing: Record<number, number>
    radius: {
        sm: number
        md: number
        lg: number
        full: number
    }
    typography: {
        body: React.CSSProperties
        title: React.CSSProperties
        tag: React.CSSProperties
    }
}
