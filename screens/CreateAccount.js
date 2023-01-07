import React, {useState} from 'react'
import  {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
    ActivityIndicator
}
from "react-native"
import styles from '../styles/main'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import TextField from '../components/textField'
import {Formik} from 'formik'
import * as yup from 'yup'
import URLS from '../components/URLS'
import Alert_ from '../components/alert'


export default function CreateAccount({navigation}) {

    let [emailInUse , setEmailInUse] = useState(false)
    let [createAccountErr, setCreateAccountError] = useState(false)
    let [disableButton, setDisableButton] = useState(false)
    let [networkErr, setNetworkErr] = useState(false)
   
    let CreateAccountSchema = yup.object().shape({
        fullname  : yup.string().required(),
        address : yup.string().required(),
        email :yup.string().email().required(),
        number  :yup.string().required(),
        date : yup.number().required().max(31),
        month : yup.number().required().max(12),
        year : yup.number().required().max(parseInt(new Date().getFullYear()) - 1).min(1900),
        occupation : yup.string().required(),
        password : yup.string().required(),
        confirmPasword :yup.string().required(),
    })

    let createUser = async(values) =>{
        if(values){       
            await fetch(URLS.CREATE_USER, {
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
                if(res.response.email){
                    setDisableButton(false)
                    setEmailInUse(true)
                    setTimeout(()=>{
                        setEmailInUse(false)
                    }, 2000)
                }
                if (res.response.error){
                    setDisableButton(false)
                    setCreateAccountError(true)
                    setTimeout(()=>{
                        setCreateAccountError(false)
                    },2500)
                }
                if(res.response.status){
                    setDisableButton(false)
                    navigation.navigate('Log In')
                }
                
            })  
            .catch(err =>{
                setDisableButton(false)
                setNetworkErr(true)
                    setTimeout(()=>{
                        setNetworkErr(false)
                    },2500)
            })
        }               
    }

  return (
    <View style =  {styles.Screen}>
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {[
                    styles.primaryText,
                    styles.h3,
                    styles.textBold,
                    {
                        paddingTop  :25
                    },
                    styles.mBot15
                ]}>Sign Up</Text>
            </View>
            <ScrollView style ={styles.body}>
                <Formik
                    initialValues={{ 
                        fullname: '', 
                        address : '',
                        email : '',
                        number : '',
                        date:  '',
                        month : '',
                        year  : '',
                        occupation : '',
                        password : '',
                        confirmPasword :''
                    }}
                    validateOnMount = {false}
                    validationSchema = {CreateAccountSchema}
                    onSubmit={values => {
                        setDisableButton(true)
                        if(values.password === values.confirmPasword){
                            if(!values.number.startsWith('+')){
                                ToastAndroid.show("Phone number should start with a country code. eg +123", ToastAndroid.LONG)
                                setDisableButton(false)
                            }
                            else{
                                values.number = values.number.replace(' ', '')
                                createUser(values)
                            }
                            
                        }
                        else{
                            setDisableButton(false)
                            ToastAndroid.show("Password don't match", ToastAndroid.LONG)
                        }
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
                                placeholder = {"Email"}
                                value = {values.email}
                                onTextChange = {handleChange('email')}
                                input_err = {errors.email}
                                onBlur = {handleBlur('email')}
                                label = {"Email"}
                                marginNone = {true}
                            >
                                <MaterialCommunityIcons
                                    name = {"email"}
                                    size = {25}
                                    style = {styles.primaryText}
                                    
                                />
                            </TextField>
                            <TextField
                                placeholder = {"Phone Number"}
                                value = {values.number}
                                onTextChange = {handleChange('number')}
                                input_err = {errors.number}
                                onBlur = {handleBlur('number')}
                                label = {"Phone Number"}
                                marginNone = {true}
                            >
                                <MaterialCommunityIcons
                                    name = {"email"}
                                    size = {25}
                                    style = {styles.primaryText}
                                    
                                />
                            </TextField>
                           
                            <View>
                                <Text style = {[styles.h5, styles.primaryText, styles.textBold]}>{"Date of Birth"}</Text>
                                <Text style = {[
                                    styles.h6,
                                    styles.grayText,
                                    styles.mBot15
                                ]}>DD/MM/YYYY</Text>
                                <View style = {[styles.row, styles.mBot15]}>
                                    <View>
                                        <TextInput
                                            style = {[styles.input_dob,   errors.date? (styles.textField_err): (null)]}
                                            value = {values.date}
                                            onChangeText = {handleChange('date')}
                                            
                                        />
                                    </View>
                                    <MaterialCommunityIcons
                                        name = "slash-forward"
                                        size={25}
                                        style = {[
                                            styles.primaryText
                                        ]}
                                    />
                                    <View>
                                        <TextInput
                                            style = {[styles.input_dob,   errors.month ? (styles.textField_err): (null)]}
                                            value = {values.month}
                                            onChangeText = {handleChange('month')}
                                        
                                        />
                                    </View>
                                    <MaterialCommunityIcons
                                        name = "slash-forward"
                                        size={25}
                                        style = {[
                                            styles.primaryText
                                        ]}
                                    />
                                    <View>
                                        <TextInput
                                            style = {[styles.input_dob,   errors.year? (styles.textField_err): (null)]}
                                            value = {values.year}
                                            onChangeText = {handleChange('year')}
                                        
                                        />
                                    </View>
                                    
                                </View>

                            </View>
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
                            <TextField
                                placeholder = {"Password"}
                                value = {values.password}
                                onTextChange = {handleChange('password')}
                                input_err = {errors.password}
                                onBlur = {handleBlur('password')}
                                label = {"Password"}
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
                                value = {values.confirmPasword}
                                onTextChange = {handleChange('confirmPasword')}
                                input_err = {errors.confirmPasword}
                                onBlur = {handleBlur('confirmPasword')}
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
                            {
                                emailInUse && <Alert_ status= {'Email in Use'}>
                                    <FontAwesome
                                        style = {[
                                            styles.h5, 
                                        ]}
                                        color = {'white'}
                                        name = 'warning'
                                    />
                                </Alert_> 
                            }
                            {
                                createAccountErr && <Alert_ status= {'An error occured. Try again'}>
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
                                            Sign Up
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
