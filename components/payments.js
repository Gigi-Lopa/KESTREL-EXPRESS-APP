import {Text, FlatList, RefreshControl, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../styles/main'
import Payment from './payment'

export default function Payments({
  results,
  loadMore,
  refreshing,
  onRefresh,
  startLoading,
  err, 
  
}) {

      return (
        results.length != 0 && 
        startLoading === false
         && !err ?(
        <FlatList
          style = {styles.orders}
          data = {results}
          renderItem ={({item})=>{
          return (
            <Payment item={item}/>
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
          }}
          
        />

         ):(null)
        
      )  

} 