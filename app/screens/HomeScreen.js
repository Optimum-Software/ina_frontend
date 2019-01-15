import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import { Button } from "react-native-elements";
import line from "../assets/images/Line.png";
import Api from "../helpers/Api";
import GroupApi from "../helpers/GroupApi";
import User from "../helpers/User";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myGroups: [
        // {
        //   id: 1,
        //   name: "React Native Grunn",
        //   desc: "hoi",
        //   photo_path: "../assets/images/banner.jpeg",
        //   created_at: "2018-12-19 00:00:00.000000",
        //   member_count: 0,
        //   public: 1
        // }
      ],
      data: [
        // {
        //   name: "Hello",
        //   url:
        //     "https://thumbor.forbes.com/thumbor/711x458/https://specials-images.forbesimg.com/dam/imageserve/982432822/960x0.jpg?fit=scale",
        //   desc:
        //     "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
        //   start_date: "Friday, 7 December 2018",
        //   end_date: "Friday, 8 December 2018",
        //   created_at: "Friday, 7 December 2018",
        //   like_count: 20,
        //   follower_count: 18,
        //   location: "Noorderplantsoen"
        // },
        // {
        //   name: "Dit is een langere titel dan de anderen.",
        //   url:
        //     "http://www.findapsychologist.org/wp-content/uploads/2013/07/Learning-disabilities1.jpg",
        //   desc:
        //     "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
        //   start_date: "Friday, 7 December 2018",
        //   end_date: "Friday, 8 December 2018",
        //   created_at: "Friday, 7 December 2018",
        //   like_count: 20,
        //   follower_count: 18,
        //   location: "Noorderplantsoen"
        // },
        // {
        //   name: "What",
        //   url:
        //     "https://www.tnpvisualworkplace.com/static/upload/full/14600524-9db4-4a71-a017-5404131e0290/The+Scrum+board.jpg",
        //   desc:
        //     "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
        //   start_date: "Friday, 7 December 2018",
        //   end_date: "Friday, 8 December 2018",
        //   created_at: "Friday, 7 December 2018",
        //   like_count: 20,
        //   follower_count: 18,
        //   location: "Noorderplantsoen"
        // }
      ]
    };
  }

  handelEnd = () => {};

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: Header.HEIGHT }}>
            <Toolbar
              centerElement="Home page"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              style={{ container: { backgroundColor: "#00A6FF" } }}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          </View>
          <View>
            <Text style={styles.title}>Gevolgde projecten</Text>
            <FlatList
              data={this.state.data}
              onEndReached={() => this.handelEnd()}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableHighlight
                  key={item.id}
                  style={styles.cardContainer}
                  onPress={() =>
                    Router.goTo(
                      this.props.navigation,
                      "Project",
                      "ProjectDetailPage",
                      {
                        name: item.name,
                        url: item.url,
                        desc: item.desc,
                        start_date: item.start_date,
                        end_date: item.end_date,
                        created_at: item.created_at,
                        like_count: item.like_count,
                        follower_count: item.follower_count,
                        location: item.location
                      }
                    )
                  }
                >
                  <View style={styles.card}>
                    <View style={styles.cardImage}>
                      <Image
                        source={{ uri: item.url }}
                        resizeMode="cover"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                    <Image
                      source={line}
                      resizeMode="stretch"
                      style={{ width: "100%", height: "2%" }}
                    />
                    <Text numberOfLines={2} style={styles.cardTitle}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#00a6ff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  card: {
    backgroundColor: "#F1F1F1",
    margin: 10,
    width: "100%",
    height: 180,
    marginBottom: 10,
    elevation: 3
  },

  imageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

  cardImage: {
    height: "70%",
    width: "100%"
  },
  cardTitle: {
    margin: 5,
    fontSize: 15,
    fontWeight: "bold"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  }
});
