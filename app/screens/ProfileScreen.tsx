/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import { InsideTabScreenProps } from "../navigators"
import React, { FC } from "react"

// from tinderClone
import { ScrollView, View, Text, ImageBackground, TouchableOpacity } from "react-native"
import { IconTinder, ProfileItem } from "../components"
import DEMO from "../assets/data/demo"
import styles, { WHITE } from "../assets/styles"

// PAUSE HERE: need to put the Profile screen in ignite format
export const ProfileScreen: FC<InsideTabScreenProps<"InsideProfile">> = observer(
  function ProfileScreen(_props) {
    const { age, image, info1, info2, info3, info4, location, match, name } = DEMO[7]

    return (
      <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
        <ScrollView style={styles.containerProfile}>
          <ImageBackground source={image} style={styles.photo}>
            <View style={styles.top}>
              <TouchableOpacity>
                <IconTinder
                  name="chevron-back"
                  size={20}
                  color={WHITE}
                  style={styles.topIconLeft}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <IconTinder
                  name="ellipsis-vertical"
                  size={20}
                  color={WHITE}
                  style={styles.topIconRight}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <ProfileItem
            matches={match}
            name={name}
            age={age}
            location={location}
            info1={info1}
            info2={info2}
            info3={info3}
            info4={info4}
          />

          <View style={styles.actionsProfile}>
            <TouchableOpacity style={styles.circledButton}>
              <IconTinder name="ellipsis-horizontal" size={20} color={WHITE} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.roundedButton}>
              <IconTinder name="chatbubble" size={20} color={WHITE} />
              <Text style={styles.textButton}>Start chatting</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    )
  },
)
