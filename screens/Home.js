import React, { Component } from 'react'
import  {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator
}
from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import EmptyOrderStack from '../components/emptyStack'
import NetworkError from '../components/networkError'
import Searchbar from '../components/searchbar'
import Addorder from '../components/addorder'
import Navbar from '../components/navbar'
import Orders from '../components/orders'
import Links from '../components/links'
import URLS from '../components/URLS'
import styles from '../styles/main'


export class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      userID : null,
      showDrawer : false,
      initPage : 1,
      results : [],
      startLoading : true,
      refreshing : false,
      err : false,
      starter  :false,
      startLoading  : true,
      loadingMore : false
    }
  }
  checkAvailability(){
    fetch(URLS.CHECK_DELETION+this.state.userID)
    .then(res=>res.json())
    .then((res)=>{
      if(res.deletion){
        this.props.navigation.replace('Sign Out')
      }
      else{
        resolve(true)
      }
    })
  }

  getJobs = async()=>{
    return new Promise(async(resolve, reject)=>{
      await fetch(URLS.GET_JOBS + 'userzag='+this.state.userID + '&page='+this.state.initPage)
      .then(res=>res.json())
      .then(res=>{
        if(res.Message === true){
          if(res.jobs.length != 0){
            res.jobs.map((job)=>{
              this.setState(prevState => ({
                results : [...prevState.results, job],
              }));
            })
            resolve(true)
          }
          else{
            this.state.starter = true
            resolve(true)
          }
        }
        else{
          reject(false)
        }
      
      })
      .catch(()=>{
        this.state.err = true
        reject(false)
      })
    })
  }

  onTap = ()=>{
    this.props.navigation.navigate('Search Screen',{
      USER_ZAG :  this.state.userID
    })
  }

  async componentDidMount (){
    let userId = await AsyncStorage.getItem('userId')
    this.state.userID = userId

    let startApp = async()=>{
      await this.getJobs()
      .then((res)=>{
      if(res){
          this.setState({
            startLoading : false
          })
        } 
      })
      .catch(err=>{
        this.setState({
          startLoading : false
        })

      })
    }
    this.checkAvailability()
    startApp()
   
  }

  openCustomDrawer = () =>{
    this.setState({
      showDrawer : !this.state.showDrawer
    })
  }

  onNavToAddJob = () =>{
    if(this.state.showDrawer){
      this.openCustomDrawer()
    }
    this.props.navigation.navigate('General Information',{
      USER_ZAG :  this.state.userID
    })
  }
  onNavToGetQoute = () =>{
    if(this.state.showDrawer){
      this.openCustomDrawer()
    }
    this.props.navigation.navigate('Get Qoute',{
      USER_ZAG :  this.state.userID
    })
  }

  handleMenuBarNavigation = (mode) =>{
    if(this.state.showDrawer){
      this.openCustomDrawer()
    }
    if (mode === 'Profile'){
      this.props.navigation.navigate('Profile',{
        USER_ZAG :  this.state.userID
      })
    }
    else if(mode === 'Quotations'){
      this.props.navigation.navigate('Quotations',{
        USER_ZAG :  this.state.userID
      })
    }
    else if(mode === 'Analytics'){
      this.props.navigation.navigate('Analytics')
    }
    else if(mode === 'Feedback'){
      this.props.navigation.navigate('Feedback')      
    }
  }

  loadMore = async() =>{
    this.setState((state,) => ({
      loadingMore : true,
      initPage: state.initPage + 1
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.initPage !== this.state.initPage) {
        console.log(this.state.initPage)
        this.getJobs()
        .then((res)=>{
          if(res){
              this.setState({
                startLoading : false,
                loadingMore : false
              })
              if(this.state.refreshing === true){
                this.setState({
                  refreshing : false,
                  loadingMore : false
                })
              }
            } 
          })
        .catch(err=>{

          ToastAndroid.show('An Error Occured', ToastAndroid.LONG)
          this.setState({
            loadingMore : false,
            startLoading : false
          })
  
        })
    }
    if(this.state.refreshing  && this.state.results.length === 0){
      this.getJobs()
        .then((res)=>{
          if(res){
              this.setState({
                startLoading : false,
                refreshing : false,
                initPage : 1
              })
            } 
          })
        .catch(err=>{
          this.setState({
            startLoading : false
          })
  
        })
    }
  }

  onRefresh = ()=>{
    this.setState({
      results : [],
      startLoading : true,
      refreshing : true
    })
  }

  render() {
    return (
      <View style = {styles.Screen}>
      <View style = {styles.container}>
        <Navbar  onShowDrawer = {this.openCustomDrawer} closeCustomDrawer = {this.closeCustomDrawer} showDrawer = {this.state.showDrawer}/>
        <Searchbar onTap = {this.onTap}/> 
        <Addorder navToAddJob = {this.onNavToAddJob} onNavToGetQoute = {this.onNavToGetQoute}/>
        <Text style = {
            [
              styles.h4,
              styles.secondaryText,
              styles.mBot25,
        
            ]
          }>Tracking Shipments</Text>
          {
            this.state.startLoading ?
            (
              <ActivityIndicator  color = {'#8b0000'} size = {25}/>
            ):(
              null
            )

          }
          <Orders
            err = {this.state.err}
            startLoading= {this.state.startLoading}
            results = {this.state.results}
            loadMore = {this.loadMore}
            refreshing = {this.state.refreshing}
            onRefresh = {this.onRefresh}
            USER_ZAG = {this.state.userID}
            loadingMore = {this.state.loadingMore}
            />          
        {
          this.state.err ?(
            <View style= {styles.errorComp}>
              <NetworkError
                onPress = {async()=>{
                  this.setState({
                    startLoading : true,
                    err : false
                  })
          
                  await this.getJobs()
                  .then((res)=>{
                  if(res){
                    this.setState({
                      startLoading : false
                    })
            
                    } 
                  })
                  .catch(err=>{
                    this.setState({
                      startLoading : false
                    })
            
                  })
                }}
              />
            </View>
            
          ):(
            null
          )
        }
        {
          this.state.results.length === 0 && 
          this.state.starter && 
          !this.state.refreshing ?
          (
            <View style = {styles.errorComp}>
              <EmptyOrderStack
                onPressRefresh = {async()=>{
                  this.setState({
                    startLoading : true,
                    starter : false
                  })
          
                  await this.getJobs()
                  .then((res)=>{
                  if(res){
                    this.setState({
                      startLoading : false
                    })
            
                    } 
                  })
                  .catch(err=>{
                    this.setState({
                      startLoading : false
                    })
            
                  })
                }}
                pillAction = {()=>{
                  this.onNavToAddJob()
              }}
              pillLabel = {'Book a Job'}
              header = 'No orders found!'
              messageOne = "Seems like you haven't placed any order yet."
              messageTwo = ' if you placed an order with us.'
              />
            </View>
          ): (null)
        }
        {/* <SearchScreen onClose = {cancelSearchMode}/> */}
      </View>
      {
        this.state.showDrawer && (
          <View style = {[styles.drawer]}>
              <View style = {{width : '100%'}}>
                <FontAwesome5
                  name = {'times'}
                  style = {[
                    styles.closeNav,
                    styles.h4,
                    styles.mRight15,
                    styles.mTop15,
                    styles.primaryText]} 
                    onPress = {this.openCustomDrawer}          

                />
              </View>
              <View style = {styles.drawer_content}>
                <Links label  =  {'Home'} isActive = {true} onClick = {this.handleMenuBarNavigation}/>
                <Links label = {'Profile'} isActive = {false} onClick = {this.handleMenuBarNavigation}/>
                <Links label = {'Quotations'} isActive = {false} onClick = {this.handleMenuBarNavigation}/>
                <Links label = {'Feedback'} isActive = {false} onClick = {this.handleMenuBarNavigation}/>

              </View>

          </View> 
        )
      }
       
    </View>
    )
  }
}

export default Home