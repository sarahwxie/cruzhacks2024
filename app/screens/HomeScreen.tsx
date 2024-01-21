/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "../navigators"
import React, { FC, useState } from "react"
import { View, ImageBackground } from "react-native"

// from tinderClone
import { City, Filters, CardItem } from "../components"
import styles from "../assets/styles"
import DEMO from "../assets/data/demo"

// manual import
import CardStack, { Card } from "../manual-libraries/react-native-card-stack-swiper"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}
// PAUSE HERE: need to put the home screen in ignite format
export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const [swiper, setSwiper] = useState<CardStack | null>(null)

  return (
    <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          <Filters />
        </View>

        <CardStack
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper): void => setSwiper(newSwiper)}
        >
          {DEMO.map((item) => (
            <Card key={item.id}>
              <CardItem
                hasActions
                image={item.image}
                name={item.name}
                description={item.description}
                matches={item.match}
              />
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  )
})
