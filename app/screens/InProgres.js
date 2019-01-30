import React from "react";
import {
	SafeAreaView,
	View, 
	Text, 
	StyleSheet
} from "react-native";
import { Toolbar } from "react-native-material-ui";

export default class InProgres extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
  	return (
  		<SafeAreaView style={styles.rootContainer}>
  			<Toolbar
          style={{ container: { backgroundColor: "#00a6ff", elevation: 0 } }}
          leftElement={"menu"}
          onLeftElementPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
  			<View style={styles.textContainer}>
  				<Text style={styles.textStyle}>Er wordt nog aan deze pagina gewerkt</Text>
  			</View>
  		</SafeAreaView>
  	)
  }
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
	},

	textContainer: {
		alignItems: 'center',
		marginTop: '50%'
	},

	textStyle: {
		fontSize: 16,
		color: '#232f34'
	}
})