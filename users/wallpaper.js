/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 * @format
 * @flow strict-local
 */

 import 'react-native-gesture-handler';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 import React, { Component } from 'react';
 import { Text, StyleSheet, View, Button } from 'react-native';
 import { AboutUsView } from 'views/AboutUsView';
 
 // import { DemoView } from './src/js/views/DemoView';
 import { DemoView } from 'views/DemoView';
 import { WallpaperAppContainer, HomeScreen } from 'components/containers/WallpaperAppContainer';
 import { FullScreenImageView } from 'views/FullScreenImageView';
 import { SearchWallpaper} from 'components/containers/SearchWallpaper';
 
 const Stack = createStackNavigator();
 const Tab = createMaterialBottomTabNavigator();
 
 export class WallpaperStackContainer extends Component {
     render() {
         return (
                 <Tab.Navigator initialRouteName="Home" >
                 <Tab.Screen
                     name="Home"
                     component={ WallpaperAppContainer }
 
                     // options={{headerShown: false}}
                     options={{
                           tabBarLabel: 'Home',
                           tabBarIcon: ( { color } ) => (
                             <MaterialCommunityIcons name="home" color={color} size={26} />
                           ),
                         }}
                 />
                 <Tab.Screen
                     name="Search"
                     component={ SearchWallpaper }
                     options={{
                       tabBarLabel: 'Search',
                       tabBarIcon: ( { color } ) => (
                         <MaterialCommunityIcons name="magnify" color={color} size={26} />
                         ),
                       }}
                 />
                 {/* <Tab.Screen name="Demo" component={ DemoView } /> */}
                 <Tab.Screen
                   name="About Us"
                   component={ AboutUsView }
                   options={{
                     tabBarLabel: 'About Us',
                     tabBarIcon: ( { color } ) => (
                       <MaterialCommunityIcons name="information-outline" color={color} size={26} />
                       ),
                     }}
                   />
                 </Tab.Navigator>
         );
     }
 }
 
 const styles = StyleSheet.create( {
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
 
 } );