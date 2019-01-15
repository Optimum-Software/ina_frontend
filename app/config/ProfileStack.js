import { createStackNavigator } from "react-navigation";
import ProfileScreen from "../screens/ProfileScreen";

export default createStackNavigator({
      ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
          gesturesEnabled: false
        })
      },
    },
    {
        headerMode: "none"
    }
);
