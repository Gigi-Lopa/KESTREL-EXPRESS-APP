import { View, Text, TouchableOpacity} from 'react-native'
import React, {useState}from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import SelectDropdown from 'react-native-select-dropdown'
import ShortNavbar from '../components/shortNavbar'
import styles from '../styles/main'

const AddGeneralInformation = ({navigation, route}) => {

  let [shippingMode, setShippingMode] = useState('')
  let [cargoType, setCargoType] = useState('')

  let shippingModes = ['Air', 'Sea', 'Road', 'Rail']
  let typeOfCargos = ['Perishable','Non Perishable', 'Hazardous','Non Hazardous']

  let buttonTextStyle_= {
    position : 'absolute',
    color : '#8b0000',
    fontSize  : 15
  }

  let onSubmit_ = () =>{
    let generalInformation  = {}
      if(shippingMode.length === 0){
        generalInformation.shippingMode = 'Air'
      }
      else if (shippingMode.length != 0){
        generalInformation.shippingMode = shippingMode
      }
      if(cargoType.length === 0){
        generalInformation.typeOfCargo = 'Non Perishable'
      }
      else if(cargoType.length != 0){
        generalInformation.typeOfCargo = cargoType
      }

      generalInformation.USER_ZAG = route.params.USER_ZAG

      navigation.navigate('Product Information', {
        GI : generalInformation
      })
  }

  let handleCancel =() =>{
    navigation.goBack()
  }

  return (
    <View style = {styles.Screen}>
        <View style = {styles.container}>
            <ShortNavbar label ='Shipment Information' >
            <Entypo
                name = {'shopping-cart'}
                size = {20}
                style = {styles.primaryText}
            />
            </ShortNavbar>
            <View style = {[styles.spaceItems, styles.mTop25,
            {
                height: '92%'
            }]}>
                <View>
                    <Text style = {[
                        styles.h5,
                        styles.primaryText,
                        styles.textBold,
                        styles.mBot15
                        ]}>Shipping Mode</Text>
                        <SelectDropdown
                        data={shippingModes}
                        buttonStyle = {styles.dropDownBtn}
                        buttonTextStyle = {buttonTextStyle_}
                        onSelect= {(selectedItem, index)=>{
                        setShippingMode(shippingModes[index])
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                    />
                    <Text style = {[
                        styles.h5,
                        styles.primaryText,
                        styles.textBold,
                        styles.mBot15,
                        styles.mTop15
                        ]}>Type Of Cargo</Text>
                    <SelectDropdown
                        
                        data={typeOfCargos}
                        buttonStyle = {styles.dropDownBtn}
                        buttonTextStyle = {buttonTextStyle_}
                        onSelect= {(selectedItem, index)=>{
                        setCargoType(typeOfCargos[index])
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                    />
                </View>
                <View style = {[styles.row, styles.mTop25]}>
                     <TouchableOpacity style ={[styles.rowBtn, styles.primary_color, styles.marginVertical, {
                    width: '50%'
                  }]} onPress = {onSubmit_}>
                      <Text style = {[styles.textCenter, styles.tertiaryText]}>
                          Proceed
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style ={[styles.rowBtn,styles.centerItem, {
                    width: '50%'
                    }]} onPress = {handleCancel}>
                      <Text style = {[styles.textCenter, styles.primaryText, styles.textBold]}>
                          Cancel
                      </Text>
                  </TouchableOpacity>
                </View>
            </View>

        </View>
    </View>
  )
}

export default AddGeneralInformation