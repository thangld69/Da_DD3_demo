import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight, Image } from 'react-native';

import firebase from '../firebase/firebase';
//import logo from '../assets/logo.jpg';
export default class Setting extends Component {
  _onHandleSetting(value) {
    switch (value) {
      case 'Tìm hàng':
        this.props.navigation.navigate('Tìm hàng');
        break;
      case 'Tìm nhân viên':
        this.props.navigation.navigate('Tìm nhân viên');
        break;
        case 'Thống kê':
        this.props.navigation.navigate('Thống kê');
        break;
      case 'Đăng xuất':
        firebase.auth().signOut();
        break;
    }
  }
  render() {
    const items = [
      {
        label: 'Tìm hàng',
      },
      {
        label: 'Tìm nhân viên',
      },
      {
        label: 'Thống kê',
      },
      {
        label: 'Đăng xuất',
      },
    ];
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1, margin: 1 }}
          data={items}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="red"
              style={{
                borderWidth: 1,
                padding: 16,
                margin: 10,
                borderRadius: 40,
                backgroundColor: 'black',
              }}
              onPress={() => {
                this._onHandleSetting(item.label);
              }}>
              <Text style={{ fontSize: 20, color: 'white' }}>{item.label}</Text>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}
