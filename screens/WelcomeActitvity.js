import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
let KE_LOGO = require("../assets/KE_logo.jpg")
import styles from "../styles/main"

export default function WelcomeActitvity({navigation}) {
    let navToLogin =  async()=>{
        navigation.navigate("Log In", {
            navigation : navigation
        })
    }
    let navTocreateAccount = () =>{
        navigation.navigate("Sign Up")
    }

    return (
    <View style={styles.Screen}>
        <View style = {[styles.short_billboard, styles.mTop15]}>
            <Image source={KE_LOGO} style = {[, styles.KE_LOGO, ]}/>

        </View>
        <View style = {[styles.mTop25]}>
           
            <View style = {styles.centerItem }>
                <Text style = {[
                    styles.h3,
                    styles.primaryText,
                    styles.textBold
                ]}>Get Started</Text>
            </View>
            <View style ={[styles.container_pad]}>
                <TouchableOpacity style = {[styles.primary_color, styles.btn, styles.primaryBtn]} onPress = {navTocreateAccount}>
                    <Text style= {[
                        styles.textCenter,
                        styles.tertiaryText,
                        styles.textBold]}
                    >
                        Create an account    
                    </Text>
                </TouchableOpacity>
            </View>
            <View style = {[styles.dope_or, styles.row, styles.centerItem, styles.wel_row]}>
                <FontAwesome5
                    name = 'chevron-circle-left'
                    size  = {15}
                    style = {[styles.primaryText,{
                }]}/>
                <Text style = {[styles.h3, styles.primaryText, styles.mLeft15, styles.mRight15]}>Or</Text>
                <FontAwesome5
                    name = 'chevron-circle-right'
                    size  = {15}
                    style = {[styles.primaryText,{
                    }]}/>
            </View>
            <View style = {[styles.container_pad, styles.row, styles.centerItem]}>
                <Text style= {[
                        styles.h5,
                        styles.grayText
                    ]}>Already have an Account?  </Text>
                <TouchableOpacity onPress = {navToLogin}>
                    <Text style= {[
                        styles.h5,
                        styles.primaryText,

                    ]}>Log In</Text>
                </TouchableOpacity>
            </View>
    
        </View>
    </View>

    )
}
