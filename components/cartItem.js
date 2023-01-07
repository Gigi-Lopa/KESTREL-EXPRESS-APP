import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../styles/main'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const CartItem = (props) => {
   
  return (
    <View style ={[styles.cartItem, styles.row, styles.mTop15]}>
        <View style={styles.w20}>
            <Image source = {{uri : props.cartImage}} style={styles.cartImage}/>
        </View>
        <View style={[styles.w60, styles.mLeft15]}>
            <Text style={[
                styles.h5,
                styles.primaryText,
                styles.textBold,
            ]}>
            {props.productName}
            </Text>
            <Text style = {[
                styles.h5,
                styles.secondaryText,
            ]}>
                {'Quantity  ' + props.quantity}
            </Text>
        </View>
        <TouchableOpacity style={[styles.w20, styles.centerItem]} onPress = {()=>{
            props.deleteItem(props.id)
        }}>
            <MaterialCommunityIcons
                name= {'cart-remove'}
                size = {20}
            />
        </TouchableOpacity>
    </View>
  )
}

export default CartItem