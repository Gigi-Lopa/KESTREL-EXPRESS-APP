
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useState, useEffect}from 'react'
import styles from '../styles/main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import JobNavigation from './jobNavigation';
import DeliveryInformation from '../components/deliveryInformation';
import CartProduct from '../components/cartProduct';
import URLS from '../components/URLS';
import STATUS from './statuses';
import * as WebBrowser from 'expo-web-browser';
import AntDesign from 'react-native-vector-icons/AntDesign'



const JobDetails = ({route, navigation}, props) => {

  let [visible, setVisible] = useState(true) 
  let [error, setError] = useState(false)
  let [iconName, setIconName] = useState('')
  let [TMode, setTMode] = useState('')
  let [CType, setCType] = useState('')
  let [weight, setWeight]= useState(0)
  let [receipt, setReceipt] = useState('')
  let [status, setStatus]= useState('')
  let [SDate, setSDate] = useState('')
  let [EDate, setEDate] = useState('')
  let [STime, setSTime] = useState('')
  let [ETime, setETime] = useState('')
  let [from, setFrom] = useState('')
  let [to, setTo]= useState('')
  let [invoice, setInvoice] = useState('')
  let [price, setPrice] = useState('')
  let [cart, setCart] = useState(null)
  let [payment_status, setPaymentStatus] = useState('')
  let [status_short, setStatusShort] = useState('')
  
  function removeSplashScreen(){
    setVisible(false)
  }

  useEffect(()=>{
    if(TMode === 'Sea'){
      setIconName('ship')
    }
    else if(TMode === 'Road'){
      setIconName('shipping-fast')
    }
    else if(TMode === 'Rail'){
      setIconName('train')
    }
    else{
      setIconName('plane')
    }

    function getInformation(){
        fetch(URLS.GET_ORDER_INFOR + route.params.jobID)
        .then(res => res.json())
        .then(res=>{
            if(!res.error){
                removeSplashScreen()
                setReceipt(res.results.RNumber)
                setCType(res.results.CType)
                setSDate(res.results.SDate)
                setEDate(res.results.EDate)
                setSTime(res.results.STime)
                setETime(res.results.ETime)
                setWeight(res.results.weight)
                setStatus(STATUS[res.results.status])
                setTMode(res.results.TMode)
                setFrom(res.results.from)
                setTo(res.results.to)
                setPrice(res.results.price)
                setCart(cart = res.cart)
                setPaymentStatus(res.results.payment_status)
                setStatusShort(res.results.status)
                setInvoice(res.results.invoice)
            }
            else{
                removeSplashScreen()
                alert('An error occured. Try again later')
            }
            
            
        })
    }
    getInformation()

  },[])

  let openB= async ()=>{
    let result = await WebBrowser.openBrowserAsync(`${URLS.IPADDRESS}/payment/form?price=${price}&status=UNPAID&receipt=${receipt}&id=${route.params.jobID}&belongsto=${route.params.USER_ZAG}`);
}
let downloadInvoice = async ()=>{
    let result = await WebBrowser.openBrowserAsync(invoice);

}
  return (
    visible ? (
        <View style = {[styles.Screen, styles.centerItem]}>
           <ActivityIndicator
            color={'#8b0000'}
            size = {35}
          />
      </View>
    ):
    (
        <View style ={styles.Screen}>
        <View  style  = {styles.container}>
            <JobNavigation label ={receipt}/>
            <ScrollView>
                <DeliveryInformation 
                    fromDate = {SDate}
                    fromTime = {STime}
                    from = {from}
                    arrivalDate = {EDate}
                    arrivalTime = {ETime}
                    destination  = {to}
                />
                <View style = {styles.mTop25}>
                    <Text style = {[
                        styles.h4,
                        styles.mBot15,
                        styles.textBold,
                        styles.primaryText
                    ]}>Cargo Status</Text>
                    <View style = {styles.row}>
                        <View style = {[styles.icons, styles.centerItem]}>
                            <FontAwesome5
                            name = {iconName}
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
                        Transportion</Text>
                    <View style = {styles.row}>
                        <View style = {[styles.icons, styles.centerItem]}>
                            <FontAwesome5
                            name = {iconName}
                            size  = {15}
                            style = {[styles.primaryText, styles.icon]}
                            />
                        </View> 
                        <View>
                            <Text style ={[styles.h5, styles.textBold]}>{TMode}</Text>
                            <Text style ={[styles.h5, styles.grayText]}>{weight != null ? (weight) : (0) + ' Kgs'}</Text>
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
                {
                    invoice != '' ? (
                        <View style= {[styles.row, styles.spaceItems,{
                            width: '100%'
                        }]}>
                            <Text style = {[
                               {
                                marginTop: 30
                               },
                                styles.h5,
                                styles.mBot15,
                                styles.textBold,
                                styles.primaryText,
                               
                                ]}>
                                Download Invoice
                            </Text>
                            <TouchableOpacity
                                style = {[
                                    styles.primary_color,
                                    styles.mTop15,
                                    {
                                        padding:15,
                                        borderRadius: 15
                                    }
                                ]}
                                onPress = {downloadInvoice}
                            >
                                <AntDesign
                                    name='clouddownload'
                                    color={'white'}
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                    ):(<></>)
                }
               
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
                {
                    payment_status === 'UNPAID' && status_short === 'WFP'? 
                    (
                    <TouchableOpacity   
                    style ={[
                        styles.btn,
                        
                        styles.marginVertical,
                        styles.primary_color
                        ]} 
                        onPress = {openB}>
                        <Text style = {[styles.textCenter, styles.tertiaryText]}>
                            Payment Information
                        </Text>     
                    </TouchableOpacity>
                    ):(
                        <TouchableOpacity   
                    style ={[
                        styles.btn,
                        
                        styles.marginVertical,
                        styles.primary_color
                        ]} 
                        onPress = {()=>{
                            navigation.goBack()
                        }}>
                        <Text style = {[styles.textCenter, styles.tertiaryText]}>
                            OK
                        </Text>     
                    </TouchableOpacity>
                    )
                }
                
            </ScrollView>
           
        </View>

        </View>
    )
   
  )
}

export default JobDetails