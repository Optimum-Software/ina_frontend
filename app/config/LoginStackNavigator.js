import { createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreenStart from "../screens/RegistrationScreenStart";

export default createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    RegistrationScreenStart
});
