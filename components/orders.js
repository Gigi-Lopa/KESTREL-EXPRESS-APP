import {Text, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useState, useEffect}from 'react'
import styles from '../styles/main'
import Order from './order'
import { useNavigation } from '@react-navigation/native'

export default function Orders({
  results,
  loadMore,
  refreshing,
  onRefresh,
  startLoading,
  err, 
  USER_ZAG,
  loadingMore
}) {

  let navigation = useNavigation()
  let navigateToJob = (id, status, receiptNumber)=>{
      console.log(id, status)
      if(status === 'PENDING'){
        navigation.navigate('In Process', {
          jobID : id,
          receipt  : receiptNumber
        })
      }
      else if (status != undefined && status != 'PENDING'){
        navigation.navigate('Job Details', {
          jobID : id,
          USER_ZAG: USER_ZAG
        })
      }
  }
      return (
        results.length != 0 && 
        startLoading === false
         && !err ?(
        <FlatList
          style = {styles.orders}
          data = {results}
          renderItem ={({item})=>{
          return (
            <Order item={item} onClick = {navigateToJob}/>
          )
          }}
          refreshControl =  { 
            <RefreshControl
              refreshing = {refreshing}
              onRefresh = {
                onRefresh
              }
            />

          }
          keyExtractor= {item=>item.jobId}
          ListFooterComponent = {()=>{
          return (
            loadingMore ? (
              <ActivityIndicator  color = {'#8b0000'} size = {25}/>
            ) : (
              <TouchableOpacity onPress={loadMore} style = {{
                padding: 5,
              }}>
                <Text style = {[
                  styles.primaryText,
                  styles.h5,
                  styles.textBold,
                  styles.textCenter
                ]}>Load More</Text>
              </TouchableOpacity>
            )
            
          )
          }}
          
        />

         ):(null)
        
      )  

} 