import { View, Text} from 'react-native'
import React from 'react'
import styles from '../styles/main'

const ErrorPage = (props) => {
  return (
    <View style = {[styles.centerItem]}>
      <View>
        <Text style = {[
                styles.h4,
                styles.textBold,
                styles.primaryText
            ]}>KE isn't loading right now</Text>
        <Text style = {styles.grayText}>Looks like you lost your connection. Please check it and try again.</Text>
      
    </View>
  </View>
  )
}

export default ErrorPage