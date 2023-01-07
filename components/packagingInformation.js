import { View, Text } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../styles/main'

const PackagingInformation = (props) => {

    
    let buttonTextStyle_= {
        position : 'absolute',
        color : '#8b0000',
        fontSize  : 15
    }
  return (
    <View>
     <View style = {[styles.row, styles.mBot25]}>
        <View style = {styles.w60}>
            <Text style = {[
                styles.secondaryText,
                styles.h5,
                styles.textBold,{
                    paddingTop : 15
                }
            ]}>{props.label}</Text>
        </View>
        <View style = {styles.w40}>
            <SelectDropdown
                data={props.data}
                buttonStyle = {styles.dropDownBtn}
                defaultButtonText = {props.default}
                buttonTextStyle = {buttonTextStyle_}
                onSelect= {(selectedItem, index)=>{
                props.onSetSelectedItem(props.data[index])
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
            />
        </View>
    </View>

    </View>
  )
}

export default PackagingInformation