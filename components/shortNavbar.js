import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/main'

const ShortNavbar = (props) => {
  return (
    <View style = {[styles.navbar, styles.row, styles.mTop25]}>
        <View style= {styles.w60}>
           <Text style = {[
              styles.h4,
              styles.primaryText,
              styles.textBold,
              styles.textCenter
            ]}>{props.label}</Text>
        </View>
        <TouchableOpacity style = {[styles.w40, styles.row, styles.mLeft15, {
            paddingLeft : 60
          }]}
          onPress = {props.cartOnPress}>
            {
              props.children
            }
            <Text style = {[
              styles.h5,
              styles.primaryText,
              styles.textCenter,{
                paddingLeft: 7.5
              }
            ]}>
              {
                props.cart
              }
            </Text>
        </TouchableOpacity>
           
  
        
  </View>
  )
}

export default ShortNavbar