import { View, Text, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import styles from '../styles/main'
import CartItem from './cartItem'

const ShowCart = (props) => {

  return (
    <View style = {[
        styles.Screen,
        styles.modular,
        styles.centerItem
        ]}>
        <View style = {[
            styles.receipt,
            styles.container_pad
            ]}>
            <View style = {[styles.cartHeader, styles.row]}>
                <Text style = {[
                    styles.w80,
                    styles.h4,
                    styles.primaryText,
                    styles.textBold,
                ]}>
                    Cart
                </Text>
                <Text style = {[
                    styles.h4,
                    styles.primaryText,
                    styles.w20,
                    styles.textCenter,
                    ]}>
                    {
                        props.cart
                    }
                </Text>
            </View>
            <ScrollView>
                {
                    props.jobs_.map(job=>{
                        return(
                            <CartItem 
                            quantity = {job.quantity}
                            productName= {job.productName}
                            cartImage = {job.image}
                            id = {job.id}
                            deleteItem = {props.deleteItem}
                        />
                        )
                     
                    })
                }

            </ScrollView>
            <TouchableOpacity 
             
                style ={[
                    styles.btn,
                    styles.marginVertical,
                    styles.primary_color
                    ]} 
                    onPress = {props.handleCloseModel}>
                <Text style = {[styles.textCenter, styles.tertiaryText]}>
                    Close Cart
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ShowCart