import { Text, View, ScrollView, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import styles from '../styles/main'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TextField from '../components/textField'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import SearchResult from './searchResult'
import URLS from '../components/URLS'

function SearchScreen (props) {

    let navigation = useNavigation()
    let [search, setSearch] = useState('')
    let [typing, setTyping ] = useState(false)
    let [results, setResults] = useState([])

    let onCancel = ()=>{
        navigation.goBack()
    }
    let onLiveSearch = async(e)=>{
        setSearch(e)
        setTyping(true)
        await fetch(URLS.SEARCH_ORDER + search + '&&id=' + props.route.params.USER_ZAG)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setResults(res.results_)
            setTyping(false)
        })
    }
    let goTo = (id, status, receiptNumber)=>{
        if(status === 'PENDING'){
            navigation.navigate('In Process', {
              jobID : id,
              receipt  : receiptNumber
            })
          }
          else if (status != undefined && status != 'PENDING'){
            navigation.navigate('Job Details', {
              jobID : id
            })
          }
    }

    return (
      <View style = {[styles.Screen]}>
        <View style = {styles.container}>
            <View style = {[styles.row]}>
                <View style = {styles.w80}>
                    <TextField
                        placeholder ={'Search receipt'}
                        marginNone = {false}
                        value = {search}
                        onTextChange = {onLiveSearch}
                        secureTextEntry = {false}


                    >
                        <MaterialCommunityIcons
                            name = 'magnify'
                            size = {20}
                            style = {[styles.primaryText, {
                                paddingTop : 2.5
                            }]}
                        />
                    </TextField>
                </View>
                <View style  = {[styles.w20, styles.centerItem, styles.mTop15]}>
                    <Text style = {[
                        styles.h5,
                        styles.textBold,
                        styles.grayText,
                        {
                            paddingLeft :13,
                            paddingTop : 10
                        }
                        ]}
                        onPress = {onCancel}
                        >
                        Cancel                        
                    </Text>
                </View>
            </View>
            <View style = {[
                styles.body,    
                styles.search_history       
            ]}>
                <ScrollView>
                    {
                        typing ? (
                            <View style = {styles.mTop25}>
                                <ActivityIndicator size={25} color= {'#8b0000'}/>
                            </View>
                        ):
                        (
                            null
                        )
                    }
                    {  
                        results.length != 0 ?(
                            results.map(result=>{
                                return (
                                    <SearchResult 
                                    receipt ={result.receiptNumber}
                                    status = {result.status}
                                    id = {result.id}
                                    goTo = {goTo}
                                    key = {result.id}
                                    />
                                )
                            })
                        ):
                        (
                            <Text style = {[
                                styles.textCenter,
                                styles.grayText,
                                styles.mTop25,
                                styles.h5
                            ]}>Nothing Yet</Text>
                        )
                    }
                    
                </ScrollView>
            
            </View>
        </View>
      </View>
    )

}

export default SearchScreen