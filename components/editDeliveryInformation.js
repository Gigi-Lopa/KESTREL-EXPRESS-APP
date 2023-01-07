import { View, Text, TouchableOpacity } from 'react-native'
import React ,{ useState , useEffect}from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TextField from '../components/textField'
import { Formik } from 'formik'
import * as yup from 'yup'
import styles from '../styles/main'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditDeliveryInformation = (props) => {

    let [fullname, setFullname] = useState('')
    let [email, setEmail] = useState('')
    let [number, setNumber] = useState('')
    let [nationalIDNumber, setNationalIDNumber] = useState('')

    let deliverySchema = yup.object().shape({
        fullname : yup.string(),
        email : yup.string().email(),
        mobileNumber  : yup.string(),
        nationalIDNumber  : yup.string()
    })
    useEffect(async()=>{
        setEmail(AsyncStorage.getItem('Dmail'))
        setFullname(AsyncStorage.getItem('Dname'))
        setNumber(AsyncStorage.getItem('Dnum'))
        setNationalIDNumber(AsyncStorage.getItem('Did'))
        
       

    },[])

    let loadInformation = async(values)=>{
        console.log(await AsyncStorage.getItem('Dmail'))
        AsyncStorage.setItem('Dmail', values.email)
        AsyncStorage.setItem('Dname',values.fullname)
        AsyncStorage.setItem('Dnum', values.mobileNumber)
        AsyncStorage.setItem('Did', values.nationalIDNumber)

    }
  return (
    <View>
        <Formik
            initialValues={{ 
                fullname: fullname, 
                email : email,
                mobileNumber :  number,
                nationalIDNumber :nationalIDNumber
                
            }}
            validateOnMount = {false}
            validationSchema = {deliverySchema}
            onSubmit={values => {   
                loadInformation(values)
            }}>
            {({ handleChange, handleBlur, handleSubmit, values, isValid, touched, errors}) => {
            return(
            <View >
                <TextField
                label = {'Fullname'}
                placeholder = {'Fullname'}
                value = {values.fullname}
                onTextChange = {handleChange('fullname')}
                input_err = {errors.fullname}
                onBlur = {handleBlur('fullname')}
                marginNone = {true}
                >
                <MaterialCommunityIcons
                    name = {"account"}
                    size = {25}
                    style = {styles.primaryText}
                    />
                </TextField>
                <TextField
                label = {'Email'}
                placeholder = {'Email'}
                value = {values.email}
                onTextChange = {handleChange('email')}
                input_err = {errors.email}
                onBlur = {handleBlur('email')}
                marginNone = {true}
                >
                    <MaterialCommunityIcons
                    name = {"email"}
                    size = {25}
                    style = {styles.primaryText}
                    />

                </TextField>
                <TextField
                label = {'Mobile Number'}
                placeholder = {'Mobile Number'}
                value = {values.mobileNumber}
                onTextChange = {handleChange('mobileNumber')}
                input_err = {errors.mobileNumber}
                onBlur = {handleBlur('mobileNumber')}
                marginNone = {true}
                >
                <MaterialCommunityIcons
                    name = {"phone"}
                    size = {25}
                    style = {styles.primaryText}
                    />
                </TextField>
                <TextField
                label = {'National Id Number'}
                placeholder = {'National Id Number'}
                value = {values.nationalIDNumber}
                onTextChange = {handleChange('nationalIDNumber')}
                input_err = {errors.nationalIDNumber}
                onBlur = {handleBlur('nationalIDNumber')}
                marginNone = {true}
                >
                <MaterialCommunityIcons
                    name = {"id-card"}
                    size = {25}
                    style = {styles.primaryText}
                    />
                </TextField>
                <TouchableOpacity 
                    style ={[
                        styles.btn,
                        styles.marginVertical,
                        styles.primary_color
                        ]} 
                        onPress = {handleSubmit}>
                    <Text style = {[styles.textCenter, styles.tertiaryText]}>Save</Text>
                </TouchableOpacity>
            </View>
            
            )}}
                  
        </Formik>
    </View>
  )
}

export default EditDeliveryInformation