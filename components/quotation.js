import { 
    View,
    Text,
    TouchableOpacity

} from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from '../styles/main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

let Quotation = ({item, onClick}) => {
    let navigation =   useNavigation()
  let date = item.date.replace('T', '   ').replace('Z', ' ')
  return (
    <TouchableOpacity style={[
      styles.row, 
      {
        width  : '100%'
      } ,
      styles.mBot25
    ]} 
     onPress = {()=>{
        navigation.navigate('Quotation Details',{
            quoteID : item.id
        })
     }}
    >
        <View style = {[styles.icons, styles.centerItem]}>
            <MaterialCommunityIcons
              name = {'comment-question'}
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
            ]}>{'Status: '+ item.status}</Text>
          </View>
          <FontAwesome5
            name = 'chevron-circle-right'
            size  = {15}
            style = {[styles.primaryText,{
              marginTop :  13
            }]}
          />
        </View> 
    </TouchableOpacity>
  )
}

export default Quotation