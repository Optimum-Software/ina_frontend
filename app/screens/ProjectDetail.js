import React, {Component} from "react"
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    TouchableHighlight
} from "react-native";
import {Header} from "react-navigation";
import Router from "../helpers/Router";
import { Toolbar } from "react-native-material-ui";

export default class ProjectDetail extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Project"
    });

    render() {

      const { navigation } = this.props;

      const title = navigation.getParam("title", "");
      const url = navigation.getParam("url", "");
        return (
          <View>
            <View style={{ height: Header.HEIGHT }}>
              <Toolbar    leftElement={"chevron-left"}
                          onLeftElementPress={() =>
                            Router.goBack(this.props.navigation)
                          }
                          centerElement="Project"/>
            </View>

              <View style={styles.image}>
                <Image
                  source={{uri: url}}
                  resizeMode="cover"
                  style={{width: "100%", height: "100%"}}
                />
              </View>
              <Text style={styles.title}>
                {title}
              </Text>
            </View>


          );


    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: '#F1F1F1',
    margin: 10,
    width: '100%',
    height: 180,
    marginBottom: 10,
    elevation: 3,
  },

  imageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
     },

  image: {
      height:'50%',
      width:'100%'
      },
  title: {
    margin: 5,
    fontSize: 20,
    fontWeight: "bold"
  }

});
