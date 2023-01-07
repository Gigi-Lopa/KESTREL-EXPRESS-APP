import React from 'react'
import {
    View,
    Text,
    TextInput
}
from "react-native"
import styles from '../styles/main'

export default function TextField(props) {
    props.multiline = false
  return (
    <View>
        <Text style = {[styles.h5, styles.primaryText, styles.textBold]}>{props.label}</Text>
        <View style ={[
            styles.textField,
            styles.row,
            props.input_err  ? (styles.textField_err): (null),
            props.marginNone ? (styles.mBot25) : ({}) 
            ]}>
            <View>
                {
                    props.children
                }
            </View>
            <TextInput 
                style = {[styles.input]}
                placeholder = {props.placeholder}
                value ={props.value}
                onChangeText = {props.onTextChange}
                onBlur = {props.onBlur}
                secureTextEntry = {props.secureTextEntry ? true : false}
                multiline = {props.multiline}
            />
        </View>

    </View>
    
    )
}
