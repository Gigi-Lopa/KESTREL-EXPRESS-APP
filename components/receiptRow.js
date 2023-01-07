import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/main'

export default function ReceiptRow(props) {
  return (
    <View style = {[styles.row, styles.mBot15]}>
        <View style = {styles.w60}>
            <Text style = {[
            styles.h5
            ]}>
            {props.label}
            </Text>
        </View>
        <View style = {[
            styles.w40
        ]}>
           {
            props.children
           }
        </View>
    </View>
  )
}