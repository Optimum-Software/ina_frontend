import React, {Component}  from 'react';
import {
	Text, 
	View, 
	SafeAreaView,
	StyleSheet,
	TouchableHighlight,
	ActivityIndicator,
  Alert
} from 'react-native';
import { Input, Icon } from "react-native-elements";
import User from "../helpers/User";
import ProjectApi from "../helpers/ProjectApi";
import Router from "../helpers/Router";
import { Toolbar } from "react-native-material-ui";

import { decode, encode } from 'he';

export default class ProjectUpdateCreate extends Component{
	constructor() {
		super();
		this.state = {
			loading: false,
			title: '',
			content: '',
			project: null
		}
	}

	componentDidMount() {
		this.setState({project: this.props.navigation.getParam("project", "")})
	}

	saveUpdate() {
		this.setState({loading: true})
		if(this.checkInput()) {
			User.getUserId().then(id => {
				ProjectApi.updateProject(this.props.navigation.getParam("project", "").project.id, id, encode(this.state.title), encode(this.state.content)).then(res => {
					if(res['bool']) {
						this.setState({loading: false, title: '', content: ''})
            Alert.alert(res['msg'], "Er is een project update aangemaakt")
					}
				})
			});
		} else {
			this.setState({loading: false})
			console.log("title or content empty")
		}
		
	}

	checkInput() {
		return (this.state.title != '' && this.state.content != '')
	}

  render(){
    return(
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >
      	<Toolbar
        	centerElement={"Update voor project"}
        	iconSet="MaterialCommunityIcons"
        	leftElement={"chevron-left"}
        	style={{container: {"backgroundColor": "#009EF2"}}}
        	onLeftElementPress={() => {
        	  Router.goBack(this.props.navigation);
        	}}
        />
        { !this.state.loading && (
        	<View style={styles.container}>
        		<Input
        			placeholder="Geef een titel aan"
              placeholderTextColor="#4a6572"
          	  label="Titel"
          	  labelStyle={styles.labelStyle}
          	  containerStyle={styles.containerStyle}
          	  inputContainerStyle={styles.inputContainerStyle}
          	  inputStyle={styles.inputStyle}
          	  value={this.state.title}
          	  leftIcon={{
          	    type: "material-community",
          	    name: "format-title",
          	    color: "#000"
          	  }}
          	  maxLength={50}
          	  onChangeText={title => this.setState({ title })}
          	  onSubmitEditing={() => console.log(this.state.title)}
          	/>
          	<Input
          		placeholder="Geef de inhoud aan"
              placeholderTextColor="#4a6572"
          		label="Inhoud"
          		labelStyle={styles.labelStyle}
          	  containerStyle={styles.containerStyle}
          	  inputContainerStyle={[styles.inputContainerStyle, {height: 250}]}
          	  inputStyle={[styles.inputStyle, {height: 250}]}
          	  value={this.state.content}
          	  leftIcon={{
          	    type: "entypo",
          	    name: "text",
          	    color: "#000"
          	  }}
          	  leftIconContainerStyle={{alignSelf: 'flex-start'}}
          	  multiline = {true}
          	  maxLength={3000}
          	  textAlignVertical={'top'}
          	  onChangeText={content => this.setState({ content })}
          	  onSubmitEditing={() => console.log(this.state.content)}
          	/>
          	<TouchableHighlight
          		underlayColor="#009ef2"
          	  style={styles.buttonStyle}
          	  onPress={() => this.saveUpdate()}
          	>
          		<Text style={styles.safeText}>
          			Opslaan
          		</Text>
          	</TouchableHighlight>
        	</View>
        )}
        { this.state.loading && (
        	<View
        		style={{
        		  height: '92.5%',
        		  justifyContent: 'center',
        		  alignItems: 'center'
        		}}
      		>
        		<ActivityIndicator size="large" color="#000" />
      		</View>
        )}
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},

	buttonStyle: {
    backgroundColor: "#00a6ff",
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center'
	},

  labelStyle: {
    alignSelf: "flex-start",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a6572"
  },

	safeText: {
		color: "#fff",
    alignSelf: "center",
    fontSize: 20
	},

	containerStyle: {
		width: "80%",
    alignSelf: 'center',
    backgroundColor: "transparent",
    marginBottom: 20
	},

	inputStyle: {
		color: "#4a6572",
    height: undefined
	},

})

