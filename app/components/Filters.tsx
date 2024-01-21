import React from "react"
import { Text, TouchableOpacity } from "react-native"
import IconTinder from "./IconTinder"
import styles, { DARK_GRAY } from "../assets/styles"

const Filters = () => (
  <TouchableOpacity style={styles.filters}>
    <Text style={styles.filtersText}>
      <IconTinder name="filter" size={13} color={DARK_GRAY} /> Filters
    </Text>
  </TouchableOpacity>
)

export default Filters
