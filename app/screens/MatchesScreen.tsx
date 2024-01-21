/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import { InsideTabScreenProps } from "../navigators"
import React, { FC } from "react"

// from tinderClone
import { View, Text, TouchableOpacity, ImageBackground, FlatList } from "react-native"
import { CardItem, IconTinder } from "../components"
import DEMO from "../assets/data/demo"
import styles, { DARK_GRAY } from "../assets/styles"

// PAUSE HERE: need to put the home screen in ignite format
export const MatchesScreen: FC<InsideTabScreenProps<"InsideMatches">> = observer(
  function MatchesScreen(_props) {
    return (
      <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
        <View style={styles.containerMatches}>
          <View style={styles.top}>
            <Text style={styles.title}>Matches</Text>
            <TouchableOpacity>
              <IconTinder name="ellipsis-vertical" color={DARK_GRAY} size={20} />
            </TouchableOpacity>
          </View>

          <FlatList
            numColumns={2}
            data={DEMO}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <CardItem image={item.image} name={item.name} isOnline={item.isOnline} hasVariant />
              </TouchableOpacity>
            )}
          />
        </View>
      </ImageBackground>
    )
  },
)
