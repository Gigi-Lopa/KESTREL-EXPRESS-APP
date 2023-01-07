import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/main'

export default function Status(props) {
  return (
 
      <Text style = {[
        styles.status,
        styles.textBold,
        styles.h5
      ]}>
        {props.status}
      </Text>
  )
}