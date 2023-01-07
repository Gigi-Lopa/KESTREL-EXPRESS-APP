import { View, Text, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, {useState}from 'react'
import styles from '../styles/main'
import { StatusBar } from 'expo-status-bar';
import JobNavigation from './jobNavigation'
import { useEffect } from 'react'
import URLS from '../components/URLS';
import NoImage from '../components/noImage';


const ProductDetails = (props) => {

    let [quantity, setQuantity] = useState(0)
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState('')

    let addQuantity = () =>{}
      
    let minusQuantity = () => {}

    useEffect(()=>{
        fetch(URLS.GET_CART_INFOR+props.route.params.id)
        .then(res=>res.json())
        .then(res=>{
            if(!res.error){
                setName(res.results.productName)
                setImage(res.results.imageLocation)
                setDesc(res.results.productDescription)
                setQuantity(res.results.productQuantity)
            }
            else{
                alert('An error occured. Try again later')
            }
        })
        .catch(err=>{
            
        })
    },[])

  return (
    <View style = {[styles.Screen]}>
    <StatusBar style="dark" />
        <View style = {styles.container}>
            <JobNavigation label = {props.route.params.receiptNumber}/>
            <ScrollView>
                <View style = {styles.mTop25}>
                    {
                        image != '' ?
                        (
                            <Image style = {styles.image} source = {{uri : image}}/>
                        ) 
                        :(
                            <NoImage addImage  = {false} />
                        )
                    }
                </View>
                <View>
                    <Text style = {[
                        styles.h4,
                        styles.primaryText,
                        styles.textBold,
                        styles.mTop15,
                        styles.mBot15
                    ]}>{name}</Text>
                    <Text style = {[
                        styles.h5,
                        {
                            color: '#333',
                            lineHeight: 25
                        }
                    ]}>{desc}</Text>
                    <View style = {[styles.row, styles.spaceItems, styles.mTop25]}>
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
                
                   
                </View>   
            </ScrollView>
        </View>
    </View>
  )
}

export default ProductDetails