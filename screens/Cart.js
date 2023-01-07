import { View, Text, FlatList, Alert } from 'react-native'
import React from 'react'

import styles from '../styles/main'
import { useEffect } from 'react'
import URLS from '../components/URLS'
import JobNavigation from './jobNavigation'
import { useState } from 'react'
import Alert_ from '../components/alert'
import Fontisto from 'react-native-vector-icons/Fontisto'
import CartProduct from '../components/cartProduct'

export default function Cart({route}) {
    let [items, setItems] = useState([])
    let [error, setError] = useState(false)
    
    useEffect(()=>{
        fetch(URLS.GET_CART_ITEMS+route.params.id)
        .then((res)=>res.json())
        .then(res=>{
            if(!res.error){
                setItems(res.results)
            }
            else{
                setError(true)
            }
        })
    },[])
  return (
    <View style = {styles.Screen}>
        <View style = {styles.container}>
            <JobNavigation label = {route.params.receiptNumber}/>
            {
                items != 0 ? (
                    <FlatList
                    style= {styles.mTop25}
                    data = {items}
                    renderItem ={({item})=>{
                    return (
                        <CartProduct 
                        name = {item.name}
                        quantity = {item.quantity}
                        image = {item.image}
                        id = {item.id}
                        receiptNumber = {route.params.receiptNumber}
                        />
                    )
                    }}
                    keyExtractor={(item)=>item.id}
                   
                    />
                ):(<></>)
            }
            {
                error ? (
                    <Alert_ status= {'An error occured. Try again'}>
                        <Fontisto
                            style = {[
                                styles.h5, 
                            ]}
                            color = {'white'}
                            name = 'broken-link'
                        />
                    </Alert_> 
                ):(<></>)
            }
        </View>
    </View>
  )
}