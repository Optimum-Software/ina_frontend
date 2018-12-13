import { createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreenStart from "../screens/RegistrationScreenStart";
import RegistrationScreenPhone from "../screens/RegistrationScreenPhone";
import RegistrationScreenVerify from "../screens/RegistrationScreenVerify";
import RegistrationScreenVerifySuccessfull from "../screens/RegistrationScreenVerifySuccessfull";

export default createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    RegisterStart: {
      screen: RegistrationScreenStart,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },

    RegisterPhone: {
      screen: RegistrationScreenPhone,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },

    RegisterVerify: {
      screen: RegistrationScreenVerify,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    RegisterVerifySuccessfull: {
      screen: RegistrationScreenVerifySuccessfull,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    }
  },

  {
    headerMode: "none",
    initialRouteName: "LoginScreen"
  }
);
