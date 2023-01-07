import { 
    View,
    Text,
    TouchableOpacity

} from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from '../styles/main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

let Payment = ({item, onClick}) => {
  let date = item.date.replace('T', '   ').replace('Z', ' ')
  return (
    <View style={[
      styles.row, 
      {
        width  : '100%'
      } ,
      styles.mBot25
    ]} 
     
    >
        <View style = {[styles.icons, styles.centerItem]}>
            <FontAwesome
              name = {'dollar'}
              size  = {15}
              style = {[styles.primaryText, styles.icon]}
            />
        </View>
        <View style = {[
          styles.row,
          styles.spaceItems,
          styles.order_infor
        ]}>
          <View>
            <Text style = {[styles.h4, styles.textBold]}>{item.receipt}</Text>
            <Text style ={[
              styles.h6,
              styles.grayText,
              styles.textBold
            ]}>{
              date
            }</Text>
            <Text style ={[
              styles.h6,
              styles.grayText,
              styles.textBold
            ]}>{
              item.pay_pal
            }</Text>
            <Text style ={[
              styles.h6,
              styles.grayText,
              styles.textBold
            ]}>{'AMOUNT: '+ item.amount}</Text>
          </View>
          <FontAwesome5
            name = 'chevron-circle-right'
            size  = {15}
            style = {[styles.primaryText,{
              marginTop :  13
            }]}
          />
        </View> 
    </View>
  )
}

export default Payment