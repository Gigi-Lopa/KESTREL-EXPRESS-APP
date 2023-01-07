import { View, ActivityIndicator} from 'react-native'
import React, {Component} from 'react'
import styles from '../styles/main'
import URLS from '../components/URLS'
import Profile from './Profile'



export class ProfileActitvity extends Component {
  constructor(){
    super()
    this.state = {
    dashboard : true,
    fullname : '',
    address : '',
    phone : '',
    occupation : '',
    date : '',
    month : '',
    year : '',
    email : '',
    KO : 0.001,
    inKo : 0.001,
    visible : true,
    netWorkErr : false,
    payments  : 0
    }
  }

  async getInformation(){
    await fetch(URLS.GET_USER_PROFILE+this.props.route.params.USER_ZAG)
    .then(res=>res.json())
    .then(res=>{
      if(res.results.status){
        this.setState({
          fullname : res.results.userInformation.name,
          address :res.results.userInformation.address,
          address  : res.results.userInformation.address,
          phone : res.results.userInformation.phone,
          occupation  : res.results.userInformation.occupation,
          date :  res.results.userInformation.dob.date,
          month :  res.results.userInformation.dob.month,
          year : res.results.userInformation.dob.year,
          email :  res.results.email,
          KO : res.results.transactions.KO,
          inKo :res.results.transactions.inKO,
          visible  : false,
          netWorkErr : false,
          payments : res.results.transactions.payments
        })  
      }
    })
    .catch(err=>{
      console.log(err)
      this.setState({
        visible : false,
        netWorkErr : true
      })
      console.log(err)
    })
  }

  componentDidMount(){
    this.getInformation()  
  }

  render() {
    return (
      this.state.visible ?(
        <View style = {[styles.Screen, styles.centerItem]}>
          <ActivityIndicator
            color={'#8b0000'}
            size = {35}
          />
        </View>
      ):(
        <Profile
        fullname ={this.state.fullname}
        address ={this.state.address}
        phone = {this.state.phone}
        occupation = {this.state.occupation}
        email ={this.state.email}
        KO ={this.state.KO}
        inKo ={this.state.inKo}
        netWorkErr = {this.state.netWorkErr}
        user_zag = {this.props.route.params.USER_ZAG}
        payments = {this.state.payments}
        />
      )
    )
  }
}

export default ProfileActitvity