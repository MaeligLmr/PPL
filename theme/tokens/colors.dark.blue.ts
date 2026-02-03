// dark-blue.ts
import { colors } from '../colors'; // ton fichier colors.ts avec toutes les couleurs de base

export const darkBlue = {
  button: {
    primaryBackground: colors.blue[200],
    primaryBackgroundHover: colors.blue[300],
    primaryText: colors.blue[800],
    outlinedText: colors.blue[400],
    outlinedHoverBackground: colors.slateBlue[600],
  },
  tile: {
    background: colors.slateBlue[700],
    textColor: colors.blue[200],
    border: colors.blue[500],
  },
  body: {
    background: colors.slateBlue[700],
  },
  tag: {
    textColor: colors.blue[600],
  },
  title: {
    textColor: colors.blue[500],
  },
  input: {
    text: colors.blue[400],
    border: colors.blue[400],
    selectSelected: colors.slateBlue[300],
    textFilled: colors.blue[500],
  },
  text: {
    textColor: colors.blue[500],
  },
  shadow: {
    primary: 'rgba(171, 210, 250, 0.2)', // ici pas encore dans colors.ts ? sinon tu peux créer shadow.primary
    button: 'rgba(138, 180, 223, 0.3)',
  },
  toggle: {
    background: colors.slateBlue[600],
    itemBackgroundSelected: colors.slateBlue[100],
    itemTextSelected: colors.slateBlue[500],
    itemText: colors.slateBlue[100],
  },
  border: {
    blue: colors.slateBlue[300],
  },
};