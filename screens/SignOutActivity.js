import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useContext} from 'react'
import styles from '../styles/main'
import { AuthContext } from '../components/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignOutActivity = () => {

    let { signOut} = useContext(AuthContext)

    useEffect(async()=>{
        setTimeout(async()=>{
            await AsyncStorage.removeItem('UserLoggedIn')
            await AsyncStorage.removeItem('userId')
            await AsyncStorage.removeItem('fullname')
            signOut()
        },5000)

    },[])
  return (
    <View style = {[styles.Screen]}>
     <View style = {[styles.container, styles.childElem, styles.centerItem]}>
        <Text style={[styles.h4, styles.primaryText, styles.textBold]}>Account deleted!</Text>
        <Text style={styles.grayText}>Your account has been deleted from Kestrel Express, signing Out.</Text>
        <ActivityIndicator
            color={'#8b0000'}
            size = {35}
        />
     </View>
    </View>
  )
}

export default SignOutActivity