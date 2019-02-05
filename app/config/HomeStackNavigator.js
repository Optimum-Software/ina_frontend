import { createStackNavigator } from "react-navigation";
import ProjectOverviewScreen from "../screens/ProjectOverviewScreen";
import ProjectDetailScreen from "../screens/ProjectDetailScreen";
import ProjectCreateFirstScreen from "../screens/ProjectCreateFirstScreen";
import ProjectCreateSecondScreen from "../screens/ProjectCreateSecondScreen";
import ProjectCreateThirdScreen from "../screens/ProjectCreateThirdScreen";
import ProjectCreateFourthScreen from "../screens/ProjectCreateFourthScreen";
import ProjectMembersScreen from "../screens/ProjectMembersScreen";
import ExploreScreen from "../screens/ExploreScreen";
import HomeScreen from "../screens/HomeScreen";
import Videoplayer from "../screens/Videoplayer";
import Imageviewer from "../screens/Imageviewer";

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home-outline" size={28} color={tintColor} />
        )
      }
    },

    ProjectDetailScreen: {
      screen: ProjectDetailScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
  },

  {
    headerMode: "none"
  }
);
