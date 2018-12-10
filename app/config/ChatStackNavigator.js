import { createStackNavigator } from "react-navigation";
import ChatCollection from "../screens/ChatCollection";
import Chat from "../screens/Chat";

export default createStackNavigator({
      ChatCollection: {
        screen: ChatCollection,
        navigationOptions: ({ navigation }) => ({
          gesturesEnabled: false
        })
      },
      Chat: {
        screen: Chat,
        navigationOptions: ({ navigation }) => ({
          gesturesEnabled: false
        })
      }
    },
    {
        headerMode: "none"
    }
);
