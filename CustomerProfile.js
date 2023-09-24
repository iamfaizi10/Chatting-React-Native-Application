import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Profile from '../../components/Profile'

const CustomerProfile = () => {
  return (
    <View>
      <Profile
        type={"Customer"}
      />
    </View>
  )
}

export default CustomerProfile

const styles = StyleSheet.create({})