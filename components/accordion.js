import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Accordion = (props) => {
  return (
    <TouchableOpacity style = {[styles.row, styles.spaceItems]} onPress = {props.onClick}>
        <Text style = {[
            styles.primaryText,
            styles.h4,
            styles.mBot15
        ]}>{props.label}</Text>
        <FontAwesome5
            name= {props.chevronName}
            size={20}
            style = {styles.primaryText}
        />
    </TouchableOpacity>
  )
}

export default Accordion