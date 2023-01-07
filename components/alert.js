import React from "react"
import { View, Text} from "react-native"
import styles from "../styles/main"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
export default function Alert_(props){
    return (
        <View style = {[styles.alert, styles.mTop15,props.status_color==="GREEN"?(styles.success)  : (styles.danger), styles.row, styles.centerItem]}>
            {
                props.children
            }
            <Text style = {[styles.h5, styles.textCenter, styles.textBold, styles.tertiaryText]}>{' ' +props.status}</Text>
        </View>
    ) 
}