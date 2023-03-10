import { Text, View, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component} from 'react'
import styles from '../styles/main'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/textField'
import URLS from '../components/URLS'
import Alert_ from '../components/alert'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
let { height, width } = Dimensions.get("screen")

export class TwoStepVerification extends Component {
   
    constructor(props){
        super(props)
        this.state = {
            code: '',
            phoneNumber : '',
            disableButton : false,
            codeMatch  : false,
            smsError :  false,
            loading : true,
            mode : 'sms'
            ,email  : ''
            
        }
    }
    codeVerification = Yup.object().shape({
        code: Yup.number().required()
    })
    onVerify = async (values) =>{

        if(parseInt(values.code) === parseInt(this.state.code)){
            await AsyncStorage.setItem("userId", this.props.route.params.user_zag.toString())
            await AsyncStorage.setItem("UserLoggedIn" , JSON.stringify(true))
            this.props.route.params.signIn_(this.props.route.params.user_zag.toString())
            this.setState({
                disableButton : false
            })
        }
        else{
            this.setState({
                disableButton : false,
                codeMatch : true
            })
        }
    }
    getCodes = () =>{

        fetch(URLS.VERIFY_USER, {
            method : "POST",
            headers:{
                "Accept":"application/json, text/plain, */*",
                "Content-type":"application/json"
            },
            body:JSON.stringify({
               user_zag : this.props.route.params.user_zag
            })
        })
        .then(res=>{
            this.setState({
                loading : false,
            })
            return res.json()})
        .then(res=>{
            console.log(res)
            if(res.sms == true){
                this.setState({
                    code :  res.code,
                    phoneNumber  :res.number_,
                    smsError  : false
                })
            }
            else{
                this.setState({
                smsError : true
            })

            }
        })
        .catch(()=>{
            this.setState({
                smsError : true
            })
        })
    }
    componentDidMount(){
       this.getCodes()
    }
    tryAgain(){

    }
    retryWithEmail = () =>{
        this.setState({
            mode : 'mail'
        })

    }
    getMail = () =>{
        this.setState({
            code: '',
            phoneNumber : '',
            disableButton : false,
            codeMatch  : false,
            smsError :  false,
            loading : true,
            email : ''
        })
        fetch(URLS.VERIFY_WITH_EMAIL, {
            method : "POST",
            headers:{
                "Accept":"application/json, text/plain, */*",
                "Content-type":"application/json"
            },
            body:JSON.stringify({
               user_zag : this.props.route.params.user_zag
            })
        })
        .then(res=>{
            this.setState({
                loading : false,
            })
            return res.json()
        })
        .then((res)=>{
            if(res.email_status == true){
                this.setState({
                    code :  res.code,
                    email  :res.email,
                    smsError  : false
                })
            }
            else{
                this.setState({
                smsError : true
            })
        }
        })
        .catch(()=>{
            this.setState({
                smsError : true
            })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.mode !== this.state.mode) {
            if(this.state.mode === 'mail'){
                this.getMail()
            }    
        }
        
    }
  render() {
    return (
      <View style = {styles.Screen}>
        <View style = {[styles.container]}>
        {
                this.state.loading ? (
                    <View style = {[styles.childElem, styles.centerItem]}>
                        <ActivityIndicator size={50} color = '#8b0000'/>
                        <Text style = {[styles.h5, styles.grayText, styles.mTop15]}>Loading...</Text>
                    </View>
                ) :
                (<></>)
            }
            {
            
            this.state.smsError ? (
                <View style = {[styles.childElem, styles.centerItem]}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            code: '',
                            phoneNumber : '',
                            disableButton : false,
                            codeMatch  : false,
                            smsError :  false,
                            loading : true,
                            email  : ''
                        })
                        if(this.state.mode === 'sms'){
                            this.getCodes()
                        }
                        else{
                            this.getMail()
                        }
                        }}>
                        <View>
                            <Text style = {[styles.h2, styles.textBold,styles.primaryText, styles.textCenter]}>OOP'S !! </Text>
                            <Text style = {[styles.grayText, styles.mTop15]}>Network error! Tap here and try again</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) :(
                !this.state.loading && !this.state.smsError ? (
                    <Formik
                        initialValues={{ code : ''}}
                        validateOnMount = {false}
                        validationSchema = {this.codeVerification}
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
                                <View style = {[styles.centerItem, {
                                    marginTop : height * 0.10
                                }]}>
                                    <Text  style={[
                                        styles.h3,
                                        styles.textBold,
                                        styles.primaryText
                                    ]}>
                                        Two Step Verification
                                    </Text>
                                    <View style = {{width: '100%'}}>
                                        {
                                            this.state.mode === 'sms' ? (
                                                <Text>
                                                    {
                                                        `We have sent a verification code to ${ this.state.phoneNumber.length != 0 ? (this.state.phoneNumber[0]) : ('*')}${this.state.phoneNumber.length != 0 ? (this.state.phoneNumber[1]) : ('*')}${this.state.phoneNumber.length != 0 ? (this.state.phoneNumber[2]) : ('*')}${this.state.phoneNumber.length != 0 ? (this.state.phoneNumber[3]) : ('*')}${this.state.phoneNumber.length != 0 ? (this.state.phoneNumber[4]) : ('*')}******${this.state.phoneNumber.length != 0 ? (this.state.phoneNumber[this.state.phoneNumber.length - 2]) : ('*')}${this.state.phoneNumber.length != 0 ? (this.state.phoneNumber[this.state.phoneNumber.length - 1]) : ('*')} via sms. You shall receipt it soon.`
                                                    }
                                                </Text>
                                            ) : (
                                                <Text>
                                                    {
                                                        `We have sent a verification code to ${this.state.email} via Email. You shall receipt it soon.`
                                                    }
                                                </Text>
                                            )
                                        }
                                        {
                                        this.state.mode === 'sms' ? (
                                            <View style = {[styles.row, styles.mTop15]}>
                                                <Text style = {[styles.primaryText, styles.textBold]} onPress={this.retryWithEmail}>Try with Email</Text>
                                                <Text> if you did'nt receive any SMS.</Text>
                                            </View>
                                        ) : (<></>)
                                        }

                                    </View>
                                    <View style = {styles.mTop25}></View>
                                    <View style = {styles.row}>
                                        <TextField 
                                            placeholder = {"Code"}
                                            value = {values.code}
                                            onTextChange = {handleChange('code')}
                                            input_err = {errors.code}
                                            onBlur = {handleBlur('code')}
                                            marginNone = {true}
                                        >
                                            <Text style = {[
                                                styles.textBold,{
                                                marginTop : 4  
                                            }, styles.primaryText]}>
                                                KE
                                            </Text>
                                        </TextField>
                                    </View>
                                    {
                                        
                                    }
                                    {
                                        this.state.codeMatch &&
                                        <Alert_ status = 'Invalid code.'> 
                                            <FontAwesome5
                                                name = 'not-equal'
                                                size={18}
                                                color = {'#fff'}
                                            />
                                        </Alert_>
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
                )  :(
                    <></>
                )
            )
            }
      
        </View>
      </View>
    )
  }
}

export default TwoStepVerification
/* */
