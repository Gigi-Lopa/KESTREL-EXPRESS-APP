import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/main'

const EmptyOrderStack = (props) => {
  return (
    <View>
        <View>
            <Text style = {[
                    styles.h4,
                    styles.textBold,
                    styles.primaryText
                ]}>{props.header}</Text>
            
            <View>
                <Text style = {styles.grayText}>{props.messageOne}</Text>
                <View style = {styles.row}>
                    <TouchableOpacity onPress={props.onPressRefresh}><Text style = {{color : '#3f8cff'}}>Refresh</Text></TouchableOpacity>
                    <Text style = {styles.grayText}>{props.messageTwo}</Text>
                </View>
            </View>
            <TouchableOpacity style = {[styles.tryAgainPill, styles.mTop25]} onPress = {props.pillAction}>
                <Text style = {[styles.h5, styles.textBold, styles.primaryText]}>{props.pillLabel}</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default EmptyOrderStack