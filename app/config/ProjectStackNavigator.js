import { createStackNavigator } from "react-navigation";
import ProjectOverviewScreen from "../screens/ProjectOverviewScreen";
import ProjectDetailScreen from "../screens/ProjectDetailScreen";
import ProjectCreateFirstScreen from "../screens/ProjectCreateFirstScreen";
import ProjectCreateSecondScreen from "../screens/ProjectCreateSecondScreen";
import ProjectCreateThirdScreen from "../screens/ProjectCreateThirdScreen";

export default createStackNavigator(
  {
    ProjectOverviewScreen: {
      screen: ProjectOverviewScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },

    ProjectDetailScreen: {
      screen: ProjectDetailScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },

    ProjectCreateFirstScreen: {
      screen: ProjectCreateFirstScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    ProjectCreateSecondScreen: {
      screen: ProjectCreateSecondScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    ProjectCreateThirdScreen: {
      screen: ProjectCreateThirdScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    }
  },
  {
    headerMode: "none"
  }
);
