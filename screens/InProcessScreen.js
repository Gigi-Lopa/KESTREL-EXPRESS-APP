
import { View, Text, TouchableOpacity, ScrollView,Dimensions, Image } from 'react-native'
import React, {useState}from 'react'
import styles from '../styles/main'
import JobNavigation from './jobNavigation';


let process = require('../assets/process.jpg')

const InProcessScreen = ({route, navigation}, props) => {
    let onClick =()=>{
        navigation.navigate('Cart',{
            id: route.params.jobID,
            receiptNumber : route.params.receipt
        })
    }


  return (
    <View style ={styles.Screen}>
        <View  style  = {styles.container}>
            <JobNavigation label ={route.params.receipt}/>
            <View style ={[
                styles.h80,
                styles.spaceItems
            ]}>
                <View style = {[styles.centerItem, styles.mTop25]}>
                    <Image source={process} style = {styles.processImage}/>
                    <Text
                        style ={[
                            styles.h4,
                            styles.primaryText,
                            styles.mTop15
                        ]}
                    >Cargo in Process</Text>
                </View>
                <View>
                <TouchableOpacity   
                    style ={[
                        styles.btn,
                        
                        styles.marginVertical,
                        styles.primary_color
                        ]} 
                        onPress = {onClick}>
                        <Text style = {[styles.textCenter, styles.tertiaryText]}>
                            See Cart
                        </Text>     
                </TouchableOpacity>
                </View>

            </View>
        </View>

    </View>
  )
}

export default InProcessScreen