/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import { InsideTabScreenProps } from "../navigators"
import React, { FC } from "react"
import { Text, TouchableOpacity, ImageBackground, View, FlatList } from "react-native"

// from tinderClone
import DEMO from "../assets/data/demo"
import { IconTinder, Message } from "../components"
import styles, { DARK_GRAY } from "../assets/styles"

// PAUSE HERE: need to put the Chat screen in ignite format
export const ChatScreen: FC<InsideTabScreenProps<"InsideChat">> = observer(function ChatScreen(
  _props,
) {
  return (
    <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <IconTinder name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={DEMO}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Message image={item.image} name={item.name} lastMessage={item.message} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  )
})
