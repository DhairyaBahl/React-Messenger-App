import React, { Component } from 'react'
import { Button, Image, Text, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

export class OnboardingScreen extends Component {
    render() {
        return (
            <Onboarding
            pages={[
              {
                backgroundColor: '#a6e4d0',
                image: <Image source={require('/home/bhubesh/onboadingreactnative/assets/onboarding-img1.png')} />,
                title: 'Onboarding 1',
                subtitle: 'Done with React Native Onboarding Swiper',
              },
              {
                backgroundColor: '#fdeb93',
                image: <Image source={require('/home/bhubesh/onboadingreactnative/assets/onboarding-img2.png')} />,
                title: 'Onboarding 2',
                subtitle: 'Done with React Native Onboarding Swiper',
              },
              {
                backgroundColor: '#e9bcbe',
                image: <Image source={require('/home/bhubesh/onboadingreactnative/assets/onboarding-img3.png')} />,
                title: 'Onboarding 3',
                subtitle: 'Done with React Native Onboarding Swiper',
              },
              
            ]}
          />
        )
    }
}

export default OnboardingScreen

// const styles = StyleSheet.create({
//     container : {
//         flex : 1,
//         alignItems : 'center',
//         justifyContent : 'center'
//     }
// })
