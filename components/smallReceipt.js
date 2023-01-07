import { View, Text,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import styles from '../styles/main'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ReceiptRow from './receiptRow'
import Status from './status'
import { useNavigation } from '@react-navigation/native'

export default function SmallReceipt(props) {
  
  let navigation =  useNavigation()
  
  let bookAgain = ()=>{
    navigation.popToTop()
  }

  return (
    <View style = {[
      styles.Screen,
      styles.modular,
      styles.centerItem
      ]}>
        <View style = {
          [
           
            styles.receipt
          ]
        }>
        <View style = {[{
          padding : 25
        }, 
        styles.success,
        styles.row,
        styles.centerItem]}>
            <MaterialCommunityIcons
              style = {[
                styles.h5, 
              ]}
              color = {'white'}
              name  ={'thumb-up'}
            />
            <Text style = {[styles.h5, styles.textCenter, styles.textBold, styles.tertiaryText]}>{' ' +'Submission Successful'}</Text>
        </View>
          <View style = {[styles.container_pad, styles.spaceItems,{
            height:  '88%'
          }]}>
            <ScrollView>
              <View>
                { props.response.productNames != undefined 
                ?(
                  props.response.productNames.map((name)=>{
                    return (
                      <Text style = {[
                        styles.textBold,
                        styles.primaryText,
                        styles.h4,
                        styles.mBot15
                      ]}>
                        {name}
                      </Text>
                    )
                  })
                ):(
                  <Text style = {[
                    styles.textBold,
                    styles.primaryText,
                    styles.h5
                  ]}>
                    NuN
                  </Text>
                )
                  
              }
              </View>
              <ReceiptRow label ={'Receipt ID : '}>
                  <Text style = {[
                    styles.textBold,
                    styles.h5S
                    ]}>
                    {props.response.receipt}
                  </Text>
              </ReceiptRow>
              <ReceiptRow label ={'Number of Products : '}>
                  <Text style = {[
                    styles.textBold,
                    styles.h5S
                    ]}>
                    {props.response.quantity}
                  </Text>
              </ReceiptRow>
              <ReceiptRow label ={'Status : '}>
                  <Text style = {[
                    styles.textBold,
                    styles.h5S
                    ]}>
                    <Status status  = {'PENDING'} COLOR = {'yl'}/>
                  </Text>
              </ReceiptRow>
              <ReceiptRow label ={'Cost per product : '}>
                  <Text style = {[
                    styles.textBold,
                    styles.h5S
                    ]}>
                    <Status status  = {'PENDING'} COLOR = {'yl'}/>
                  </Text>
              </ReceiptRow>
              <ReceiptRow label ={'Total Cost : '}>
                  <Text style = {[
                    styles.textBold,
                    styles.h5S
                    ]}>
                    <Status status  = {'PENDING'} COLOR = {'yl'}/>
                  </Text>
              </ReceiptRow>
            </ScrollView>
            <View style = {[styles.row, styles.mTop25]}>
                <TouchableOpacity style ={[styles.rowBtn, styles.primary_color, styles.marginVertical, {
                  width: '100%'
                }]} onPress= {bookAgain}>
                <Text style = {[styles.textCenter, styles.tertiaryText]}>
                    Book again
                </Text>
                </TouchableOpacity>
          
            </View>
            
          </View>
         
        </View>
    </View>
  )
}