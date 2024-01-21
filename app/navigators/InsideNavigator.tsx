import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { HomeScreen } from "../screens"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { PRIMARY_COLOR, DARK_GRAY, BLACK, WHITE } from "../assets/styles"
import TabBarIcon from "app/components/TabBarIcon"
import { MatchesScreen } from "app/screens/MatchesScreen"
import { ChatScreen } from "app/screens/ChatScreen"
import { ProfileScreen } from "app/screens/ProfileScreen"

export type InsideTabParamList = {
  InsideExplore: undefined
  InsideMatches: { queryIndex?: string; itemIndex?: string }
  InsideChat: undefined
  InsideProfile: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type InsideTabScreenProps<T extends keyof InsideTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<InsideTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<InsideTabParamList>()

export function InsideNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: DARK_GRAY,
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: "uppercase",
          paddingTop: 10,
        },
        tabBarStyle: {
          backgroundColor: WHITE,
          borderTopWidth: 0,
          marginBottom: 0,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowColor: BLACK,
          shadowOffset: { height: 0, width: 0 },
        },
      }}
    >
      <Tab.Screen
        name="InsideExplore"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="search" text="Explore" />
          ),
        }}
      />

      <Tab.Screen
        name="InsideMatches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="heart" text="Matches" />
          ),
        }}
      />

      <Tab.Screen
        name="InsideChat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="chatbubble" text="Chat" />
          ),
        }}
      />

      <Tab.Screen
        name="InsideProfile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="person" text="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
