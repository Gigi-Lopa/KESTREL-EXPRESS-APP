import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/main'

const Links = (props) => {
  return (
    <TouchableOpacity  style ={[
      styles.nav_link, styles.mBot15,
      props.isActive ? (styles.active) : (null)]}
      onPress = {()=>{
        props.onClick(props.label)
      }}
      >
        <Text style = {[
          styles.textBold,
          props.isActive ?(styles.nav_link_active): (null)
        ]}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export default Links