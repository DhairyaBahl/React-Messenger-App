import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, FlatList, Dimensions, Header, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { cloneDeep, get } from 'lodash';
import { getGenericDataFetch } from 'services/GenericDataFetch.service';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { homeScreenView as HomeScreenView } from 'views/homeScreenView';

const Stack = createStackNavigator();

const { height, width } = Dimensions.get( 'screen' );
export class WallpaperAppContainer extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            images: [],
            isLoading: true
        };
        this.renderItem = this.renderItem.bind( this );
    }

    componentDidMount() {
        const url = 'https://api.unsplash.com/photos/random?count=50&client_id=896979fdb70f80865638d7a4648bf9ce309675335318933eab2bf990af42e295';
        axios.get( url ).then( ( response ) => {
            console.log( 'Network Request Successful', response.data.results );
            this.setState( {
                images: response.data,
                isLoading: false
            } );
        } ).catch( ( error ) => {
            console.log( error );
        } ).finally( () => {
            console.log( 'Network request Completed' );
        } );
    }

    renderItem( image ) {
        console.log( 'Inside renderitem' );
        return (
            <View style={{ height, width }}>
                    <Image
                        style = { { flex: 1, height: null, width: null}}
                        source = {{ uri: image.urls.regular }}
                    />
            </View>
        );
      }

    render() {
        console.log( 'Images array is ', this.state.images );
        console.log( this.state.isLoading );
        return(
            this.state.isLoading ?
            (
                <View style = {styles.container}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            ):
            <HomeScreenView
                { ...this.props }
                images = { this.state.images }
                isLoading = { this.state.isLoading }
            />
        );
    }

}
const styles = StyleSheet.create( {
    container: {
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
} );
