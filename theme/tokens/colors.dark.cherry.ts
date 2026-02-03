// dark-cherry.ts
import { colors } from '../colors';

export const darkCherry = {
  button: {
    primaryBackground: colors.coral[100],
    primaryBackgroundHover: colors.coral[300],
    primaryText: colors.cherry[600],
    outlinedText: colors.coral[400],
    outlinedHoverBackground: colors.cherry[700],
  },
  tile: {
    background: colors.cherry[800],
    textColor: colors.cherry[100],
    border: colors.cherry[100],
  },
  body: {
    background: colors.cherry[800],
  },
  tag: {
    textColor: colors.coral[400],
  },
  title: {
    textColor: colors.coral[200],
  },
  input: {
    text: colors.coral[200],
    border: colors.coral[200],
    selectSelected: colors.cherry[700],
    textFilled: colors.coral[500],
  },
  text: {
    textColor: colors.coral[200],
  },
  shadow: {
    primary: 'rgba(226, 153, 146, 0.2)', // si tu veux, on peut créer shadow.primary dans colors.ts
    button: 'rgba(238, 155, 146, 0.3)',
  },
  toggle: {
    background: colors.cherry[700],
    itemBackgroundSelected: colors.cherry[0],
    itemTextSelected: colors.cherry[500],
    itemText: colors.coral[100],
  },
  border: {
    blue: colors.cherry[300],
  },
};