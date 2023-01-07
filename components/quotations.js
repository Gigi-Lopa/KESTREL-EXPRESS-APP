import {Text, FlatList, RefreshControl, TouchableOpacity ,ActivityIndicator} from 'react-native'
import React from 'react'
import styles from '../styles/main'
import Quotation from './quotation'

export default function Quotations({
  results,
  loadMore,
  refreshing,
  onRefresh,
  startLoading,
  err, 
  loadingMore
  
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
            <Quotation item={item}/>
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