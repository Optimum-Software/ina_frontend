import React, {Component} from "react";
import {Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {Header} from "react-navigation";
import {Toolbar} from "react-native-material-ui";
import mountain from "../assets/images/firewatch_5.jpg"
import line from "../assets/images/Line.png"

export default class Projectoverview extends Component {

  constructor() {
    super();

    this.state = {
      data: [{
        title: 'Hello',
        url: 'https://thumbor.forbes.com/thumbor/711x458/https://specials-images.forbesimg.com/dam/imageserve/982432822/960x0.jpg?fit=scale'
      },
        {
          title: "Dit is een langere titel dan de anderen",
          url: 'http://www.findapsychologist.org/wp-content/uploads/2013/07/Learning-disabilities1.jpg'
        },
        {
          title: 'What',
          url: 'https://www.tnpvisualworkplace.com/static/upload/full/14600524-9db4-4a71-a017-5404131e0290/The+Scrum+board.jpg'
        },
        {
          title: "Dat",
          url: 'http://www.ajournals.com/wp-content/uploads/2015/05/Biology.jpg'
        },
        {
          title: 'Hello',
          url: 'https://thumbor.forbes.com/thumbor/711x458/https://specials-images.forbesimg.com/dam/imageserve/982432822/960x0.jpg?fit=scale'
        },
        {
          title: "Bye",
          url: 'http://www.findapsychologist.org/wp-content/uploads/2013/07/Learning-disabilities1.jpg'
        },
        {
          title: 'What',
          url: 'https://www.tnpvisualworkplace.com/static/upload/full/14600524-9db4-4a71-a017-5404131e0290/The+Scrum+board.jpg'
        },
        {
          title: "Dat",
          url: 'http://www.ajournals.com/wp-content/uploads/2015/05/Biology.jpg'
        },
      ]
    }

    // let api = Api.getInstance();
    // this.setState({
    //     data: api.getAllProjects()
    // })

  }

  static navigationOptions = ({ navigation }) => ({
      title: "Projecten"
    });

  handelEnd = () => {

  };


  render() {
    return (
      <ImageBackground
        blurRadius={3}
        source={mountain}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          {/*<View style={{height: Header.HEIGHT}}>*/}
            {/*<Toolbar iconSet="MaterialCommunityIcons" centerElement="Projecten"/>*/}
          {/*</View>*/}
          <View>
            <FlatList
              data={this.state.data}
              onEndReached={() => this.handelEnd()}
              numColumns={2}
              renderItem={({item}) => (
                <TouchableHighlight style={styles.cardContainer}
                                    onPress={() => this.props.navigation.navigate("ProjectDetail")}>

                  <View style={styles.card}>

                    <View style={styles.cardImage}>
                      <Image
                        source={{uri: item.url}}
                        resizeMode="cover"
                        style={{width: "100%", height: "100%"}}
                        />
                    </View>
                    <Image
                      source={line}
                      resizeMode="stretch"
                      style={{width: "100%", height: "2%"}}
                    />
                    <Text style={styles.cardTitle}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableHighlight>

              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

  cardImage: {
    height: '70%',
    width: '100%'

  },
  cardTitle: {
    margin: 5,
    fontSize: 15,
    fontWeight: "bold"
  }

});
