import { 
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid} from 'react-native'
import React,{
  useState,
  useEffect
} from 'react'
import styles from '../styles/main'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ShortNavbar from '../components/shortNavbar'
import TextField from '../components/textField'
import NoImage from '../components/noImage'
import * as ImagePicker from 'expo-image-picker';
import ProductImage from '../components/productImage'
import ShowCart from '../components/showCart'
import DateTimePicker from '@react-native-community/datetimepicker'
export default function AddJob({navigation, route}) {
  
  let [permissionStatus, setPermissionStatus] = useState(null)
  let [jobs, setJobs] = useState([])
  let [showCart, setShowCart] =useState(false)
  let [cart, setCart ] = useState(0)
  let [quantity, setQuantity] = useState('1')
  let [productName, setProductName] = useState('')
  let [productDescription, setProductDescription] = useState('')
  let [image, setImage] = useState(null)
  let [date, setDate ]= useState(new Date)
  let [show, setShow] =  useState(false)
  let [mode, setMode] = useState('')

  useEffect(()=>{
    let getPermission = async()=>{
      let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissionStatus(status)
    }
    getPermission()
  },[])

  let handleChangeProductName = (e) => {
    setProductName(e)
  }

  let handleChangeDecription = (e) =>{
    setProductDescription(e)
  }

  let addQuantity = () =>{
    setQuantity(parseInt(quantity) + 1)
  }

  let minusQuantity = () => {
    if(parseInt(quantity) >  1){
      setQuantity(parseInt(quantity) - 1)
    }
  }

  let rePick_ = ()=>{
    pickImage()
  }

  let onChange = (event, selectedDate) =>{
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  let onPick = (mode_) =>{
    setMode(mode_)
    setShow(true)
  }
  const pickImage = async () => {
    if (permissionStatus === 'granted'){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(null)
        setImage(result.uri);
      }
    }
    else if(permissionStatus !== 'granted'){
      ToastAndroid.show('CAMERA ROLL PERMISSIONS REQUIRED', ToastAndroid.LONG)
    }
  };

  let resetField = () =>{
    setProductName('')
    setProductDescription('')
    setImage(null)
    setQuantity('1')
  }
  let loadJobs = async(productvalues)=>{
    return new Promise((resolve,reject)=>{
      if(productvalues != null){
        setJobs((state)=>[...state, productvalues])
        resolve(true)
      }
    })
  }
  let deleteItem = (id)=>{
      setJobs(jobs.filter(item=> item.id !== id))
      setCart(cart - 1)
  }

  let handleAddToChart = async() =>{
    if(productDescription.length != 0 && productName != 0){
      let productvalues = {}
      let selectedJobDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
      let selectedJobTime  = date.getHours() + ':' + date.getMinutes()
      
      productvalues.productName = productName;
      productvalues.productDescription = productDescription;
      productvalues.image = image;
      productvalues.quantity = quantity;
      productvalues.collectionDate = selectedJobDate
      productvalues.collectionTime = selectedJobTime
  
      await loadJobs(productvalues)
      .then(res=>{
        if(res){
          setCart(cart + 1)
        }
      })
      .then(res=>{
        resetField()
      })
    }
    else{
      ToastAndroid.show('Product information fields empty', ToastAndroid.LONG)
    }

  }
  let cartModular = ()=>{
    setShowCart(true)
  }
  let handleCloseModel = () =>{
    setShowCart(false)
  }
  let onSubmit_ = ()=>{
      if(jobs.length !=0){
        if (route.params.mode  === 'quotation'){
          navigation.navigate('Send Quote',{
            GI :  route.params.GI,
            shippmentJobs : jobs
          } ) 
        }
       else{
        navigation.navigate('Delivery Details',{
          GI :  route.params.GI,
          shippmentJobs : jobs
        } ) 
       }
      }
      else{
        ToastAndroid.show('Cart is empty!', ToastAndroid.LONG)
      }
    
      
  }
  return (
    <View style = {styles.Screen}>
      <View style = {styles.container}>
        <ShortNavbar label ='Products Information' 
          cart = {cart}
          cartOnPress = {cartModular}
          jobs_ = {jobs}  
        >
          <MaterialCommunityIcons
            name = {'cart'}
            size = {20}
            style = {styles.primaryText}
          />
        </ShortNavbar>
          <ScrollView>
            <View style = {[styles.images_container, styles.mTop25]}>
              <View>
                {
                  image ? (
                    <ProductImage imageURI = {image} rePick ={rePick_}/>
                    
                  ) : (
                    <NoImage onPickImage = {pickImage}/>
                  )
                }
              </View>
            </View>
              <View style = {styles.mTop25}>
                <TextField
                    label = {'Product Name'}
                    placeholder = {'Product Name'}
                    value = {productName}
                    onTextChange = {handleChangeProductName}
                    marginNone = {true}
                  >
                      <MaterialCommunityIcons
                        name = 'package-variant'
                        size = {25}
                        style = {styles.primaryText}
                      />
                  </TextField>
                  <TextField
                    label = {'Product Description'}
                    placeholder = {'Product specifications....'}
                    value = {productDescription}
                    onTextChange = {handleChangeDecription}
                    marginNone = {true}
                    multiline = {true}
                  >
                      <MaterialCommunityIcons
                        name = 'fountain-pen-tip'
                        size = {25}
                        style = {styles.primaryText}
                      />
                  </TextField>
                  <View style = {[styles.row, styles.spaceItems]}>
                    <View style = {styles.w40}>
                        <Text style = {[
                        styles.h5,
                        styles.primaryText,
                        styles.textBold,
                          {
                            marginTop : 7.5
                          }
                      ]}>Quantity</Text>
                    </View>
                    <View style = {[
                      styles.row,
                      styles.w60,
                      styles.centerItem
                      ]}>
                      <TouchableOpacity style= {[
                        styles.add_btn,
                        styles.centerItem,
                        styles.primary_color
                      ]}
                        onPress = {addQuantity}
                        >
                        <MaterialCommunityIcons
                            name = 'plus'
                            size = {20}
                            style = {[
                                styles.tertiaryText,
                                {
                                    padding: 7.5
                                }
                            ]}
                        />
                      </TouchableOpacity>
                      <View>
                          <TextInput 
                            style = {
                              styles.smallInput
                            }
                            value = {quantity.toString()}
                            onChangeText = {(e)=>{
                                setQuantity(e)
                            }}
                          />
                      </View>
                      <TouchableOpacity style= {[
                        styles.add_btn,
                        styles.centerItem,
                        styles.primary_color
                      ]}
                        onPress = {minusQuantity}
                        >
                        <MaterialCommunityIcons
                            name = 'minus'
                            size = {20}
                            style = {[
                                styles.tertiaryText,
                                {
                                    padding: 7.5
                                }
                            ]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                   <Text style = {[
                    styles.h5,
                    styles.textBold,
                    styles.mTop25,
                    styles.primaryText
                   ]}>Collection/Delivery Dates</Text>
                   <Text style = {{marginTop: 7.5, color : '#708090'}}>The dates which the products will be delivered to our warehouse or we are to collect them from your address.</Text>
                    <View style= {[
                      styles.row,
                      styles.spaceItems,
                      styles.mTop25,

                    ]}>
                      <Text style = {[
                          styles.h5,
                          styles.textBold,
                          styles.primaryText,
                          {
                            marginTop : 3
                          }
                      ]}>
                        {date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}
                      </Text>
                      <TouchableOpacity style = {[
                        styles.timedatepill,
                        styles.secondaryColor,
                      ]} onPress = {()=>{
                        setShow(false)
                        onPick('date')
                      }}>
                        <Text style= {styles.tertiaryText}>Pick Date</Text>
                      </TouchableOpacity>
                    </View>
                    <View style= {[
                      styles.row,
                      styles.spaceItems,
                      styles.mTop25,

                    ]}>
                      <Text style = {[
                          styles.h5,
                          styles.textBold,
                          styles.primaryText,
                          {
                            marginTop : 3
                          }
                      ]}>
                        {date.getHours() + ':' + date.getMinutes()}
                      </Text>
                      <TouchableOpacity style = {[
                        styles.timedatepill,
                        styles.secondaryColor,
                      ]} onPress = {()=>{
                        setShow(false)
                        onPick('time')
                      }}>
                        <Text style= {styles.tertiaryText}>Pick Time</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {
                    show && (
                      <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode = {mode}
                        is24Hour = {true}
                        display = {'default'}
                        onChange = {onChange}
                      />
                    )
                  }
                  <View style = {[styles.row, styles.mTop25]}>
                     <TouchableOpacity style ={[styles.rowBtn, styles.primary_color, styles.marginVertical, {
                    width: '50%'
                  }]} onPress = {handleAddToChart}>
                      <Text style = {[styles.textCenter, styles.tertiaryText]}>
                          Add To Chart
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style ={[styles.rowBtn,styles.centerItem, {
                    width: '50%'
                    }]} onPress = {onSubmit_}>
                      <Text style = {[styles.textCenter, styles.primaryText, styles.textBold]}>
                          Submit
                      </Text>
                  </TouchableOpacity>
                </View>
          
              </View>
               
          </ScrollView>
            
      </View>
      {
        showCart && 
        <ShowCart jobs_ = {jobs} handleCloseModel = {handleCloseModel} deleteItem = {deleteItem}/>
      }
    </View>
  )
}
