import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Onboarding from './components/Onboarding';

export default function App() {

  // creating a usesState 

  const [showOnboard, setShowOnboard] = useState(true)

  const handleOnboardFinish = () => {
    setShowOnboard(false)
  }
  return (
    <>
    {
      showOnboard && 
      <Onboarding handleDone = {handleOnboardFinish}></Onboarding>
    }
    {
      !showOnboard && <Home></Home> // home page is the main page
    }

    </>
  );
}

// Two


// import React from 'react'
// import { View, Text } from 'react-native'

// // importing createStacknavigator
// import { createStackNavigator } from '@react-navigation/stack';
// import  { OnboardingScreen } from './components/OnboardingScreen';
// import Home from './components/Home';
// import { NavigationContainer } from '@react-navigation/native';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>

//       <Stack.Navigator headerMode = 'none'>
//           <Stack.Screen
//           name = 'Onboarding'
//           component = {OnboardingScreen} 
//           >
//           </Stack.Screen>
//           <Stack.Screen
//           name = 'Home'
//           component = {Home}
//           >
//           </Stack.Screen>
          
//       </Stack.Navigator>   
//     </NavigationContainer>
//   )
// }

// export default App
