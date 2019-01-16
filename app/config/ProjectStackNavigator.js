import { createStackNavigator } from "react-navigation";
import ProjectOverviewScreen from "../screens/ProjectOverviewScreen";
import ProjectDetailScreen from "../screens/ProjectDetailScreen";
import ExploreScreen from "../screens/ExploreScreen";

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
    }
  },

  {
    headerMode: "none"
  }
);
