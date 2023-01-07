import { Text, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import styles from '../styles/main'
import JobNavigation from './jobNavigation'
import Orders from '../components/orders'
import URLS from '../components/URLS'
import EmptyOrderStack from '../components/emptyStack'
import NetworkError from '../components/networkError'


export class InCompleteOrders extends Component {
    constructor(props){
        super(props)
        this.state = {
          userID : this.props.route.params.id,
          initPage : 1,
          results : [],
          startLoading : true,
          refreshing : false,
          err : false,
          starter  :false,
          startLoading  : true
        }
      }
    getJobs = async()=>{
        return new Promise(async(resolve, reject)=>{
          await fetch(URLS.GET_STATUS_ITEMS + 'userzag='+ this.props.route.params.id + '&page='+this.state.initPage + '&mode=inko')
          .then(res=>{
            this.setState({
              err: false
            })
            return res.json()})
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
    componentDidMount (){
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
              startLoading : false,
              err : true
            })
    
          })
        }
        startApp()
    }
      loadMore = async() =>{
        this.setState((state,) => ({
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
                    startLoading : false
                  })
                  if(this.state.refreshing === true){
                    this.setState({
                      refreshing : false
                    })
                  }
                } 
              })
            .catch(err=>{
              this.setState({
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
            <JobNavigation label = {'Orders'}/>
            <View style = {[styles.mTop15,styles.childElem] }>
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
                />          
                   {
                 this.state.err ?(
                <View style = {[{
                  width : '100%',
                  height : '80%'
                }, styles.centerItem]}>
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
             <View style = {[{
              width : '100%',
              height : '80%'
             }, styles.centerItem]}>
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
                    this.props.navigation.navigate('General Information',{
                      USER_ZAG :  this.state.userID
                    })
                  }}
                  pillLabel = {'Book a Job'}
                  header = 'No orders found!'
                  messageOne = "Seems like you haven't placed any order yet."
                  messageTwo = ' if you placed an order with us.'
                />
             </View>
            ): (null)
        }
            </View>
        </View>
      </View>
    )
  }
}

export default InCompleteOrders