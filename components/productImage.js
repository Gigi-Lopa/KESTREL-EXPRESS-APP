import { View, Text, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import React from 'react'
import styles from '../styles/main'

export default function ProductImage(props) {
  return (
    <View>
        <Image
            source = {{uri: props.imageURI}}
            style ={styles.image}
        />
        <TouchableOpacity style = {styles.rePick} onPress = {props.rePick}>
            <FontAwesome5
                name ='redo'
                style = {styles.tertiaryText}
            />
        </TouchableOpacity>
    </View>
  )
}