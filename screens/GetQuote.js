import React, {useState}  from'react'
import {
    View,
    Text,
    TouchableOpacity
}
from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {useNavigation} from '@react-navigation/native';
import TextField from '../components/textField'
import styles from '../styles/main'
import {Formik} from 'formik' 
import * as Yup from 'yup'

export default function GetQoute({route}) {
   
    let navigation =  useNavigation()
    let quotationSchema = Yup.object().shape({
        from : Yup.string().required(),
        to : Yup.string().required('Password Required')
    })

    let onNext = (values) =>{
        if(values){
            values.USER_ZAG = route.params.USER_ZAG
            navigation.navigate('Product Information', {
                GI : values,
                mode  :  'quotation'
              })
        }
    }
  return (
    <View style = {styles.Screen}>
        <View style = {styles.container}>
            <View>
                <Text style = {[
                    styles.primaryText,
                    styles.h3,
                    styles.textBold,
                    {
                        paddingTop  :30
                    }
                ]}>Get Qoute</Text>
                <Text style = {[
                    styles.primaryText,
                    styles.h5,
                    styles.mBot15
                ]}>Fill in destinations</Text>
            </View>
            <View style = {[styles.body]}>
                <View >
                    <Formik
                        initialValues={{ from: '', to : '' }}
                        validateOnMount = {false}
                        validationSchema = {quotationSchema}
                        onSubmit={values =>{ 
                            onNext(values)
                        }
                        }>
                         {({ handleChange, handleBlur, handleSubmit, values, isValid, touched, errors}) => (
                            <View style = {
                                [
                                    {
                                        justifyContent  : 'space-between',
                                        height : '98%'
                                    }
                                ]
                            }>
                                <View>
                                    <TextField 
                                        placeholder = {"From"}
                                        value = {values.from}
                                        onTextChange = {handleChange('from')}
                                        input_err = {errors.from}
                                        onBlur = {handleBlur('from')}
                                        label = {"From"}
                                        marginNone = {true}
                                    >
                                        <MaterialCommunityIcons
                                            name = {"account-circle"}
                                            size = {25}
                                            style = {styles.primaryText}
                                           
                                        />
                                    </TextField>
                                    <TextField
                                        placeholder = {"To"}
                                        value = {values.to}
                                        onTextChange = {handleChange('to')}
                                        input_err = {errors.to}  
                                        onBlur = {handleBlur('to')}
                                        label = {"to"}
                                        marginNone = {true}

                                    >
                                        <MaterialCommunityIcons
                                            name = {"key"}
                                            size = {25}
                                            style = {styles.primaryText}
                                        />
                                    </TextField>
                                     

                                </View>
                                <View>
                                    <TouchableOpacity     
                                    style ={[
                                        styles.btn,
                                        styles.marginVertical,
                                        styles.primary_color
                                        ]} 
                                        onPress = {handleSubmit}>
                                         {
                                            <Text style = {[styles.textCenter, styles.tertiaryText]}>
                                                Next
                                            </Text>
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
