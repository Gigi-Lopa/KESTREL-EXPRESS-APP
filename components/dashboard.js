import { View, Text,TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../styles/main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

const Dashboard = (props) => {
    let navigation = useNavigation()
    let openInKO = () =>{
        navigation.navigate('Incomplete Orders', {
            id : props.user_zag
        })
    }
    let openKO = ()=>{
        navigation.navigate('Complete Orders',{
            id : props.user_zag

        })
    }
    let  openPayments = () =>{
        navigation.navigate('Payments',{
            id : props.user_zag

        })
    }
  return (
    <View style = {styles.mTop15}>
        <TouchableOpacity style={[
            styles.row, 
            {
                width  : '100%'
            } ,
            styles.mBot25
            ]} 
            onPress = {openKO}
        >
            <View style = {[styles.icons, styles.centerItem]}>
                <FontAwesome5
                name = {'boxes'}
                size  = {15}
                style = {[styles.primaryText, styles.icon]}
                />
            </View>
            <View style = {[
            styles.row,
            styles.spaceItems,
            styles.order_infor
            ]}>
            <View>
                <Text style = {[styles.h4, styles.textBold]}>Complete Orders</Text>
                <Text style ={[
                styles.h6,
                styles.grayText,
                styles.textBold
                ]}>{props.value_ko}</Text>
            </View>
            <FontAwesome5
                name = 'chevron-circle-right'
                size  = {15}
                style = {[styles.primaryText,{
                marginTop :  13
                }]}
            />
            </View> 
        </TouchableOpacity>

        <TouchableOpacity style={[
            styles.row, 
            {
                width  : '100%'
            } ,
            styles.mBot25
            ]} 
            onPress = {openInKO}
        >
            <View style = {[styles.icons, styles.centerItem]}>
                <FontAwesome5
                name = {'box-open'}
                size  = {15}
                style = {[styles.primaryText, styles.icon]}
                />
            </View>
            <View style = {[
            styles.row,
            styles.spaceItems,
            styles.order_infor
            ]}>
            <View>
                <Text style = {[styles.h4, styles.textBold]}>Incomplete Orders</Text>
                <Text style ={[
                styles.h6,
                styles.grayText,
                styles.textBold
                ]}>{props.value_inko}</Text>
            </View>
            <FontAwesome5
                name = 'chevron-circle-right'
                size  = {15}
                style = {[styles.primaryText,{
                marginTop :  13
                }]}
            />
            </View> 
        </TouchableOpacity>

        <TouchableOpacity style={[
            styles.row, 
            {
                width  : '100%'
            } ,
            styles.mBot25
            ]} 
            onPress = {openPayments}
        >
            <View style = {[styles.icons, styles.centerItem]}>
                <FontAwesome5
                name = {'donate'}
                size  = {15}
                style = {[styles.primaryText, styles.icon]}
                />
            </View>
            <View style = {[
            styles.row,
            styles.spaceItems,
            styles.order_infor
            ]}>
            <View>
                <Text style = {[styles.h4, styles.textBold]}>Payments</Text>
                <Text style ={[
                styles.h6,
                styles.grayText,
                styles.textBold
                ]}>{props.payments}</Text>
            </View>
            <FontAwesome5
                name = 'chevron-circle-right'
                size  = {15}
                style = {[styles.primaryText,{
                marginTop :  13
                }]}
            />
            </View> 
        </TouchableOpacity>
    </View>
  )
}

export default Dashboard