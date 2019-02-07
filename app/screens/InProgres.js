import React from "react";
import {
	SafeAreaView,
	View,
	Text,
	Image,
	StyleSheet
} from "react-native";
import { Toolbar } from "react-native-material-ui";
import construction from "../assets/images/construction.png";

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
				<View style={{flex: 2}}/>
				<Image
					source={construction}
					resizeMode="contain"
					style={{ width: "50%", flex: 2 }}
				/>
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
		flex: 1,
		justifyContent: 'center'
	},

	textStyle: {
		flex: 2,
		fontSize: 16,
		marginTop: '10%',
		color: '#232f34'
	}
})
