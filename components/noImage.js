import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../styles/main'

export default function NoImage(props) {
    const {addImage = true} = props;
  return (
    <View style = {[
        styles.noImage,
        styles.image,
        styles.centerItem,
        styles.container_pad]}>
        <MaterialCommunityIcons
            name = 'image-broken'
            style = {[styles.grayText, styles.mBot25]}
            size = {45}
        />
        {
            addImage ? (
                <View style= {[
                    styles.absolute_add_image,
                    styles.row]}>
                    
                    <View style = {[styles.w80,styles.centerItem]}>
                        <Text style= {[
                            styles.textCenter,
                            styles.h5,
                            styles.textBold,
                            {
                                marginLeft :65
                            } ]}
                        >Add image</Text>
                    </View>
                    
                    <TouchableOpacity style= {[
                        styles.add_btn,
                        styles.w20,
                        styles.centerItem,
                        styles.primary_color
                    ]}
                        onPress = {props.onPickImage}
                    >
                        <FontAwesome5
                            name = 'plus'
                            size = {20}
                            style = {[
                                styles.tertiaryText,
                                {
                                    padding: 15
                                }
                            ]}
                        />
                    </TouchableOpacity>
                </View>
            ):(
                <></>
            )
        }
      
    </View>
  )
}