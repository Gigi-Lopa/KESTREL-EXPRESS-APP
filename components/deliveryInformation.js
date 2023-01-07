import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/main'

const DeliveryInformation = (props) => {
  return (
    <View style = {styles.deliverInfor}>
    <View style = {[styles.row, styles.mTop25]}>
        <View style = {[styles.w50, styles.mLeft15]}>
            <Text
                style = {[
                    styles.h5,
                    styles.grayText
                ]}
            >
                {props.fromDate}
            </Text>
            <Text 
                style = {[
                    styles.h4,
                    styles.textBold
                ]}>
                {props.fromTime}
            </Text>
            <Text
            style = {[
                styles.h5,
                styles.primaryText
            ]}>
                Estimated
            </Text>
        </View>
        <View style= {[styles.w50, styles.mLeft15]}>
            <Text
            style = {[
                styles.h5,
                styles.grayText
            ]}>
                From
            </Text>
            <Text  
                style = {[
                    styles.h4,
                    styles.textBold
                ]}>
                {props.from}
            </Text>
        </View>
    </View>
    <View style = {[styles.row, styles.mTop15]}>
        <View style = {[styles.w50, styles.mLeft15]}>
            <Text
                style = {[
                    styles.h5,
                    styles.grayText
                ]}
            >
               {props.arrivalDate}
            </Text>
            <Text 
                style = {[
                    styles.h4,
                    styles.textBold
                ]}>
                {props.arrivalTime}
            </Text>
           
        </View>
        <View style = {[styles.w50, styles.mLeft15]}>
            <Text
            style = {[
                styles.h5,
                styles.grayText
            ]}>
                Destination
            </Text>
            <Text  
                style = {[
                    styles.h4,
                    styles.textBold
                ]}>
                {props.destination}
            </Text>
        </View>
    </View>

</View>
  )
}

export default DeliveryInformation