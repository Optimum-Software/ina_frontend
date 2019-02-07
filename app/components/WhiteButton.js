
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';


export default class WhiteButton extends React.PureComponent {
  render() {
    const { onPress, label } = this.props;
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 25
  },
  text: {
    padding: "5%",
    fontSize: 16,
    color: "#00a6ff",
    textAlign: "center"
  },
});
