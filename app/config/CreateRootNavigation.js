import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { RootNavigatorLoggedOut } from "./CreateNavigationLoggedOut";
import { RootNavigatorLoggedIn } from "./CreateNavigationLoggedIn";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExploreScreen from "../screens/ExploreScreen";
import User from "../helpers/User";
export const RootNav = isLoggedIn => {
  return createSwitchNavigator(
    {
      LoggedIn: {
        screen: RootNavigatorLoggedIn
      },
      LoggedOut: {
        screen: RootNavigatorLoggedOut
      },
      ProfileEdit: {
        screen: ProfileEditScreen
      },
      ProfileScreen: {
        screen: ProfileScreen
      },
      ExploreScreen: {
        screen: ExploreScreen
      }
    },
    {
      initialRouteName: isLoggedIn ? "LoggedIn" : "LoggedOut"
    }
  );
};

export const RootNavigation = isLoggedIn => {
  return createAppContainer(RootNav(isLoggedIn));
};
