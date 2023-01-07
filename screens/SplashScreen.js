import { Image, Text, View } from 'react-native'
import React from 'react'
import styles from '../styles/main'


function SplashScreen () {
    return (
        <View style = {styles.Screen}>
         <Image source={require('../assets/splash.png')}>

         </Image>
        </View>
   
    )

}

export default SplashScreen