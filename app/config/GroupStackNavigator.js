import { createStackNavigator } from "react-navigation";
import GroupHomeScreen from "../screens/GroupHomeScreen";
import GroupMembersScreen from "../screens/GroupMembersScreen";

export default createStackNavigator(
  {
    GroupHomeScreen: {
      screen: GroupHomeScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    GroupMembersScreen: {
      screen: GroupMembersScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    }
  },
  {
    headerMode: "none"
  }
);
