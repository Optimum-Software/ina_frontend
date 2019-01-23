import { createStackNavigator, createTopTabNavigator } from "react-navigation";
import GroupOverviewScreen from "../screens/GroupOverviewScreen";
import GroupHomeScreen from "../screens/GroupHomeScreen";
import GroupMembersScreen from "../screens/GroupMembersScreen";
import GroupCreate from "../screens/GroupCreate";

export default createStackNavigator(
  {
    GroupOverviewScreen: {
      screen: GroupOverviewScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
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
    },
    GroupCreate: {
      screen: GroupCreate,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    }
  },
  {
    headerMode: "none"
  }
);
