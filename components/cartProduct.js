import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../styles/main'
import Feather from 'react-native-vector-icons/Feather'
import URLS from './URLS'
import { useNavigation } from '@react-navigation/native'


export default function CartProduct(props) {
  let navigation = useNavigation()
  function navToMoreInformation (id){
    navigation.navigate('Product Details', {
      id :id,
      receiptNumber : props.receiptNumber
    })
  }

  return (
    <TouchableOpacity style = {[
        styles.row,
        styles.mTop15,
        styles.mBot15
    ]} onPress = {()=>{navToMoreInformation(props.id)}}>
    <View style = {styles.w40}>
        <Image source={{uri : props.image}} style = {styles.cartProductImage}/>

    </View>
    <View style = {[styles.w60, styles.mLeft15, styles.spaceItems]}>
        <View>
          <Text style = {[
            styles.textBold,
            styles.h5
          ]}>{props.name}</Text>
          <View style ={[styles.row]}>
              <Text style = {[
                styles.h5,
                styles.textBold
              ]}>Qty :</Text>
              <Text>{props.quantity}</Text>
          </View>
        </View>
        
    </View>
   
    </TouchableOpacity>
  )
}