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
import GroupApi from "../helpers/GroupApi";
import User from "../helpers/User";

import {
  Card,
  ListItem,
  Button,
  Icon,
  Divider,
  Avatar
} from "react-native-elements";
import ViewMoreText from "react-native-view-more-text";

const projects = [
  {
    name: "Hello",
    url:
      "https://thumbor.forbes.com/thumbor/711x458/https://specials-images.forbesimg.com/dam/imageserve/982432822/960x0.jpg?fit=scale",
    desc:
      "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    start_date: "Friday, 7 December 2018",
    end_date: "Friday, 8 December 2018",
    created_at: "Friday, 7 December 2018",
    like_count: 20,
    follower_count: 18,
    location: "Noorderplantsoen"
  },
  {
    name: "Dit is een langere titel dan de anderen.",
    url:
      "http://www.findapsychologist.org/wp-content/uploads/2013/07/Learning-disabilities1.jpg",
    desc:
      "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    start_date: "Friday, 7 December 2018",
    end_date: "Friday, 8 December 2018",
    created_at: "Friday, 7 December 2018",
    like_count: 20,
    follower_count: 18,
    location: "Noorderplantsoen"
  },
  {
    name: "What",
    url:
      "https://www.tnpvisualworkplace.com/static/upload/full/14600524-9db4-4a71-a017-5404131e0290/The+Scrum+board.jpg",
    desc:
      "Spicy jalapeno bacon ipsum dolor amet pig strip steak meatball, beef ribs leberkas alcatra filet mignon boudin turkey chuck brisket turducken ground round. Bacon brisket ham, tail shankle ball tip burgdoggen flank capicola shank beef ribs andouille. Swine pork ham hock sausage. Brisket kielbasa corned beef leberkas andouille jerky bacon. Salami buffalo corned beef, pig beef ribs t-bone brisket frankfurter tongue pancetta prosciutto. Burgdoggen corned beef beef bresaola shank doner ball tip rump biltong meatloaf.",
    start_date: "Friday, 7 December 2018",
    end_date: "Friday, 8 December 2018",
    created_at: "Friday, 7 December 2018",
    like_count: 20,
    follower_count: 18,
    location: "Noorderplantsoen"
  }
];

export default class GroupHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDesc: false,
      groupAdmin: {},
      groupMembers: [],
      showAdminBio: false,
      group: {
        id: this.props.navigation.getParam("id", ""),
        name: this.props.navigation.getParam("name", ""),
        desc: this.props.navigation.getParam("desc", ""),
        photo_path: this.props.navigation.getParam("photo_path", ""),
        created_at: this.props.navigation.getParam("created_at", ""),
        member_count: this.props.navigation.getParam("member_count", ""),
        public_bool: this.props.navigation.getParam("public_bool", "")
      },
      groupAdminBio: "",
      member: this.props.navigation.getParam("member", "")
    };
  }
  handelEnd = () => {};

  componentDidMount() {
    this.updateGroupInfo();
  }

  renderViewMore(onPress) {
    return (
      <Text style={styles.viewMoreText} onPress={onPress}>
        Lees meer
      </Text>
    );
  }
  renderViewLess(onPress) {
    return (
      <Text style={styles.viewMoreText} onPress={onPress}>
        Lees minder
      </Text>
    );
  }

  joinGroup() {
    User.getUserId().then(id => {
      GroupApi.joinGroup(id, this.state.group.id).then(result => {
        if (result["bool"]) {
          this.setState({ member: true });
          this.updateGroupInfo();
          alert("Je bent nu lid");
        } else {
          alert(result["msg"]);
        }
      });
    });
  }

  leaveGroup() {
    User.getUserId().then(id => {
      GroupApi.leaveGroup(id, this.state.group.id).then(result => {
        if (result["bool"]) {
          alert("Je hebt de groep verlaten");
          this.setState({ member: false });
          this.updateGroupInfo();
        } else {
          alert(result["msg"]);
        }
      });
    });
  }

  updateGroupInfo() {
    GroupApi.getGroupById(this.state.group.id).then(result => {
      if (result["bool"]) {
        this.setState({
          group: result["group"]
        });
      } else {
        alert("Kon groep niet updaten");
      }
    });
    GroupApi.getGroupMembersById(this.state.group.id).then(result => {
      if (result["bool"]) {
        this.setState({
          groupMembers: result["members"]
        });
        console.log(this.state.groupMembers);
      } else {
        alert("Er zijn geen deelnemers");
      }
    });
    GroupApi.getGroupAdminById(this.state.group.id).then(result => {
      if (result["bool"]) {
        this.setState({
          groupAdmin: result["user"],
          groupAdminBio: result["user"].bio
        });
        console.log(this.state.groupAdmin);
      } else {
        alert("Kan groep admin niet vinden");
      }
    });
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
          color="#00a6ff"
          iconSet="MaterialCommunityIcons"
          centerElement={this.state.group.name}
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
          rightElement={"share-variant"}
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
            source={{ uri: this.state.group.photo_path }}
            style={styles.banner}
          />
          <View style={styles.containerMargin}>
            {this.state.member == false && (
              <TouchableHighlight
                style={styles.joinButton}
                onPress={() => this.joinGroup()}
              >
                <Text style={{ fontSize: 18, color: "#fff" }}>Word lid</Text>
              </TouchableHighlight>
            )}
            {this.state.member == true && (
              <TouchableHighlight
                style={styles.leaveButton}
                onPress={() => this.leaveGroup()}
              >
                <Text style={{ fontSize: 18, color: "#fff" }}>
                  Verlaat groep
                </Text>
              </TouchableHighlight>
            )}
            <TouchableOpacity
              style={styles.personList}
              onPress={() =>
                Router.goTo(
                  this.props.navigation,
                  "GroupStack",
                  "GroupMembersScreen",
                  { persons: this.state.groupMembers }
                )
              }
            >
              <FlatList
                data={this.state.groupMembers}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.personCard}>
                    <Image
                      source={{
                        uri: item.profilePhotoPath
                      }}
                      resizeMode="cover"
                      style={{ width: 50, height: 50, borderRadius: 100 }}
                    />
                  </View>
                )}
              />
            </TouchableOpacity>

            <View style={{ marginTop: "5%", marginBottom: "8%" }}>
              <Text style={styles.h2}>
                {this.state.groupMembers.length} Leden
              </Text>
              {
                // TODO: voeg locatie toe aan groep
              }
              <Text style={styles.text}>Groningen, Netherlands</Text>
              {this.state.group.public_bool == 1 && (
                <Text style={styles.text}>Publieke groep</Text>
              )}
              {this.state.group.public_bool == 0 && (
                <Text style={styles.text}>Besloten groep</Text>
              )}
              <ViewMoreText
                numberOfLines={3}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                textStyle={(styles.text, { marginTop: "2%" })}
              >
                <Text>{this.state.group.desc}</Text>
              </ViewMoreText>
            </View>

            <Divider style={{ backgroundColor: "#a8a8a8" }} />

            <View style={{ marginBottom: "8%" }}>
              <Text style={styles.h1}>Administrator</Text>
              <View
                style={{
                  marginTop: "3%"
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Avatar
                    size="medium"
                    rounded
                    source={{
                      uri: this.state.groupAdmin.profilePhotoPath
                    }}
                  />
                  <View style={{ marginLeft: "1%" }}>
                    <Text>
                      {this.state.groupAdmin.firstName +
                        " " +
                        this.state.groupAdmin.lastName}
                    </Text>
                    <Text>
                      {this.state.groupAdmin.function +
                        " bij " +
                        this.state.groupAdmin.organisation}
                    </Text>
                  </View>
                </View>
                <Text>{"Over " + this.state.groupAdmin.firstName}</Text>
                <ViewMoreText
                  numberOfLines={3}
                  renderViewMore={this.renderViewMore}
                  renderViewLess={this.renderViewLess}
                  textStyle={styles.text}
                >
                  <Text>{this.state.groupAdminBio}</Text>
                </ViewMoreText>
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
    marginBottom: "2%",
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
    backgroundColor: "#cfd8dc",
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start"
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
    marginBottom: "2%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  leaveButton: {
    backgroundColor: "#ef5350",
    width: "100%",
    height: 30,
    marginBottom: "2%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  viewMoreText: {
    fontSize: 14,
    color: "red"
  }
});
