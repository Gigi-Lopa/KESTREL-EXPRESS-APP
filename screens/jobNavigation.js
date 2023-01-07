import { View, Text, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../styles/main'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from '@react-navigation/native'

let { height, width } = Dimensions.get("screen")

// NAVBAR FOR THE JOBDETAILS SCREEN
const JobNavigation = (props) => {
    let navigation = useNavigation()
    let goback = ()=>{
        navigation.goBack()
    }
  return (
    <View style ={[styles.productNav, styles.row, styles.mTop25]}>
        <TouchableOpacity style = {styles.w20} onPress ={goback}>
            <EvilIcons
                name = {'chevron-left'}
                style = {[
                    {
                        marginTop: 5
                    },
                    styles.h1,
                    styles.grayText
                ]}
            />
        </TouchableOpacity>
        <View style = {[styles.w80]}>
            <Text style = {[
                styles.h3,
                {
                marginLeft :  (width * 0.8) *0.2
                }  
            ]}>{props.label}</Text>
        </View>
    </View>
  )
}

export default JobNavigation