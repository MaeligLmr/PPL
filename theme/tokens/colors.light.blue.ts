// light-blue.ts
import { colors } from '../colors';

export const lightBlue = {
  button: {
    primaryBackground: colors.cyan[500],
    primaryBackgroundHover: colors.cyan[600],
    primaryText: colors.cyan[100],
    outlinedText: colors.cyan[500],
    outlinedHoverBackground: colors.cyan[100],
  },
  tile: {
    background: colors.cyan[0],
    textColor: colors.cyan[400],
    border: colors.white,
  },
  body: {
    background: colors.cyan[0],
  },
  tag: {
    textColor: colors.cyan[300],
  },
  title: {
    textColor: colors.cyan[500],
  },
  input: {
    text: colors.cyan[400],
    border: colors.cyan[500],
    selectSelected: colors.cyan[100],
    textFilled: colors.cyan[600],
  },
  text: {
    textColor: colors.cyan[500],
  },
  shadow: {
    primary: 'rgba(255, 255, 255, 0.5)', // si tu veux, on peut créer shadow.primary dans colors.ts
    button: 'rgba(255, 255, 255, 0.5)',
  },
  toggle: {
    background: colors.cyan[100],
    itemBackgroundSelected: colors.white,
    itemTextSelected: colors.cyan[600],
    itemText: colors.cyan[700],
  },
  border: {
    blue: colors.cyan[300],
  },
};