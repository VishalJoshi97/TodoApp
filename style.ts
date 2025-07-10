import { StyleSheet } from "react-native"
import { ColorScheme } from "./hooks/useTheme";


export const createStyles = (colors:ColorScheme) => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      backgroundColor:colors.bg
    
    },
    content: {
      fontSize: 25,
      fontStyle: "italic"
    },
  });
  return styles;
}