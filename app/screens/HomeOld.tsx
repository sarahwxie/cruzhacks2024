/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"
// import CardStack, { Card } from "react-native-card-stack-swiper"
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native"
import { CardItemHandle, TinderCard } from "rn-tinder-card"
// import { City, Filters, CardItem } from "../components"

// import styles from "../assets/styles"
// import DEMO from "../assets/data/demo"

const data = [
  "https://images.unsplash.com/photo-1681896616404-6568bf13b022?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
  "https://images.unsplash.com/photo-1681871197336-0250ed2fe23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
  "https://images.unsplash.com/photo-1681238091934-10fbb34b497a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1282&q=80",
]

const Home = () => {
  const tinderCardsRef = React.useRef<Array<CardItemHandle | null>>([])

  const OverlayRight = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "green",
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Like</Text>
      </View>
    )
  }
  const OverlayLeft = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "red",
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Nope</Text>
      </View>
    )
  }
  const OverlayTop = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "blue",
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Super Like</Text>
      </View>
    )
  }

  const OverlayBottom = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "red",
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Super Dislike</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      {data.map((item, index) => {
        return (
          <View style={styles.cardContainer} pointerEvents="box-none" key={index}>
            <TinderCard
              ref={(el) => (tinderCardsRef.current[index] = el)}
              cardWidth={380}
              cardHeight={730}
              OverlayLabelRight={OverlayRight}
              OverlayLabelLeft={OverlayLeft}
              OverlayLabelTop={OverlayTop}
              OverlayLabelBottom={OverlayBottom}
              cardStyle={styles.card}
              onSwipedRight={() => Alert.alert("Swiped right")}
              onSwipedTop={() => Alert.alert("Swiped Top")}
              onSwipedLeft={() => Alert.alert("Swiped left")}
              onSwipedBottom={() => Alert.alert("Swiped bottom")}
            >
              <Image source={{ uri: item }} style={styles.image} />
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() => {
                    tinderCardsRef.current?.[index]?.swipeLeft()
                  }}
                >
                  <Text style={styles.buttonLabelText}>Nope</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    tinderCardsRef.current?.[index]?.swipeTop()
                  }}
                >
                  <Text style={styles.buttonLabelText}>Super</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    tinderCardsRef.current?.[index]?.swipeRight()
                  }}
                >
                  <Text style={styles.buttonLabelText}>Yes</Text>
                </Pressable>
              </View>
            </TinderCard>
          </View>
        )
      })}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    bottom: 64,
    flexDirection: "row",
    justifyContent: "space-evenly",
    left: 0,
    width: "100%",
    zIndex: 100,
  },
  buttonLabelText: { color: "#000000", fontSize: 32, fontWeight: "bold" },
  card: {
    borderRadius: 48,
    position: "relative",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    borderRadius: 48,
    height: "100%",
    width: "100%",
  },
  overlayLabelContainer: {
    alignItems: "center",
    borderRadius: 48,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  overlayLabelText: { color: "#ffffff", fontSize: 32, fontWeight: "bold" },
  wrapper: {
    flex: 1,
  },
})
