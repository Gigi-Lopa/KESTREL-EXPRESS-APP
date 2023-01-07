import React, {useState} from 'react'
import  {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
}
from "react-native"
import styles from '../styles/main'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Fontisto from 'react-native-vector-icons/Fontisto'
import TextField from '../components/textField'
import {Formik} from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as yup from 'yup'
import URLS from '../components/URLS'
import Alert_ from '../components/alert'
import JobNavigation from './jobNavigation'


export default function EditUserInformation({navigation, route}) {
    
    let [emailInUse , setEmailInUse] = useState(false)
    let [updateAccountStatus, setUpdateAccountStatus] = useState(false)
    let [updateAccountErr, setUpdateAccountError] = useState(false)
    let [disableButton, setDisableButton] = useState(false)
    let [networkErr, setNetworkErr] = useState(false)

    let UpdateAccountSchema = yup.object().shape({
        fullname  : yup.string().required(),
        address : yup.string().required(),
        number  :yup.string().required(),
        occupation : yup.string().required()
    })

    let updateUser = (values) =>{
        fetch(URLS.EDIT_USER_INFORMATION+route.params.userInfor.user_zag, {
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
        .then(res =>{
            
            if(!res.errorNetwork){

                if(res.status){
                    AsyncStorage.removeItem('fullname')
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
          <JobNavigation label = {'Edit Profile'}/>
            <ScrollView style ={[styles.body, styles.mTop25]}>
                <Formik
                    initialValues={{ 
                        fullname: route.params.userInfor.fullname, 
                        address :  route.params.userInfor.address,
                        number :  route.params.userInfor.phone,
                        occupation :  route.params.userInfor.occupation
                    }}
                    validateOnMount = {false}
                    validationSchema = {UpdateAccountSchema}
                    onSubmit={values => {
                        setDisableButton(true)
                        updateUser(values)
                         
                    }}>
                    {({ handleChange, handleBlur, handleSubmit, values, isValid, touched, errors}) => (
                        <View>
                            <TextField
                                placeholder = {"Full name"}
                                value = {values.fullname}
                                onTextChange = {handleChange('fullname')}
                                input_err = {errors.fullname}
                                onBlur = {handleBlur('fullname')}
                                label = "Fullname"
                                marginNone = {true}
                            >
                            <MaterialCommunityIcons
                                name = {"account"}
                                size = {25}
                                style = {styles.primaryText}
                            />
                            </TextField>
                           
                            <TextField
                                placeholder = "Address"
                                value = {values.address}
                                onTextChange = {handleChange('address')}
                                input_err = {errors.address}
                                onBlur = {handleBlur('address')}
                                label = {"Address"}
                                marginNone = {true}
                            >
                                <MaterialCommunityIcons
                                    name = {"warehouse"}
                                    size = {25}
                                    style = {styles.primaryText}
                                />
                            </TextField>
                            
                            <TextField
                                placeholder = {"Mobile Number"}
                                value = {values.number}
                                onTextChange = {handleChange('number')}
                                input_err = {errors.number}
                                onBlur = {handleBlur('number')}
                                label = {"Phone Number"}
                                marginNone = {true}
                            >
                                <MaterialCommunityIcons
                                    name = {"phone"}
                                    size = {25}
                                    style = {styles.primaryText}
                                />
                            </TextField>
                            <TextField
                                placeholder = {"Occupation"}
                                value = {values.occupation}
                                onTextChange = {handleChange('occupation')}
                                input_err = {errors.occupation}
                                onBlur = {handleBlur('occupation')}
                                label = {"Occupation"}
                                marginNone = {true}
                            >
                                <MaterialCommunityIcons
                                    name = {"tools"}
                                    size = {25}
                                    style = {styles.primaryText}
                                />
                            </TextField>
                
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
                            
                            <View style = {[styles.row, styles.mTop25]}>
                                <TouchableOpacity style ={[styles.rowBtn, styles.primary_color, styles.marginVertical, {
                                    width: '50%'
                                }]} onPress = {handleSubmit}
                                    disabled = {disableButton}
                                >
                                    {
                                        disableButton ? (
                                            <ActivityIndicator  color = {'#fff'} size = {18} />
                                        ):(
                                            <Text style = {[styles.textCenter, styles.tertiaryText]}>
                                                Save
                                            </Text>
                                        )
                                    }   
                                </TouchableOpacity>
                                <TouchableOpacity style ={[styles.rowBtn,styles.centerItem, {
                                    width: '50%'
                                    }]}  onPress = {()=>
                                    navigation.navigate('Change Password', {
                                        USER_ZAG : route.params.userInfor.user_zag

                                    })}>
                                    <Text style = {[styles.textCenter, styles.primaryText, styles.textBold]}>
                                        Change Password
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    </View>
    )
}
