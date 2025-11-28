import type { NavigatorScreenParams } from "@react-navigation/native"

export type Activity = {
  id: string
  title: string
  description: string
  duration: number
  type: "breathing" | "meditation" | "exercise" | "water"
  xp: number
}

export type UserProgress = {
  level: number
  currentXP: number
  xpToNextLevel: number
  streak: number
  totalActivities: number
  lastActivityDate: string
}

export type RootStackParamList = {
  Login: undefined
  MainApp: NavigatorScreenParams<MainTabParamList>
  ActivityScreen: { activity: Activity }
}

export type MainTabParamList = {
  Journey: undefined
  Stats: undefined
  Profile: undefined
}

export type ActivityStackParamList = {
  ActivityScreen: { activity: Activity }
}
