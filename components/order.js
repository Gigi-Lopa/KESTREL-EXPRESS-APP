import { 
    View,
    Text,
    TouchableOpacity

} from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from '../styles/main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useRef } from 'react'
import Status from './status'
import STATUS from '../screens/statuses'

let Order = ({item, onClick}) => {

  let [iconName, setIconName] = useState('')
  let [iconBack, setIconBack] =  useState('red_bg')
  let date = item.date.replace('T', '   ').replace('Z', ' ')
  useEffect(()=>{
    if(item.transportationMode === 'Sea'){
      setIconName('ship')
    }
    else if(item.transportationMode === 'Road'){
      setIconName('shipping-fast')
    }
    else if(item.transportationMode === 'Rail'){
      setIconName('train')
    }
    else{
      setIconName('plane')
    }
  },[])

  return (
    <TouchableOpacity style={[
      styles.row, 
      {
        width  : '100%'
      } ,
      styles.mBot25
    ]} 
      onPress = {()=>{
        onClick(item.jobId, item.status,item.receipt )
      }}
    >
        <View style = {[styles.icons, styles.centerItem]}>
            <FontAwesome5
              name = {iconName}
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
            ]}>{STATUS[item.status]}</Text>
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

export default Order