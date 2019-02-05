import { createStackNavigator } from "react-navigation";
import SavedProjectScreen from "../screens/SavedProjectScreen";

export default createStackNavigator({
      SavedProjectScreen: {
        screen: SavedProjectScreen,
        navigationOptions: ({ navigation }) => ({
          gesturesEnabled: false
        })
      },
    },
    {
        headerMode: "none"
    }
);
