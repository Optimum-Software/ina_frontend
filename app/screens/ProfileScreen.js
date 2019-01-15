import React, { Component } from "react";
import {
	SafeAreaView,
	StatusBar,
	View,
	StyleSheet,
	Platform,
	Image,
	ScrollView,
	Text,
	TouchableHighlight,
	ActivityIndicator
} from "react-native";
import { Toolbar } from "react-native-material-ui";
import UserApi from "../helpers/UserApi";
import { Header } from "react-navigation";
import Router from "../helpers/Router";
import User from "../helpers/User";
import Api from "../helpers/Api";
import { Input, Icon } from "react-native-elements";
import ImagePicker from "react-native-image-picker";

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
    	profilePhoto: {
    		uri: ''
    	},
    	loading: false,
    	email: '',
    	mobile: '',
    	firstName: '',
    	lastName: '',
    	bio: '',
    	organisation: '',
    	_function: ''
    };

  }

  componentDidMount() {
  	this.setState({loading: true})
  	User.getUserId().then( id => {
  		if(id != null) {
  			Api.callApiGetSafe('getUserById/' + id).then(res => {
  				if(res['bool']) {
  					this.setState({
  						profilePhoto: {uri: Api.getFileUrl(res.user.profilePhotoPath)},
  						firstName: res.user.firstName,
  						lastName: res.user.lastName,
  						bio: res.user.bio,
  						organisation: res.user.organisation,
  						_function: res.user.function,
  						email: res.user.email,
  						mobile: res.user.mobile
  					})
  				}
  				this.setState({loading: false})
  			});
  		}
  	});
  }

  pickImageHandler() {
    ImagePicker.showImagePicker(
      { title: "Kies een profiel photo"},
      res => {
        if (res.didCancel) {
          console.log("User cancelled!");
        } else if (res.error) {
          console.log("Error", res.error);
        } else {
          this.setState({
          	profilePhoto: {uri: res.uri}
          });
        }
      }
    );
  };

  saveInfo() {
  	this.setState({loading: true})
  	User.getUserId().then(id => {
  		UserApi.updateUser(id, this.state.firstName, this.state.lastName, this.state.bio, this.state.organisation, this.state._function, this.state.profilePhoto.uri).then(res => {
  			if(res['bool']) {
  				alert(res['msg'])
  			} else {
  				alert(res['msg'])
  			}
  			this.setState({loading: false})
  		});
  	});
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <ScrollView>
          <View style={{ height: Header.HEIGHT }}>
            <Toolbar
            	centerElement="Profiel"
            	iconSet="MaterialCommunityIcons"
            	leftElement={"chevron-left"}
            	style={{container: {"backgroundColor": "#009EF2"}}}
            	onLeftElementPress={() => {
            	  Router.goTo(this.props.navigation, 'Tabs', 'Home');
            	}}
            />
          </View>
          {!this.state.loading && (
					<View style={{paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%'}}>
          	<View style={{flexDirection: 'row', justifyContent: 'center'}}>
          		<Image
          		  source={this.state.profilePhoto}
          		  resizeMode="cover"
          		  style={styles.profilePhoto}
        			/>
        			<Icon
          		  name="edit"
          		  type="MaterialIcons"
          		  size={30}
          		  color="#a8a8a8"
          		  underlayColor="transparent"
          		  containerStyle={styles.editPhotoContainer}
          		  onPress={() => this.pickImageHandler()}
          		/>
          	</View>
          	<View style={styles.contactBox}>
          		<View style={styles.labels}>
          			<Icon
          				name="envelope"
          				type="font-awesome"
          				size={25}
          				color="#a8a8a8"
          			/>
          			<Icon
          				name="mobile"
          				type="font-awesome"
          				size={35}
          				color="#a8a8a8"
          			/>
          		</View>
          		<View style={styles.items}>
          			<Text style={styles.item}>{this.state.email}</Text>
          			<Text style={styles.item}>{this.state.mobile}</Text>
          		</View>
          	</View>
          	<View style={styles.separator}/>
          	<View style={{flexDirection: 'column'}}>
          		<Input
          	 		containerStyle={styles.containerStyle}
          	 		inputContainerStyle={styles.inputContainerStyle}
          	 		inputStyle={styles.inputStyle}
          	 		value={this.state.firstName}
          	 		label="Voornaam"
          	 		labelStyle={styles.labelStyle}
          	 		leftIcon={{ type: "font-awesome", name: "user", color: "#a8a8a8" }}
          	 		leftIconContainerStyle={{alignSelf: 'flex-start'}}
          	 		onChangeText={firstName => this.setState({ firstName })}
          	 		onSubmitEditing={() => console.log(this.state.firstName)}
          		/>
          		<Input
          	 		containerStyle={styles.containerStyle}
          	 		inputContainerStyle={styles.inputContainerStyle}
          	 		inputStyle={styles.inputStyle}
          	 		value={this.state.lastName}
          	 		label="Achternaam"
          	 		labelStyle={styles.labelStyle}
          	 		leftIcon={{ type: "font-awesome", name: "user", color: "#a8a8a8" }}
          	 		leftIconContainerStyle={{alignSelf: 'flex-start'}}
          	 		onChangeText={lastName => this.setState({ lastName })}
          	 		onSubmitEditing={() => console.log(this.state.lastName)}
          		/>
          		<Input
          			containerStyle={[styles.containerStyle]}
          	 		inputContainerStyle={[styles.inputContainerStyle, {height: 150}]}
          	 		inputStyle={[styles.inputStyle, {height: 150}]}
          	 		value={this.state.bio}
          	 		label="Bio"
          	 		labelStyle={styles.labelStyle}
          	 		leftIcon={{ type: "font-awesome", name: "user", color: "#a8a8a8" }}
          	 		leftIconContainerStyle={{alignSelf: 'flex-start'}}
          	 		multiline = {true}
          	 		numberOfLines={6}
            		textAlignVertical={'top'}
          	 		onChangeText={bio => this.setState({ bio })}
          	 		onSubmitEditing={() => console.log(this.state.bio)}
          		/>
          		<Input
          	 		containerStyle={styles.containerStyle}
          	 		inputContainerStyle={styles.inputContainerStyle}
          	 		inputStyle={styles.inputStyle}
          	 		value={this.state.organisation}
          	 		label="Organisatie"
          	 		labelStyle={styles.labelStyle}
          	 		leftIcon={{ type: "font-awesome", name: "user", color: "#a8a8a8" }}
          	 		leftIconContainerStyle={{alignSelf: 'flex-start'}}
          	 		onChangeText={organisation => this.setState({ organisation })}
          	 		onSubmitEditing={() => console.log(this.state.organisation)}
          		/>
          		<Input
          	 		containerStyle={styles.containerStyle}
          	 		inputContainerStyle={styles.inputContainerStyle}
          	 		inputStyle={styles.inputStyle}
          	 		value={this.state._function}
          	 		label="Functie"
          	 		labelStyle={styles.labelStyle}
          	 		leftIcon={{ type: "font-awesome", name: "user", color: "#a8a8a8" }}
          	 		leftIconContainerStyle={{alignSelf: 'flex-start'}}
          	 		onChangeText={_function => this.setState({ _function })}
          	 		onSubmitEditing={() => console.log(this.state._function)}
          		/>
          	</View>
          	<TouchableHighlight
              underlayColor="#009ef2"
              style={styles.buttonStyle}
              onPress={() => this.saveInfo()}
            >
              <Text style={styles.safeText}>Opslaan</Text>
            </TouchableHighlight>
          </View>
          )}
     	</ScrollView>
     	{
      	this.state.loading && (
      		<View
        		style={{
        		  height: '92.5%',
        		  justifyContent: 'center',
        		  alignItems: 'center'
        		}}
      		>
        		<ActivityIndicator size="large" color="#000" />
      		</View>
      	)
      } 
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
	profilePhoto: {
		height: 150,
		width: 150,
		borderRadius: 200,
	},

	editPhotoContainer: {
		width: '10%',
		height: '20%',
		alignSelf: 'flex-end'
	},

	safeArea: {
		height: '100%',
		width: '100%'
	},

	contactBox: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop: 20,
		marginBottom: 5,
	},

	separator: {
    height: 1,
    backgroundColor: '#b5babf',
    marginTop: 15,
    marginBottom: 15,
    width: '80%',
    alignSelf: 'center'
  },

	labels: {
		paddingLeft: 15,
		width: '13%',
		height: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},

	items: {
		width: '87%',
		height: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},

	item: {
		fontSize: 20,
		color: 'black'
	},

	containerStyle: {
		marginBottom: 20,
		width: '100%'
	},

	inputContainerStyle: {

	},

	inputStyle: {
		height: undefined
	},

	labelStyle: {
		color: '#000',
		marginLeft: 30
	},

	buttonStyle: {
    backgroundColor: "#00a6ff",
    borderRadius: 15,
    height: 50,
    justifyContent: 'center'
	},

	safeText: {
		color: "#fff",
    alignSelf: "center",
    fontSize: 20
	}
})