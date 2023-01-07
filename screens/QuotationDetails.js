
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useState, useEffect}from 'react'
import styles from '../styles/main'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import JobNavigation from './jobNavigation';
import CartProduct from '../components/cartProduct';
import URLS from '../components/URLS';
import STATUS from './statuses';
import * as WebBrowser from 'expo-web-browser';



const QuotationDetails = ({route, navigation}, props) => {

  let [visible, setVisible] = useState(true) 
  let [error, setError] = useState(false)
  let [iconName, setIconName] = useState('')
  let [receipt, setReceipt] = useState('')
  let [message, setMessage]= useState('')
  let [response, setResponse] = useState('')
  let [invoice, setInvoice]= useState('')
  let [date, setDate] = useState('')
  let [from, setFrom] = useState('')
  let [to, setTo]= useState('')
  let [price, setPrice] = useState('')
  let [cart, setCart] = useState(null)
  let [status, setStatus] = useState('')
  
  function removeSplashScreen(){
    setVisible(false)
  }

  useEffect(()=>{
    setIconName('comment-question')

    function getInformation(){
        fetch(URLS.GET_QUOTE_INFOR + route.params.quoteID)
        .then(res => res.json())
        .then(res=>{
            if(!res.error){
                removeSplashScreen()
                setReceipt(res.results.RNumber)
                setDate(res.results.date)
                setStatus(STATUS[res.results.status])
                setFrom(res.results.from)
                setTo(res.results.to)
                setPrice(res.results.price)
                setCart(cart = res.cart)
                setStatus(res.results.status)
                setMessage(res.results.message)
                setInvoice(res.results.invoice)
                setResponse(res.results.response === '' ? 'PENDING' : res.results.response)
            }
            else{
                removeSplashScreen()
                console.log()
                alert('An error occured. Try again later')
            }
            
            
        })
    }
    getInformation()

  },[])

  let openB= async ()=>{
    let result = await WebBrowser.openBrowserAsync(invoice);
}
  return (
    visible ? (
        <View style = {[styles.Screen, styles.centerItem]}>
          <ActivityIndicator
            color={'#8b0000'}
            size = {30}
          />
      </View>
    ):
    (
        <View style ={styles.Screen}>
        <View  style  = {styles.container}>
            <JobNavigation label ={receipt}/>
            <ScrollView>
                <View>
                    <Text
                    style = {[
                        styles.h5,
                        styles.grayText
                    ]}>
                        From
                    </Text>
                    <Text  
                        style = {[
                            styles.h4,
                            styles.textBold
                        ]}>
                        {from}
                    </Text>
                </View>
                <View>
                    <Text
                    style = {[
                        styles.h5,
                        styles.grayText
                    ]}>
                        To
                    </Text>
                    <Text  
                        style = {[
                            styles.h4,
                            styles.textBold
                        ]}>
                        {to}
                    </Text>
                </View>
                <View style = {styles.mTop25}>
                    <Text style = {[
                        styles.h4,
                        styles.mBot15,
                        styles.textBold,
                        styles.primaryText
                    ]}>Status</Text>
                    <View style = {styles.row}>
                        <View style = {[styles.icons, styles.centerItem]}>
                            <MaterialCommunityIcons
                            name = {'comment-question'}
                            size  = {15}
                            style = {[styles.primaryText, styles.icon]}
                            />
                        </View> 
                        <View style = {[styles.process, {
                            marginTop:7.5
                        }]}>
                            <Text style ={[styles.h5, styles.textBold]}>{status}</Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.mTop25}>
                    <Text style = {[
                        styles.h4,
                        styles.mBot15,
                        styles.textBold,
                        styles.primaryText
                        ]}>
                        Description</Text>
                        <View>
                            <Text style ={[styles.h5]}>{message}</Text>
                        </View>
                    
                </View>
                <View style = {styles.mTop25}>
                    <Text style = {[
                        styles.h4,
                        styles.mBot15,
                        styles.textBold,
                        styles.primaryText
                        ]}>
                        Response</Text>
                    <View style = {styles.row}>
                        <View>
                            <Text style ={[styles.h5]}>{response}</Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.mTop15}></View>
                <View style = {[styles.row, styles.mTop25]}>
                    <View style = {[{width: '47%'}, styles.border]}>
                        <Text style = {[
                            {fontSize : 18},
                            styles.textBold,
                            styles.textCenter
                            ]}>Quantity</Text>
                        <Text style = {[
                            styles.textCenter,
                            styles.grayText,
                            styles.h5
                        ]}>{cart != null ? (cart.length) : (0) }</Text> 
                    </View>
                    <View style = {[{width: '47%'}, styles.border, styles.mLeft15]}>
                        <Text style = {[
                            {fontSize : 18},
                            styles.textBold,
                            styles.textCenter
                            ]}>Total Cost</Text>
                        <Text style = {[
                            styles.textCenter,
                            styles.grayText,
                            styles.h5
                        ]}>{'$ '+ price}</Text> 
                    </View>
                </View>

                <View style = {styles.mTop25}>
                    <Text style = {[
                        styles.h4,
                        styles.mBot15,
                        styles.textBold,
                        styles.primaryText
                        ]}>Cart</Text>
                    {
                        cart != null ? (
                            cart.map(c=>{
                                return(
                                    <CartProduct 
                                    name = {c.name}
                                    quantity = {c.quantity}
                                    image = {c.image}
                                    id = {c.id}
                                    receiptNumber = {receipt}
                                    />
                                )
                                
                            })
                        ) :
                       ( <></>)
                    }
                </View>
                { invoice != ''? (

<View>
<TouchableOpacity 
  
style ={[
    styles.btn,
    styles.marginVertical,
    styles.primary_color
    ]} 
    onPress = {openB}>
    <Text style = {[styles.textCenter, styles.tertiaryText]}>
        Download Invoice
    </Text>
</TouchableOpacity>
</View>

                ) : (<></>)}
            </ScrollView>
        </View>
    </View>
    )
   
  )
}

export default QuotationDetails