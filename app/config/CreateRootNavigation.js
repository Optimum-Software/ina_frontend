import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { RootNavigatorLoggedOut } from "./CreateNavigationLoggedOut";
import { RootNavigatorLoggedIn } from "./CreateNavigationLoggedIn";
import ProfileScreen from "../screens/ProfileScreen";
import User from "../helpers/User";
export const RootNav = (isLoggedIn) => { return createSwitchNavigator(
    {
      LoggedIn: {
        screen: RootNavigatorLoggedIn
      },
      LoggedOut: {
        screen: RootNavigatorLoggedOut
      },
      Profile: {
        screen: ProfileScreen
      }
    },
    {
      initialRouteName: isLoggedIn ? "LoggedIn" : "LoggedOut"
	}
  )};

export const RootNavigation = (isLoggedIn) => {return createAppContainer(RootNav(isLoggedIn))};