import { View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import React, {useContext} from 'react'
import styles from '../styles/main'
import JobNavigation from './jobNavigation'
import ProfileInfor from '../components/profileInfor'
import { PieChart } from 'react-native-chart-kit'
import Dashboard from '../components/dashboard'
import ErrorPage from '../components/errorPage'
import { useNavigation } from '@react-navigation/native'
let {width } = Dimensions.get('screen')
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../components/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'


function Profile (props){

  let navigation = useNavigation()
  let { signOut} = useContext(AuthContext)

  
    let navToEditProfile = () =>{ 
      navigation.navigate('Edit Infor',{
        userInfor : props
      })
    }

    let data =[
        {
          name: 'Complete',
          value: props.KO != 0 ? (props.KO)  : (0.001),
          color: '#8b0000',
          legendFontColor: '#333',
          legendFontSize: 15
        },
        {
          name: 'In process',
          value: props.inKo != 0 ? (props.inKo)  : (0.001),
          color: 'rgba(139,0,0,0.5)',
          legendFontColor: '#333',
          legendFontSize: 15
        },
    
      ]
      let chartConfig = {
        backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2, 
        color: (opacity = 1) => `rgba(170, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        }
      } 

  return (

      <View style = {styles.Screen}>
      <View style = {styles.container}>
      <JobNavigation label = {'My Profile'}/>
      {
          props.netWorkErr === false ? (
              <ScrollView>
                  <ProfileInfor name  = {props.fullname} email = {props.email} onClick = {navToEditProfile}/>
                  <View style = {styles.mTop25}>
                      <Text style = {[
                          styles.h4,
                          styles.textBold,
                          styles.primaryText
                      ]}>Cargo Status</Text>
                      
                      <PieChart 
                          data={data}
                          width= {width * 0.9}
                          height={150}
                          chartConfig={chartConfig}
                          accessor="value"
                          backgroundColor="transparent"
                      />
                  </View>
                  <Text style = {[
                          styles.h4,
                          styles.textBold,
                          styles.primaryText
                      ]}>Dashboard</Text>
                  <View>
                  <Dashboard 
                  value_ko = {props.KO}
                  user_zag = {props.user_zag}
                  value_inko = {props.inKo}
                  payments = {props.payments}
                  />
                  
                  </View>
              </ScrollView>
          ): (
              <ErrorPage/>
          )
      }
      <TouchableOpacity style ={
        [
          styles.row,
          styles.spaceItems
        ]
      } onPress = {async()=>{
        await AsyncStorage.removeItem('UserLoggedIn')
        await AsyncStorage.removeItem('userId')
        await AsyncStorage.removeItem('fullname')
        signOut()
        
      }}>
        <Text style = {[
            styles.h5,
            styles.textBold,
            styles.primaryText
        ]}>Log Out</Text>
        <MaterialCommunityIcons
        name='logout'
        style = {styles.h4}
        color = {styles.primaryText}
        />

      </TouchableOpacity>

      </View>
      </View>
  
  )

}

export default Profile