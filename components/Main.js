import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

import WatchBook from './WatchBook';
import Member from './WatchMember';
import Setting from './Setting';
import Borrowed from './WatchBorrowed';
const Tab = createBottomTabNavigator();
export default class navigation extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Book"
        activeColor="#f0edf6"
        inactiveColor="black  "
        barStyle={{ backgroundColor: '#694fad' }}>
        <Tab.Screen
          name="Hàng Hóa"
          component={WatchBook}
          options={{
            tabBarLabel: 'Hàng Hóa',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="book-open" size={20} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Nhân Viên"
          component={Member}
          options={{
            tabBarLabel: 'Nhân Viên',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={20} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Xuất Hàng"
          component={Borrowed}
          options={{
            tabBarLabel: 'Xuất Hàng',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="book-reader" size={20} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Công Cụ"
          component={Setting}
          options={{
            tabBarLabel: 'Công Cụ',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="cog" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
