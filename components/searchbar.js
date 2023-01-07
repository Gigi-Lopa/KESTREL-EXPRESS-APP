import { View, Text,TextInput } from 'react-native'
import React from 'react'
import styles from '../styles/main'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Searchbar(props) {
  return (
    <View style = {[styles.searchbar, styles.primary_color, styles.mTop15]}>
        <View style = {styles.container}>
            <Text style = {[styles.h3,styles.tertiaryText, styles.textBold]}>
                Track your package!
            </Text>
            <Text style = {[styles.h5, styles.tertiaryText]}>
                Enter receipt number given
            </Text>
            <View style = {[styles.row, styles.mTop15, styles.bar, styles.secondaryBtn]}>
                <View style = {[
                    {
                        width :'10%',
                       
                    },
                    styles.centerItem
                ]}>
                    <MaterialCommunityIcons
                        name ='magnify'
                        size = {25}
                        style = {styles.primaryText}
                    />
                </View>
                <View style = {
                    {
                        width :'90%'
                    }
                }>
                    <TextInput
                        placeholder = {'Package receipt'}
                        style = {[styles.input, {
                            paddingLeft :7.5
                        }]}
                        onPressIn = {props.onTap}

                    />
                </View>                
            </View>
        </View> 
    </View>
  )
}