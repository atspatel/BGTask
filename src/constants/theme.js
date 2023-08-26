import { StyleSheet } from "react-native";

export const appBorderRadius = 12;
export const appScreenPadding = 16;
export const appColor = {
  primary: "#1D827B",
  secondary: "#617880",
  select: "#72767D",
  bgColor: "#ffffff",
  statusBarColor: "#F5FFEB",
  gray: "#ccc",
  gray00: "#F5F5F5",
  gray20: "#72767D",
  gray30: "#9CA1A5",
  gray40: "#CED4DA",
  gray50: "#EAEFF2",
  iconGray: "#F5F5F5",
  alert: "#CF4444",
};

export const fontColorStyle = (theme = { color: "black" }) =>
  StyleSheet.create({
    h1: {
      fontSize: 24,
      fontFamily: "Poppins-SemiBold",
      color: theme.color,
    },
    h2: {
      fontSize: 18,
      fontFamily: "Poppins-SemiBold",
      color: theme.color,
    },
    h3: {
      fontSize: 16,
      fontFamily: "Poppins-SemiBold",
      color: theme.color,
    },
    h4: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.color,
    },
    b1: {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.color,
    },
    b2: {
      fontFamily: "Roboto-Regular",
      fontSize: 14,
      color: theme.color,
    },
    b3: {
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      color: theme.color,
    },
    b6: {
      fontSize: 12,
      color: theme.color,
    },
    link: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      color: theme.color,
      textDecorationLine: "underline",
    },
  });

export const fontStyle = fontColorStyle();

export const appThemeStyle = () =>
  StyleSheet.create({
    shadowContainerWhite: {
      shadowColor: "black",
      elevation: 3,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    border: {
      borderWidth: 1,
      borderRadius: appBorderRadius,
      borderColor: appColor.gray40,
    },
  });

export const appStyle = appThemeStyle();
