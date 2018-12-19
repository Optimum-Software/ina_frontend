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
  StatusBar
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import mountain from "../assets/images/firewatch_5.jpg";
import line from "../assets/images/Line.png";
import Router from "../helpers/Router";
import ProjectApi from "../helpers/ProjectApi"

export default class ProjectOverview extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };

    // this.state = {
    //   data: [
    //     {
    //       name: "Hello",
    //       url:
    //         "https://thumbor.forbes.com/thumbor/711x458/https://specials-images.forbesimg.com/dam/imageserve/982432822/960x0.jpg?fit=scale",
    //       desc:
    //         "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    //       start_date: "Friday, 7 December 2018",
    //       end_date: "Friday, 8 December 2018",
    //       created_at: "Friday, 7 December 2018",
    //       like_count: 20,
    //       follower_count: 18,
    //       location: "Noorderplantsoen"
    //     },
    //     {
    //       name: "Dit is een langere titel dan de anderen.",
    //       url:
    //         "http://www.findapsychologist.org/wp-content/uploads/2013/07/Learning-disabilities1.jpg",
    //       desc:
    //         "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    //       start_date: "Friday, 7 December 2018",
    //       end_date: "Friday, 8 December 2018",
    //       created_at: "Friday, 7 December 2018",
    //       like_count: 20,
    //       follower_count: 18,
    //       location: "Noorderplantsoen"
    //     },
    //     {
    //       name: "What",
    //       url:
    //         "https://www.tnpvisualworkplace.com/static/upload/full/14600524-9db4-4a71-a017-5404131e0290/The+Scrum+board.jpg",
    //       desc:
    //         "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    //       start_date: "Friday, 7 December 2018",
    //       end_date: "Friday, 8 December 2018",
    //       created_at: "Friday, 7 December 2018",
    //       like_count: 20,
    //       follower_count: 18,
    //       location: "Noorderplantsoen"
    //     },
    //     {
    //       name: "Dat",
    //       url:
    //         "http://www.ajournals.com/wp-content/uploads/2015/05/Biology.jpg",
    //       desc:
    //         "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    //       start_date: "Friday, 7 December 2018",
    //       end_date: "Friday, 8 December 2018",
    //       created_at: "Friday, 7 December 2018",
    //       like_count: 20,
    //       follower_count: 18,
    //       location: "Noorderplantsoen"
    //     },
    //     {
    //       name: "Hello",
    //       url:
    //         "https://thumbor.forbes.com/thumbor/711x458/https://specials-images.forbesimg.com/dam/imageserve/982432822/960x0.jpg?fit=scale",
    //       desc:
    //         "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    //       start_date: "Friday, 7 December 2018",
    //       end_date: "Friday, 8 December 2018",
    //       created_at: "Friday, 7 December 2018",
    //       like_count: 20,
    //       follower_count: 18,
    //       location: "Noorderplantsoen"
    //     },
    //     {
    //       name: "Bye",
    //       url:
    //         "http://www.findapsychologist.org/wp-content/uploads/2013/07/Learning-disabilities1.jpg",
    //       desc:
    //         "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    //       start_date: "Friday, 7 December 2018",
    //       end_date: "Friday, 8 December 2018",
    //       created_at: "Friday, 7 December 2018",
    //       like_count: 20,
    //       follower_count: 18,
    //       location: "Noorderplantsoen"
    //     },
    //     {
    //       name: "What",
    //       url:
    //         "https://www.tnpvisualworkplace.com/static/upload/full/14600524-9db4-4a71-a017-5404131e0290/The+Scrum+board.jpg",
    //       desc:
    //         "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    //       start_date: "Friday, 7 December 2018",
    //       end_date: "Friday, 8 December 2018",
    //       created_at: "Friday, 7 December 2018",
    //       like_count: 20,
    //       follower_count: 18,
    //       location: "Noorderplantsoen"
    //     },
    //     {
    //       name: "Dat",
    //       url:
    //         "http://www.ajournals.com/wp-content/uploads/2015/05/Biology.jpg",
    //       desc:
    //         "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    //       start_date: "Friday, 7 December 2018",
    //       end_date: "Friday, 8 December 2018",
    //       created_at: "Friday, 7 December 2018",
    //       like_count: 20,
    //       follower_count: 18,
    //       location: "Noorderplantsoen"
    //     }
    //   ]
    // };

    let response = ProjectApi.getAllProjects().then(result => {
    console.log("hallllloooooo")
        if (result['bool']) {
            this.setState({
                data: result['projects']
            })
            console.log(this.state.data)
        }else {
          alert(result['msg'])
        }
    });



  }

  static navigationOptions = ({ navigation }) => ({
    title: "Projecten"
  });

  handelEnd = () => {};

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <StatusBar
     backgroundColor="#00a6ff"
     barStyle="light-content"
   />
      <ImageBackground
        blurRadius={3}
        source={mountain}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View style={{ height: Header.HEIGHT }}>
            <Toolbar
              centerElement="Projecten"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          </View>
          <View>
            <FlatList
              data={this.state.data}
              onEndReached={() => this.handelEnd()}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableHighlight
                  style={styles.cardContainer}
                  onPress={() =>
                    Router.goTo(
                      this.props.navigation,
                      "ProjectStack",
                      "ProjectDetailScreen",
                      {
                        id: item.id,
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
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00a6ff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  }
});
