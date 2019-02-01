import { createStackNavigator } from "react-navigation";
import ProjectOverviewScreen from "../screens/ProjectOverviewScreen";
import ProjectDetailScreen from "../screens/ProjectDetailScreen";
import ProjectMembersScreen from "../screens/ProjectMembersScreen";
import ProjectUpdateCreate from "../screens/ProjectUpdateCreate";
import ProjectEditFirstScreen from "../screens/ProjectEditFirstScreen";
import ProjectEditSecondScreen from "../screens/ProjectEditSecondScreen";
import ProjectEditThirdScreen from "../screens/ProjectEditThirdScreen";
import ExploreScreen from "../screens/ExploreScreen";
import ProjectCreateStackNavigator from "./ProjectCreateStackNavigator";

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
    ProjectCreateStackNavigator: {
      screen: ProjectCreateStackNavigator,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    ProjectMembersScreen: {
      screen: ProjectMembersScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    ProjectUpdateCreate: {
      screen: ProjectUpdateCreate,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    ProjectEditFirstScreen: {
      screen: ProjectEditFirstScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    ProjectEditSecondScreen: {
      screen: ProjectEditSecondScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    ProjectEditThirdScreen: {
      screen: ProjectEditThirdScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    }
  },

  {
    headerMode: "none"
  }
);
