import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AboutUsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50'
  }
})

export default AboutUsScreen
