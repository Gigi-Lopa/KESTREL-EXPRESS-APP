import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/main'

const NetworkError = (props) => {
  return (
    <View>
        <View>
            <Text style = {[
                    styles.h4,
                    styles.textBold,
                    styles.primaryText
                ]}>KE isn't loading right now</Text>
            <Text style = {styles.grayText}>Looks like you lost your connection. Please check it and try again.</Text>
            <TouchableOpacity style = {[styles.tryAgainPill, styles.mTop25]} onPress = {props.onPress}>
                <Text style = {[styles.h5, styles.textBold, styles.primaryText]}>Try Again</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default NetworkError