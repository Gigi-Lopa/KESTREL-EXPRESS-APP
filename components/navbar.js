import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React, 
  {
    useEffect,
    useState
  } 
from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styles/main'
import URLS from './URLS'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'


export default function Navbar(props) {

  let navigation = useNavigation()
  let [date, setDate]=  useState([])
  let [fullname, setFullname] = useState('')

  useEffect(()=>{
    async function getDate(){
      let date_now = Date().split(' ').splice(0,3)
      return date_now
    }
    async function getUserInfomation(){
      let userId = await AsyncStorage.getItem('userId');
      let userFullname  =  await AsyncStorage.getItem('fullname')
      
      
      if(userFullname == null || userFullname === '' || userFullname == undefined ){
        
        await fetch(URLS.GET_USER_INFOR+userId)
        .then(res=>res.json())
        .then((res)=>{
          if(res.results){
            setFullname(res.results.fullname)
            AsyncStorage.setItem('fullname', res.results.fullname)
          }
        })
      }
      else{
        setFullname(userFullname)
      }
      
    }



    getDate()
    .then((new_date)=>{
      setDate(date = new_date)
      getUserInfomation()
     
    })
  }, [])

  
  return (
    <View style = {[styles.navbar, styles.row, styles.spaceItems]}>
        <View style = {[styles.username, styles.mTop25]}>
          <View style = {styles.row}>
            <Text style = {[styles.h5, styles.grayText]}>
                  {
                    date[0]
                  },
              </Text>
              <Text style = {[styles.h5, styles.grayText]}>
                  {
                    ' ' + date[1]  + ' '
                  }
              </Text>
              <Text style = {[styles.h5, styles.grayText]}>
                  {
                    date[2]
                  }
              </Text>
          </View> 
          <Text style = {styles.h3}>
              {fullname}
          </Text>
        </View>
        <View>
          <TouchableOpacity style = {[styles.profile, styles.mTop25, styles.centerItem, styles.primary_color]} onPress = {props.onShowDrawer}>
          <MaterialCommunityIcons
                                name = {"account"}
                                size = {20}
                                style = {styles.tertiaryText}
                            />
          </TouchableOpacity>
          
        </View>
        
        
    </View>
  )
}