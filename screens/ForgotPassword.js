import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import styles from '../styles/main'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/textField'
import URLS from '../components/URLS'
import Alert_ from '../components/alert'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export class ForgotPassword extends Component {

  constructor(props){
    super(props)
    this.state = {
        email: '',
        disableButton : false,
        error: false,
        notEmail : false,
        phoneNumber : '',
    }
}

  

  emailVerification = Yup.object().shape({
    email : Yup.string().email().required(),
  })

  onVerify = values =>{
    fetch(URLS.VERIFY_EMAIL, {
      method : "POST",
      headers:{
          "Accept":"application/json, text/plain, */*",
          "Content-type":"application/json"
      },
      body:JSON.stringify({
         email : values.email
      })
    })
    .then(res=>{
        this.setState({
          disableButton : false,
        })
        return res.json()
    })
    .then(res=>{
       if(res.error != true){
        if(res.emailNotFound != true){
          this.setState({
            phoneNumber  :res.number
          })
        }
        else{
          this.setState({
            notEmail: true
          })
          setTimeout(()=>{
            this.setState({
              notEmail: false
            })
          },3500)
         
        }
      }
      else{
        this.setState({
          error: true
        })
        setTimeout(()=>{
          this.setState({
            error: false
          })
        },3500)
       }
    })
  .catch(()=>{
       this.setState({
        error : true,
        disableButton : false
       })
       setTimeout(()=>{
        this.setState({
          error : false
        })
      },3500)
    })

  }

  render() {
    return (
      <View style = {styles.Screen}>
        <View style = {[styles.container]}>
          <Formik
          initialValues={{ email : ''}}
          validateOnMount = {false}
          validationSchema = {this.emailVerification}
          onSubmit={values =>{ 
              this.setState({
                  disableButton : true
              })
              this.onVerify(values)
              }
          }>
          {({ handleChange, handleBlur, handleSubmit, values, isValid, touched, errors}) => (
              <View style = {
                  [
                      styles.childElem,
                      {
                          justifyContent  : 'space-between'
                      }
                  ]}>
                  <View>
                      <Text  style={[
                          styles.h3,
                          styles.textBold,
                          styles.primaryText,
                          styles.mTop25
                      ]}>
                          Verification
                      </Text>
                      <Text>
                      {
                          `Fill in your email to complete the verification process`
                      } 
                      </Text>
                      <View style = {styles.mTop25}></View>
                      <View style = {styles.row}>
                          <TextField 
                              placeholder = {"Email"}
                              value = {values.email}
                              onTextChange = {handleChange('email')}
                              input_err = {errors.email}
                              onBlur = {handleBlur('email')}
                              marginNone = {true}
                          >
                            <MaterialCommunityIcons name='email' color={'#8b0000'} size = {25}/>
                          </TextField>
                      </View>
                      {
                        this.state.error ? (

                          <Alert_ status= {'An error occured. check your internet connectivity.'}>
                          <Fontisto
                              style = {[
                                  styles.h5, 
                              ]}
                              color = {'white'}
                              name = 'broken-link'
                          />
                      </Alert_> 
                        ): (<></>)
                      }
                      {
                        this.state.notEmail ? (
                          <Alert_ status = {"Invalid Email"} >
                            <FontAwesome
                                style = {[
                                    styles.h5, 
                                ]}
                                color = {'white'}
                                name = 'warning'
                            />
                        </Alert_>
                        ) : (<></>)
                      }
                      {
                      this.state.phoneNumber.length != 0 ? (
                        <View>
                          <Text style = {
                            [
                              styles.mTop25,
                              styles.h5,
                              styles.secondaryText,{
                                lineHeight : 25,
                                color : '	#198754'
                              }
                            ]
                            }>
                            {`An SMS was sent to ${this.state.phoneNumber[0]}${this.state.phoneNumber[1]}${this.state.phoneNumber[2]}${this.state.phoneNumber[3]}${this.state.phoneNumber[4]}******${this.state.phoneNumber[this.state.phoneNumber.length - 2]}${this.state.phoneNumber[this.state.phoneNumber.length - 1]} with a reset link.If you didnt get any SMS in the next 10 - 15  seconds please Verify again.`}
                          </Text>
                        </View>
                        ):(<></>)
                      }
                 
                  </View>
                  <View>
                      <TouchableOpacity 
                      disabled = {this.state.disableButton}    
                      style ={[
                          styles.btn,
                          styles.mBot25,
                          styles.marginVertical,
                          styles.secondaryColor
                          ]} 
                          onPress = {handleSubmit}>
                              {
                              this.state.disableButton ? (
                                  <ActivityIndicator  color = {'#fff'} size = {25} />
                              ):(
                                  <Text style = {[styles.textCenter, styles.tertiaryText]}>
                                      Verify
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
    )
  }
}

export default ForgotPassword