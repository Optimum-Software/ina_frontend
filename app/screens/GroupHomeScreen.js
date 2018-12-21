import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { NavigationActions, Header } from "react-navigation";
import Router from "../helpers/Router";
import { Toolbar } from "react-native-material-ui";
import Api from "../helpers/Api";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Divider,
  Avatar
} from "react-native-elements";
import ViewMoreText from "react-native-view-more-text";

const admins = [
  {
    id: 1,
    name: "Jelmer",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 2,
    name: "Bert",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 3,
    name: "Wouter",
    photo_path: "../assets/images/person-stock.png"
  }
];

const persons = [
  {
    id: 1,
    name: "Jelmer",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 2,
    name: "Bert",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 3,
    name: "Wouter",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 4,
    name: "Gaauwe",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 5,
    name: "Jelmer",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 6,
    name: "Bert",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 7,
    name: "Wouter",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 8,
    name: "Gaauwe",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 9,
    name: "Jelmer",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 10,
    name: "Bert",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 11,
    name: "Wouter",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 12,
    name: "Gaauwe",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 13,
    name: "Jelmer",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 14,
    name: "Bert",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 15,
    name: "Wouter",
    photo_path: "../assets/images/person-stock.png"
  },
  {
    id: 16,
    name: "Gaauwe",
    photo_path: "../assets/images/person-stock.png"
  }
];

// const projects = [
//   {
//     name: "Hello",
//     url:
//       "https://thumbor.forbes.com/thumbor/711x458/https://specials-images.forbesimg.com/dam/imageserve/982432822/960x0.jpg?fit=scale",
//     desc:
//       "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
//     start_date: "Friday, 7 December 2018",
//     end_date: "Friday, 8 December 2018",
//     created_at: "Friday, 7 December 2018",
//     like_count: 20,
//     follower_count: 18,
//     location: "Noorderplantsoen"
//   },
//   {
//     name: "Dit is een langere titel dan de anderen.",
//     url:
//       "http://www.findapsychologist.org/wp-content/uploads/2013/07/Learning-disabilities1.jpg",
//     desc:
//       "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
//     start_date: "Friday, 7 December 2018",
//     end_date: "Friday, 8 December 2018",
//     created_at: "Friday, 7 December 2018",
//     like_count: 20,
//     follower_count: 18,
//     location: "Noorderplantsoen"
//   },
//   {
//     name: "What",
//     url:
//       "https://www.tnpvisualworkplace.com/static/upload/full/14600524-9db4-4a71-a017-5404131e0290/The+Scrum+board.jpg",
//     desc:
//       "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
//     start_date: "Friday, 7 December 2018",
//     end_date: "Friday, 8 December 2018",
//     created_at: "Friday, 7 December 2018",
//     like_count: 20,
//     follower_count: 18,
//     location: "Noorderplantsoen"
//   }
// ];

// const group = {
//   id: 1,
//   name: "React Native Grunn",
//   desc:
//     "Spicy jalapeno pork belly short loin venison jerky buffalo beef short ribs. Salami pork loin turducken pastrami pork chop chicken sausage hamburger chuck ribeye. Pig ground round pancetta, sausage bresaola sirloin rump meatloaf boudin pastrami ham hock. Filet mignon bresaola doner ground round cupim short ribs tenderloin pork loin, ball tip brisket turducken swine pork chop sirloin short loin. Andouille shank pastrami salami sirloin.",
//   photo_path: "../assets/images/banner.jpeg",
//   created_at: "2018-12-19 00:00:00.000000",
//   member_count: 0,
//   public: 1
// };
export default class GroupHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDesc: false
    };
  }
  handelEnd = () => {};

  showDesc() {
    this.setState({
      showDesc: this.state.showDesc ? false : true
    });
  }
  renderViewMore(onPress) {
    return (
      <Text style={styles.viewMoreText} onPress={onPress}>
        View more
      </Text>
    );
  }
  renderViewLess(onPress) {
    return (
      <Text style={styles.viewMoreText} onPress={onPress}>
        View less
      </Text>
    );
  }
  render() {
    const { navigation } = this.props;

    const id = navigation.getParam("id", "");
    const name = navigation.getParam("name", "");
    const desc = navigation.getParam("desc", "");
    const photo_path = navigation.getParam("photo_path", "");
    const created_at = navigation.getParam("created_at", "");
    const member_count = navigation.getParam("member_count", "");
    const public_bool = navigation.getParam("public", "");

    return (
      <View style={styles.container}>
        <Toolbar
          centerElement={name}
          iconSet="MaterialCommunityIcons"
          leftElement={"menu"}
          rightElement={"share-variant"}
          color="#00a6ff"
          onLeftElementPress={() => {
            this.props.navigation.openDrawer();
          }}
          onRightElementPress={() => {
            alert("share");
          }}
        />

        <ScrollView
          style={{
            marginBottom: "5%"
          }}
        >
          <Image
            source={require("../assets/images/banner.jpeg")}
            style={styles.banner}
          />
          <View style={styles.containerMargin}>
            <TouchableHighlight
              style={styles.joinButton}
              onPress={() => alert("Je bent nu lid")}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>Word lid</Text>
            </TouchableHighlight>

            <TouchableOpacity
              style={styles.personList}
              onPress={() =>
                Router.goTo(
                  this.props.navigation,
                  "GroupStack",
                  "GroupMembersScreen",
                  { persons: persons }
                )
              }
            >
              <FlatList
                data={persons}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.personCard}>
                    <Image
                      source={require("../assets/images/person-stock.png")}
                      resizeMode="contain"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                )}
              />
            </TouchableOpacity>

            <View style={{ marginTop: "5%", marginBottom: "8%" }}>
              <Text style={styles.h2}>{persons.length} Leden</Text>
              <Text style={styles.text}>Groningen, Netherlands</Text>
              <Text style={styles.text}>Publieke groep</Text>

              <ViewMoreText
                numberOfLines={3}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                textStyle={(styles.text, { marginTop: "2%" })}
              >
                <Text>{desc}</Text>
              </ViewMoreText>
            </View>
            {this.state.showDesc && (
              <Text style={{ marginTop: "1%" }}>{desc}</Text>
            )}

            <Divider style={{ backgroundColor: "#a8a8a8" }} />

            <View style={{ marginBottom: "8%" }}>
              <Text style={styles.h1}>Organisatoren</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: "3%"
                }}
              >
                <Avatar
                  size="medium"
                  rounded
                  source={{
                    uri:
                      "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
                  }}
                />
                <Avatar
                  size="medium"
                  rounded
                  source={{
                    uri:
                      "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
                  }}
                />
                <Avatar
                  size="medium"
                  rounded
                  source={{
                    uri:
                      "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
                  }}
                />
              </View>
            </View>

            <Divider style={{ backgroundColor: "#a8a8a8" }} />

            <Text style={styles.h1}>Projecten</Text>
            <FlatList
              data={projects}
              onEndReached={() => this.handelEnd()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    Router.goTo(
                      this.props.navigation,
                      "ProjectStack",
                      "ProjectDetailScreen",
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
                  <Card
                    style={styles.card}
                    title={item.name}
                    titleNumberOfLines={1}
                    image={{ uri: item.url }}
                    containerStyle={{ height: "40%", width: 200 }}
                  >
                    <Text style={{ marginBottom: 10 }}>The i</Text>
                  </Card>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />

            <Divider style={{ backgroundColor: "#a8a8a8" }} />

            <View style={{ marginTop: "8%", marginBottom: "40%" }}>
              <Text style={styles.h1}>Discussie</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "blue"
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#00a6ff"
  },
  container: {
    height: "100%",
    backgroundColor: "#fff"
  },
  containerMargin: {
    marginLeft: "5%",
    marginRight: "5%",
    paddingBottom: "15%"
  },
  banner: {
    height: 200,
    width: "100%",
    resizeMode: "stretch"
  },
  h1: {
    marginTop: "8%",
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },
  h2: {
    color: "#37474f",
    fontSize: 12,
    fontWeight: "bold"
  },
  text: {
    color: "#37474f",
    fontSize: 12
  },
  textRow: {
    alignItems: "center",
    flexDirection: "row"
  },
  textLink: {
    fontSize: 14,
    color: "red"
  },
  personList: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%"
  },
  personCard: {
    height: 50,
    width: 50,
    backgroundColor: "#F1F1F1",
    borderRadius: 100
  },

  card: {
    height: 200,
    width: 200
  },

  joinButton: {
    backgroundColor: "#f39200",
    width: "100%",
    height: 30,
    marginTop: "2%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  viewMoreText: {
    fontSize: 14,
    color: "red"
  }
});
