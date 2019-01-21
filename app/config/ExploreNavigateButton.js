import React, {Component} from 'react';
import {
	TouchableOpacity,
	View
} from "react-native";
import {  
	NavigationActions
} from "react-navigation"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Router from "../helpers/Router";

export default class ExploreNavigateButton extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<View
            	style={{
            	  alignItems: 'center',
                	justifyContent: 'center',
                	width: 60,
                	height: 60,
                	borderRadius: 30,
                	backgroundColor: '#48A2F8'
    			}}
          	>
      			<Icon
        		  name="heart"
        		  type="ionicon"
        		  size={28}
        		  color="white"
        		/>
          	</View>
        )
	}
}