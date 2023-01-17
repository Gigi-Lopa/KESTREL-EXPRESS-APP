import { 
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import React , {Component} from 'react'
import styles from '../styles/main'
import ShortNavbar from '../components/shortNavbar'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TextField from '../components/textField'
import { Formik } from 'formik'
import * as yup from 'yup'
import URLS from '../components/URLS'
import { ActivityIndicator } from 'react-native'
import Alert_ from '../components/alert'
import SmallReceipt from '../components/smallReceipt'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from '../components/FIREBASE'


export class AddDeliveryInformationScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      submitConfirmation : null,
      receiptData : null,
      disableButton : false,
      index : 0,
      uploadError  : false,
      values  : null,
      receipt  : ''
    }
  }

  componentDidMount(){
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
  }

  deliverySchema = yup.object().shape({
    fullname : yup.string().required(),
    email : yup.string().email().required(),
    mobileNumber  : yup.string().required(),
    nationalIDNumber  : yup.string().required()
  })

  generateString = (length = 5)=>{
    return new Promise((resolve, reject)=>{
        try{
            const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = 'KE';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) { 
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            resolve(result)
           
        }
        catch (e){
            reject(false)
        }
    })
  }
  handleCancel = () =>{
      this.props.navigation.popToTop()
   }


  postAdditionalInformation = (values) =>{
    return new Promise((resolve, reject)=>{
      fetch(URLS.ADD_JOB_INFORMATION,{
        method : 'POST',
        headers: {
          "Accept":"application/json, text/plain, */*",
          "Content-type":"application/json"
        },
        body : JSON.stringify({
          generalInformation: this.props.route.params.GI,
          shippmentJobs : this.props.route.params.shippmentJobs,
          deliveryInformation : values,
          receipt : this.state.receipt
        })
      })
      .then(res=>res.json())
      .then((res)=>{
        if(res.Message === true){
          this.setState({
            disableButton :false,
            receiptData: res,
          })
         
          resolve(true)
        }
        else{
          this.setState({
            disableButton :false,
            uploadError  : true
          })
        }
      })
      .catch((err)=>{
        this.setState({
          disableButton :false,
          uploadError  : true
        })
      })
    })
  }

  onSubmit_ = async(values) =>{

    this.setState({
      disableButton : true,
      values : values,
      receipt : await this.generateString()
    })

    if(this.props.route.params.shippmentJobs.length != 0){   
      let id = 0
      this.props.route.params.shippmentJobs.map(async(job)=>{
        
        let name =  this.state.receipt + '00' + id + '.jpg'
        id = id + 1
        if(job.image != null){
          let blob = await new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.onload = ()=>{
              resolve(xhr.response);
            }
            xhr.onerror=()=>{
              resolve(xhr.response)
            }
            xhr.responseType = 'blob'
            xhr.open('GET', job.image, true)
            xhr.send(null)
          })
          
          const fileRef = ref(getStorage(), name);
          
          await uploadBytes(fileRef, blob)
          .then(async (r)=>{
            await getDownloadURL(fileRef)
            .then(url=>{
              job.uri = url
              this.setState({
                index  : this.state.index + 1
              })
              blob.close();
            })
           
          })
          .catch(err=>{
            this.setState({
              index  : this.state.index + 1
            })
            ToastAndroid.show('Some at index[ '+ ( index + 1 ) + ' ] could not be sent', ToastAndroid.LONG)
            blob.close()
          })
        }
        else{
          job.uri  = 'NuN'
          this.setState({
            index  : this.state.index + 1
          })
        }

        
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      if(this.state.index === this.props.route.params.shippmentJobs.length - 1){
        this.postAdditionalInformation(this.state.values)
      }
      else if (this.state.index === this.props.route.params.shippmentJobs.length){
        this.postAdditionalInformation(this.state.values)
      }
    }

  }
// add promise here 
  render(){
    return (
      <View style = {styles.Screen}>
          <View style = {styles.container}>
              <ShortNavbar label = 'Delivery Information'/>
              <ScrollView style = {styles.mTop25}>
                <Formik
                  initialValues={{ 
                      fullname: '', 
                      email : '',
                      mobileNumber : '',
                      nationalIDNumber : ''
                      
                  }}
                  validateOnMount = {false}
                  validationSchema = {this.deliverySchema}
                  onSubmit={values => {   
                    this.setState({
                      index : 0
                    })
                      this.onSubmit_(values)
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
                        {
                          this.state.uploadError && 
                            <Alert_ status = {"Invalid Email"}>
                              <FontAwesome
                                  style = {[
                                      styles.h5, 
                                  ]}
                                  color = {'white'}
                                  name = 'warning'
                              />
                            </Alert_>
                        }{
                          this.state.disableButton ? (
                            <View style = {[styles.row, styles.mBot25]}>
                              <View style = {[{
                                width : '85%'
                              },styles.spaceItems]}>
                                <Text style = {[styles.h5, styles.primaryText, styles.textBold]}>Uploading Images</Text>
                              </View>
                              <View style= {styles.row}>
                                <Text>
                                  {this.state.index} 
                                </Text>
                                <Text style = {{
                                  marginLeft : 5,
                                  marginRight : 5
                                }}>/</Text>
                                <Text>
                                  {this.props.route.params.shippmentJobs.length}
                                </Text>
    
                              </View>
                          </View>
                          
                          ) : (<></>)
                        }
                       
                        <View style = {styles.row}>
                          <TouchableOpacity style ={[styles.rowBtn, styles.primary_color, styles.marginVertical, {
                            width: '50%'
                          }]} onPress = {handleSubmit}   disabled = {this.state.disableButton} >
                                 {
                                  this.state.disableButton ? (
                                      <ActivityIndicator  color = {'#fff'} size = {25} />
                                  ):(
                                      <Text style = {[styles.textCenter, styles.tertiaryText]}>
                                          Submit
                                      </Text>
                                  )
                              }   
                          </TouchableOpacity>
                          <TouchableOpacity style ={[styles.rowBtn,styles.centerItem, {
                            width: '50%'
                            }]} onPress = {this.handleCancel}>
                              <Text style = {[styles.textCenter, styles.primaryText, styles.textBold]}>
                                  Cancel
                              </Text>
                          </TouchableOpacity>
                        </View>
                 
                      </View>
                     
                    )}}
                    
                  </Formik>
               
              </ScrollView>
          </View>
          {
            this.state.receiptData != null ?(
              <SmallReceipt
              response = {this.state.receiptData}
              />
            ):(<></>)
          }
      </View>
    )
  }
 
}
export default AddDeliveryInformationScreen