import React, {
    useState , 
    useContext,
    createContext
}  from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
}
from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import {useNavigation} from '@react-navigation/native';
import { ActivityIndicator } from 'react-native'
import TextField from '../components/textField'
import Alert_ from '../components/alert'
import URLS from '../components/URLS'
import styles from '../styles/main'
import {Formik} from 'formik' 
import * as Yup from 'yup'
import {AuthContext} from '../components/authContext'


export default function LogIn(props) {
   
    let { signIn} = useContext(AuthContext)

    let navigation =  useNavigation()
    let [email_valid, setEmail_valid] = useState(false)
    let [password_valid, setPassword_valid] =useState(false)
    let [loginError , setLoginError ] = useState(false)
    let [disableButton, setDisableButton] = useState(false)
    let loginSchema = Yup.object().shape({
        email : Yup.string().email().required('Enter valid username'),
        password : Yup.string().required('Password Required')
    })

    let onLogIn = (values) =>{
        if(values){
            fetch(URLS.LOGIN_USER, {
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
            .then(async(res) =>{
                if(!res.results.email){
                    setDisableButton(false)
                    setEmail_valid(true)
                    setTimeout(()=>{
                        setEmail_valid(false)
                    },2000)
                }
                
                if(!res.results.password){
                    setDisableButton(false)
                    setPassword_valid(true)
                    setTimeout(()=>{
                        setPassword_valid(false)
                    },2000)
                }

                if (res.results.status){
                    try{
                        setDisableButton(false)
                        navigation.navigate('Verify user', {
                            user_zag : res.results.USER_ZAG,
                            signIn_ : signIn
                        })
                    }
                    catch (err){
                        console.log(err)
                    }
                    
                }
 
            })  
            .catch(err =>{
                setDisableButton(false)
                setLoginError(true)
                setTimeout(()=>{
                    setLoginError(false)
                },2500)
            })
        }
    }
  return (
    <View style = {styles.Screen}>
        <View style = {styles.container}>
            <View style = {styles.header}>
                    <Text style = {[
                        styles.primaryText,
                        styles.h3,
                        styles.textBold,
                        {
                            paddingTop  :30
                        },
                        styles.mBot15
                    ]}>Sign In</Text>
            </View>
            <View style = {[styles.body]}>
                <View style = {[styles.childElem,styles.spaceItems]}>
                    <Formik
                        initialValues={{ email: '', password : '' }}
                        validateOnMount = {false}
                        validationSchema = {loginSchema}
                        onSubmit={values =>{ 
                            setDisableButton(true)
                            onLogIn(values)
                            }
                        }>
                         {({ handleChange, handleBlur, handleSubmit, values, isValid, touched, errors}) => (
                            <View style = {
                                [
                                    styles.childElem,
                                    {
                                        justifyContent  : 'space-between'
                                    }
                                ]
                            }>
                                <View>
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
                                    <Text style= {[
                                        styles.textCenter,
                                        styles.textBold,
                                        styles.grayText
                                    ]} onPress =  {()=>navigation.navigate('Forgot Password')}>Forgot Password ?</Text>
                                    {
                                        email_valid &&  
                                        <Alert_ status = {"Invalid Email"}>
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
                                        password_valid &&
                                        <Alert_ status = {"Invalid Password for Email"}>
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
                                        loginError && <Alert_ status= {'An error occured. check your internet connectivity.'}>

                                            <Fontisto
                                                style = {[
                                                    styles.h5, 
                                                ]}
                                                color = {'white'}
                                                name = 'broken-link'
                                            />
                                        </Alert_> 
                                    }         

                                </View>
                                <View>
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
                                                    Sign In
                                                </Text>
                                            )
                                        }   
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                         )}
                        
                    </Formik>
                </View>
            </View>
        </View>
    </View>
  )
}
