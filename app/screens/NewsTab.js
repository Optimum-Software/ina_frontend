import React, {Component}  from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableHighlight,
	StyleSheet,
	FlatList,
	RefreshControl,
	Image
} from 'react-native';
import Router from "../helpers/Router";
import { Icon } from "react-native-elements";
import User from "../helpers/User";
import ProjectApi from "../helpers/ProjectApi";
import moment from "moment/min/moment-with-locales";
import line from "../assets/images/Line.png";

import { decode, encode } from 'he';

export default class NewsTab extends Component{
	constructor(props) {
    super(props);
    this.state = {
    	admin: false,
    	project: null,
    	updateList: null,
    	refreshing: false
    }
  }

  componentDidMount() {
  	ProjectApi.getUpdatesForProject(this.props.project.id).then(res => {
  		if(res['bool']) {
  			this.setState({updateList: res['updates']})
  		}
  	})
  	User.getUserId().then(id => {
  		if(id == this.props.project.creator.id) {
  			this.setState({admin: true})
  		}
  	});
  	this.setState({project: this.props.project})
  }

  handelEnd() {}

  onRefresh() {
  	this.setState({refreshing: true}, function() {
  		ProjectApi.getUpdatesForProject(this.props.project.id).then(res => {
  			if(res['bool']) {
  				this.setState({updateList: res['updates']})
  			}
  			this.setState({refreshing: false})
  		})
  	})
  }

  render(){
    return(
      <View style={styles.container}>
        	<FlatList
        	  data={this.state.updateList}
        	  keyExtractor={item => "" + item.id}
        	  onEndReached={() => this.handelEnd()}
        	  refreshing={this.state.refreshing}
        	  onRefresh={() => this.onRefresh()}
        	  renderItem={({ item }) => {
        	  	moment.locale('nl');
        	    return (
        	    	<View style={styles.box}>
        	    		<View style={styles.boxTitle}>
        	    			<Text style={styles.titleStyle}>{decode(item.title)}</Text>
        	    		</View>
        	    		<View style={styles.separator}/>
        	    		<View style={styles.boxContent}>
        	    			<Text>{decode(item.content)}</Text>
        	    		</View>
        	    		<Image
              		  source={line}
              		  resizeMode="stretch"
              		  style={{ width: "100%", height: 2 }}
              		/>
        	    		<View style={styles.boxDate}>
        	    			<Text>{moment(item.created_at).fromNow()}</Text>
        	    		</View>
        	    	</View>
        	    );
        	  }}
        	/>
        { this.state.admin && (
        	<TouchableHighlight
        		underlayColor="#009ef2"
          	style={styles.buttonStyle}
        		onPress={() => Router.goTo(this.props.navigation, "ProjectStack", "ProjectUpdateCreate", {"project": this.props.project})}
        	>
        		<Icon
      			  name="plus"
      			  type="entypo"
      			  size={30}
      			  color="#FFF"
      			/>
        	</TouchableHighlight>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
	buttonStyle: {
		height: 70,
		width: 70,
		borderRadius: 100,
		backgroundColor: '#00a6ff',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 5,
		right: 15
	},

	container: {
		flex: 1
	},

	titleStyle: {
		fontSize: 24,
		color: '#232f34',
	},

	contentStyle: {
		fontSize: 16,
		color: '#4a6572'
	},

	dateStyle: {
		fontSize: 12,
		color: '#4a6572'
	},

	box: {
		marginVertical: 5,
		marginHorizontal: 10,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 10,
		elevation: 1
	},

	boxTitle: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		paddingLeft: '5%'
	},

	boxContent: {
		paddingLeft: '2.5%',
		paddingBottom: 10,
		backgroundColor: '#dee5e8',
		marginHorizontal: '2.5%',
		marginBottom: '2.5%',
		borderRadius: 5
	},

	boxDate: {
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		paddingLeft: '5%',
	},

	separator: {
    height: 1,
    backgroundColor: "#b5babf",
    marginTop: 15,
    marginBottom: 5,
    width: "80%",
    alignSelf: "center"
  },
})
