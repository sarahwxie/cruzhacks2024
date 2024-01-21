import React from "react"
import { Text, TouchableOpacity } from "react-native"
import IconTinder from "./IconTinder"
import styles, { DARK_GRAY } from "../assets/styles"

const City = () => (
  <TouchableOpacity style={styles.city}>
    <Text style={styles.cityText}>
      <IconTinder name="location-sharp" size={13} color={DARK_GRAY} /> New York
    </Text>
  </TouchableOpacity>
)

export default City
