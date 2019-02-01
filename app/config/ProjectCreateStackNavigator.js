import { createStackNavigator } from "react-navigation";
import ProjectCreateFirstScreen from "../screens/ProjectCreateFirstScreen";
import ProjectCreateSecondScreen from "../screens/ProjectCreateSecondScreen";
import ProjectCreateThirdScreen from "../screens/ProjectCreateThirdScreen";
import ProjectCreateFourthScreen from "../screens/ProjectCreateFourthScreen";

export default createStackNavigator(
  {
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
    },
    ProjectCreateFourthScreen: {
      screen: ProjectCreateFourthScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    }
  },

  {
    headerMode: "none"
  }
);
