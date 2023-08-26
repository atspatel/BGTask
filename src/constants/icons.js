import { AppTouchableHighlight } from "components";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from "constants/theme";

ICON_SIZE = 20;
ICON_COLOR = "black";
export const BackIcon = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <Ionicons name={"arrow-back-outline"} size={size} color={color} />
    </AppTouchableHighlight>
  );
};

export const CloseIcon = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <Ionicons name={"close"} size={size} color={color} />
    </AppTouchableHighlight>
  );
};

export const AppIcon = (props) => {
  const { name, size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </AppTouchableHighlight>
  );
};

export const AppAntIcon = (props) => {
  const { name, size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <AntDesign name={name} size={size} color={color} />
    </AppTouchableHighlight>
  );
};

export const WhatsAppIcon = (props) => {
  const { size = ICON_SIZE, color = "#239A70", onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <Ionicons name={"logo-whatsapp"} size={size} color={color} />
    </AppTouchableHighlight>
  );
};

export const WarningIcon = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <Ionicons name={"warning"} size={size} color={color} />
    </AppTouchableHighlight>
  );
};

export const NotificationIcon = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <Ionicons name={"notifications-outline"} size={size} color={color} />
    </AppTouchableHighlight>
  );
};

export const RadioUnChecked = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <MaterialCommunityIcons
        name={"radiobox-blank"}
        size={size}
        color={color}
      />
    </AppTouchableHighlight>
  );
};

export const RadioChecked = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <MaterialCommunityIcons
        name={"radiobox-marked"}
        size={size}
        color={color}
      />
    </AppTouchableHighlight>
  );
};

export const DurationIcon = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <MaterialCommunityIcons
        name={"clock-time-four-outline"}
        size={size}
        color={color}
      />
    </AppTouchableHighlight>
  );
};

export const HeartIcon = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <MaterialCommunityIcons
        name={"heart-outline"}
        size={size}
        color={color}
      />
    </AppTouchableHighlight>
  );
};

export const ReloadIcon = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <Ionicons name={"reload"} size={size} color={color} />
    </AppTouchableHighlight>
  );
};

export const PlayIcon = (props) => {
  const { size = ICON_SIZE, color = ICON_COLOR, onPress } = props;
  return (
    <AppTouchableHighlight onPress={onPress}>
      <Ionicons name={"play"} size={size} color={color} />
    </AppTouchableHighlight>
  );
};
