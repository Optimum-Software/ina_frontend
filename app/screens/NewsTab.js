import React, {Component}  from 'react';
import {
	Text, 
	View,
	ScrollView,
	TouchableHighlight,
	StyleSheet,
	FlatList
} from 'react-native';
import Router from "../helpers/Router";
import { Icon } from "react-native-elements";
import User from "../helpers/User";
import ProjectApi from "../helpers/ProjectApi";
import Moment from "moment";

const Entities = require("html-entities").AllHtmlEntities;
const html = new Entities();

export default class NewsTab extends Component{
	constructor(props) {
    super(props);
    this.state = {
    	admin: false,
    	project: null,
    	updateList: null,
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

  render(){
    return(
      <View style={styles.container}>
        	<FlatList
        	  data={this.state.updateList}
        	  onEndReached={() => this.handelEnd()}
        	  renderItem={({ item }) => {
        	    return (
        	    	<View style={styles.box} key={item.id}>
        	    		<View style={styles.boxTitle}>
        	    			<Text>{html.decode(item.title)}</Text>
        	    		</View>
        	    		<View style={styles.boxContent}>
        	    			<Text>{html.decode(item.content)}</Text>
        	    		</View>
        	    		<View style={styles.boxDate}>
        	    			{console.log(moment)}
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
		flex: 1,
	}, 

	box: {
		marginVertical: 5,
		marginHorizontal: 10,
	},

	boxTitle: {
		backgroundColor: 'blue',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 2
	},

	boxContent: {
		backgroundColor: 'green',	
	},

	boxDate: {
		backgroundColor: 'yellow',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		padding: 2
	}
})

