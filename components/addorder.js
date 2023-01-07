import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function Addorder(props) {
  return (
    <View style = {[styles.addorder, styles.mTop15]}>

            <View style = {[styles.row , { width : '100%'}, styles.spaceItems, styles.mBot15]}>
                <TouchableOpacity style = {[styles.option,  styles.w40, styles.centerItem]} onPress = {props.onNavToGetQoute}>
                    <View style = {[{
                        paddingTop: 10,
                        paddingLeft :10
                    }]}>
                        <View>
                            <FontAwesome5
                                name = 'box-open'
                                size = {20}
                                style ={[
                                    styles.primaryText,
                                    {
                                        marginBottom: 5
                                    },
                                    styles.textCenter
                                ]}
                            />
                            <Text style = {[styles.primaryText, styles.textBold, styles.textCenter]}>Get a Quote</Text>
                                
                        </View>
                       
                   </View>
                </TouchableOpacity> 
                <TouchableOpacity style = {[styles.option,  styles.w40,styles.centerItem]} onPress = {props.navToAddJob}>
                    <View style = {[{
                        paddingTop: 10,
                        paddingLeft :10
                    }]}>
                        <View>
                            <FontAwesome5
                                name = 'shipping-fast'
                                size = {20}
                                style ={[
                                    styles.primaryText,
                                    {
                                        marginBottom: 5
                                    }
                                ]}
                            />
                            <Text style = {[styles.primaryText, styles.textBold]}>Book a Job</Text>
                                
                        </View>
                       
                   </View>
                </TouchableOpacity> 
                
            </View>
       
    </View>
  )
}