import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../styles/main'
import EvilIcons from 'react-native-vector-icons/EvilIcons'



let dummyImage = require('../assets/profile-img1.jpg')

const ProfileInfor = (props) => {
  return (
    <View style = {[
        styles.row,
        styles.mTop25
        ]}>
        <View>
          <Image source={dummyImage} style = {styles.profileImage}/>
        </View>
        <View style = {[styles.w60, styles.row, styles.mLeft15]}>
          <View style = {[styles.w50, styles.mTop25]}>
            <Text style = {[
                styles.h4,
                styles.textBold
            ]}>{props.name}</Text>
            <Text style = {[
                styles.grayText
            ]}>{props.email}</Text>
          </View>
          <TouchableOpacity onPress={props.onClick}>
            <EvilIcons
              name = 'pencil'
              size={25}
              color  = 'gray'
              style = {[
                {
                  marginTop : 30,
                  marginLeft  : 20
                }
              ]}
            />
          </TouchableOpacity>
        </View>

      </View>
  )
}

export default ProfileInfor