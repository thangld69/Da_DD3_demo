import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import firebase from '../firebase/firebase';
import screen from '../assets/adaptive-icon.png';

export default class SplashScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'Màn hình chính' : 'Đăng nhập');
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fffde7' }}>
        <Image
          style={{
            marginTop: 30,
            width: 200,
            height: 200,
            alignSelf: 'center',
            borderRadius: 100,
          }}
          source={screen}
        />

        <Text
          style={{
            color: 'black',
            fontSize: 30,
            textAlign: 'center',
            margin: 20,
          }}>
          Quản lý bán xe
        </Text>

        <ActivityIndicator
          style={{ margin: 20 }}
          size="large"
          color="#0000ff"
        />
      </View>
    );
  }
}
