import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from '../styles/main'

const JobField = (props) => {
  return (
    <View style =  {styles.job_field}>
      <Text>Fullname</Text>
      <TextInput
        Value = {props.value}
        onChangeText = {props.onType}
        
      />
    </View>
  )
}

export default JobField