import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Toolbar } from "react-native-material-ui";
import { Header } from "react-navigation";
import CardStack, { Card } from 'react-native-card-stack-swiper';

export default class Explore extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Ontdekken"
          iconSet="MaterialCommunityIcons"
          leftElement={"menu"}
          onLeftElementPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <CardStack
          style={styles.content}
          ref={swiper => {
            this.swiper = swiper
          }}
          disableTopSwipe={true}
          disableBottomSwipe={true}
          horizontalThreshold={150}
          onSwipedLeft={() => console.log('onSwipedLeft')}
          onSwipedRight={() => console.log('onSwipedRight')}
        >
          <Card style={styles.card}>
            <View style={styles.imagePart}>
              <Image
                source={{ uri: 'https://www.pdr.nl/uploads/img/IMG18-08-22_16-47-17.png'}}
                resizeMode="center"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View style={styles.textPart}>
              <Text style={styles.label}>A</Text>
            </View>
          </Card>
        </CardStack>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagePart: {
    backgroundColor: 'red',
    flex: 1
  },

  textPart: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green'
  },
  card:{
    width: 320,
    height: 500,
    backgroundColor: '#009EF2',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  label: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
