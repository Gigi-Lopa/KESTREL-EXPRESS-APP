import { View, Text, TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import styles from '../styles/main'

const SearchResult = (props) => {
  return (
    <TouchableOpacity style = {[styles.row, styles.mTop15]} onPress = {
        ()=>{
            props.goTo(props.id, props.status, props.receipt)
        }
    }>
    <View style = {[styles.mRight15, {
        paddingTop : 5
    } ]}>
        <MaterialCommunityIcons
            name = {'clock-outline'}
            size = {20}
            style = {styles.primaryText}
        />
    </View>
    <View style = {styles.w60}>
        <Text style = {[styles.h4, styles.textBold]}>{props.receipt}</Text>
    </View>
    <View style = {[styles.w40, styles.centerItem]}>
        <MaterialCommunityIcons
            name = {'arrow-top-right'}
            size = {20}
            style = {styles.primaryText}
        />
    </View>
    
</TouchableOpacity>
  )
}

export default SearchResult