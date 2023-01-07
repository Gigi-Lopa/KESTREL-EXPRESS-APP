import React, {useState} from 'react'
import  {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ToastAndroid
}
from "react-native"
import styles from '../styles/main'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Fontisto from 'react-native-vector-icons/Fontisto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TextField from '../components/textField'
import {Formik} from 'formik'
import * as yup from 'yup'
import URLS from '../components/URLS'
import Alert_ from '../components/alert'
import JobNavigation from './jobNavigation'
import { useEffect } from 'react'

const ChangePassword = ({route}) => {

    let [passwordErr, setPasswordErr] = useState(false)
    let [updateAccountStatus, setUpdateAccountStatus] = useState(false)
    let [updateAccountErr, setUpdateAccountError] = useState(false)
    let [disableButton, setDisableButton] = useState(false)
    let [networkErr, setNetworkErr] = useState(false)

 
    let UpdateAccountSchema = yup.object().shape({
        password  : yup.string().required(),
        newPassword  : yup.string().required(),
        confirmPassword : yup.string().required()
    })
    let changePassword = (values)=>{
        fetch(URLS.CHANGE_PASSWORD+route.params.USER_ZAG, {
            method : "POST",
            headers:{
                "Accept":"application/json, text/plain, */*",
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                values,
                ZIG_ : URLS.THE_FLASH_ZAG
            })
        })
        .then(res=> res.json())
        .then(async res =>{
            console.log(res)
            if(!res.errorNetwork){
               if (!res.password){
                    if(res.status){
                      
                        setDisableButton(false)
                        setUpdateAccountStatus(true)
                        setTimeout(()=>{
                            setUpdateAccountStatus(false)
                        },2500)
                    }
                    else{
                        setDisableButton(false)
                        setUpdateAccountError(true)
                        setTimeout(()=>{
                            setUpdateAccountError(false)
                        },2500)
                    }
               }else{
                    setDisableButton(false)
                    setPasswordErr(true)
                    setTimeout(()=>{
                        setPasswordErr(false)
                    },2500)
               }
            }
            else{
                setDisableButton(false)
                setNetworkErr(true)
                setTimeout(()=>{
                    setNetworkErr(false)
                },2500)
            }
           

        })
        .catch(err=>{
            console.log(err)
            setDisableButton(false)
            setNetworkErr(true)
            setTimeout(()=>{
                setNetworkErr(false)
            },2500)
        })
    }
  return (
<View style =  {styles.Screen}>
        <View style = {styles.container}>
          <JobNavigation label = {'Passwords'}/>
            <ScrollView style ={[styles.body, styles.mTop25]}>
                <Formik
                    initialValues={{ 
                        password: '', 
                        newPassword  :'',
                        confirmPassword :'',
                    }}
                    validateOnMount = {false}
                    validationSchema = {UpdateAccountSchema}
                    onSubmit={values => {
                        if(values.newPassword != values.confirmPassword){
                            ToastAndroid.show('Passwords dont match!', ToastAndroid.LONG)
                        }
                        else{
                            changePassword(values)
                        }
                    }}>
                    {({ handleChange, handleBlur, handleSubmit, values, isValid, touched, errors}) => (
                        <View style = {[styles.body_, styles.spaceItems]}>
                            <View>
                                <TextField
                                    placeholder = {"Current Password"}
                                    value = {values.password}
                                    onTextChange = {handleChange('password')}
                                    input_err = {errors.password}
                                    onBlur = {handleBlur('password')}
                                    label = {"Current Password"}
                                    secureTextEntry = {true}
                                    marginNone = {true}
                                >
                                    <MaterialCommunityIcons
                                        name = {"key"}
                                        size = {25}
                                        style = {styles.primaryText}
                                    />
                                </TextField>
                                <TextField
                                    placeholder = {"New Password"}
                                    value = {values.newPassword}
                                    onTextChange = {handleChange('newPassword')}
                                    input_err = {errors.newPassword}
                                    onBlur = {handleBlur('newPassword')}
                                    label = {"New Password"}
                                    secureTextEntry = {true}
                                    marginNone = {true}
                                >
                                    <MaterialCommunityIcons
                                        name = {"key"}
                                        size = {25}
                                        style = {styles.primaryText}
                                    />
                                </TextField>
                                <TextField
                                    placeholder = {"Confirm Password"}
                                    value = {values.confirmPassword}
                                    onTextChange = {handleChange('confirmPassword')}
                                    input_err = {errors.confirmPassword}
                                    onBlur = {handleBlur('confirmPassword')}
                                    label = {"Confirm Password"}
                                    secureTextEntry = {true}
                                    marginNone = {true}
                                >
                                    <MaterialCommunityIcons
                                        name = {"key"}
                                        size = {25}
                                        style = {styles.primaryText}
                                    />
                                </TextField>
                            </View>    
                            {
                                updateAccountErr && <Alert_ status= {'An error occured. Try again'}>
                                    <Fontisto
                                        style = {[
                                            styles.h5, 
                                        ]}
                                        color = {'white'}
                                        name = 'broken-link'
                                    />
                                </Alert_> 
                            }
                            {
                                updateAccountStatus && <Alert_ status= {'Information Saved. Reload app'} status_color = 'GREEN'>
                                    <Fontisto
                                        style = {[
                                            styles.h5, 
                                        ]}
                                        color = {'white'}
                                        name = 'slightly-smile'
                                    />
                                </Alert_> 
                            }
                            {
                                networkErr && <Alert_ status= {'No network connection. Try again'}>
                                    <Fontisto
                                        style = {[
                                            styles.h5, 
                                        ]}
                                        color = {'white'}
                                        name = 'broken-link'
                                    />
                                </Alert_> 
                            }
                            {
                                passwordErr && <Alert_ status= {'Invalid Password'}>
                                    <Fontisto
                                        style = {[
                                            styles.h5, 
                                        ]}
                                        color = {'white'}
                                        name = 'broken-link'
                                    />
                                </Alert_> 
                            }
                            <TouchableOpacity 
                                disabled = {disableButton}    
                                style ={[
                                    styles.btn,
                                    styles.marginVertical,
                                    styles.primary_color
                                    ]} 
                                    onPress = {handleSubmit}>
                                {
                                    disableButton ? (
                                        <ActivityIndicator  color = {'#fff'} size = {25} />
                                    ):(
                                        <Text style = {[styles.textCenter, styles.tertiaryText]}>
                                            Change
                                        </Text>
                                    )
                                }
                               
                            </TouchableOpacity>
                        </View>
                        )}
                </Formik>
            </ScrollView>
        </View>
    </View>
  )
}

export default ChangePassword