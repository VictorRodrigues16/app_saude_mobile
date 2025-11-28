"use client"

import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useHealth } from "../context/HealthContext"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../types/navigation"
import { useEffect, useRef } from "react"

type NavigationProp = StackNavigationProp<RootStackParamList>

const JourneyScreen = () => {
  const { activities, completedActivities, progress } = useHealth()
  const navigation = useNavigation<NavigationProp>()

  const cloudAnim1 = useRef(new Animated.Value(0)).current
  const cloudAnim2 = useRef(new Animated.Value(0)).current
  const grassAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cloudAnim1, {
          toValue: 1,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnim1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(cloudAnim2, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnim2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(grassAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(grassAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  const handleActivityPress = (activityId: string) => {
    const activity = activities.find((a) => a.id === activityId)
    const isCompleted = completedActivities.includes(activityId)
    const previousActivityIndex = activities.findIndex((a) => a.id === activityId) - 1
    const isPreviousCompleted =
      previousActivityIndex < 0 || completedActivities.includes(activities[previousActivityIndex].id)

    if (!isPreviousCompleted && !isCompleted) {
      return
    }

    if (activity) {
      navigation.navigate("ActivityScreen", { activity })
    }
  }

  const getActivityIcon = (type: string, isCompleted: boolean, isLocked: boolean) => {
    if (isCompleted) return "checkmark-circle"
    if (isLocked) return "lock-closed"

    switch (type) {
      case "breathing":
        return "cloud-outline"
      case "meditation":
        return "flower-outline"
      case "exercise":
        return "fitness"
      case "water":
        return "water"
      default:
        return "radio-button-off"
    }
  }

  const cloud1TranslateX = cloudAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 400],
  })

  const cloud2TranslateX = cloudAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 450],
  })

  const grassScale = grassAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.02, 1],
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.skyGradient}>
          <Animated.View style={[styles.cloud, { transform: [{ translateX: cloud1TranslateX }], top: 20 }]}>
            <Text style={styles.cloudEmoji}>☁️</Text>
          </Animated.View>
          <Animated.View style={[styles.cloud, { transform: [{ translateX: cloud2TranslateX }], top: 50 }]}>
            <Text style={styles.cloudEmoji}>☁️</Text>
          </Animated.View>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>🌿 Jornada Saudável</Text>
          <View style={styles.levelBadge}>
            <Ionicons name="trophy" size={20} color="#fbbf24" />
            <Text style={styles.levelText}>Nível {progress.level}</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progresso do Nível</Text>
          <Text style={styles.progressXP}>
            {progress.currentXP}/{progress.xpToNextLevel} XP
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(progress.currentXP / progress.xpToNextLevel) * 100}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.journeyContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.landscapeContainer}>
          {/* Montanhas no fundo */}
          <View style={styles.mountains}>
            <View style={[styles.mountain, styles.mountainBack]} />
            <View style={[styles.mountain, styles.mountainFront]} />
          </View>

          {/* Trilha com atividades */}
          <Animated.View style={[styles.grassField, { transform: [{ scaleY: grassScale }] }]}>
            <View style={styles.path}>
              {activities.map((activity, index) => {
                const isCompleted = completedActivities.includes(activity.id)
                const previousActivityIndex = index - 1
                const isPreviousCompleted =
                  previousActivityIndex < 0 || completedActivities.includes(activities[previousActivityIndex].id)
                const isLocked = !isPreviousCompleted && !isCompleted

                const isEven = index % 2 === 0
                const offset = isEven ? 0 : 60

                return (
                  <View key={activity.id} style={[styles.activityWrapper, { marginLeft: offset }]}>
                    {index > 0 && (
                      <View
                        style={[
                          styles.pathLine,
                          {
                            left: isEven ? 50 : -10,
                            transform: [{ rotate: isEven ? "15deg" : "-15deg" }],
                          },
                        ]}
                      />
                    )}

                    <TouchableOpacity
                      style={[
                        styles.activityNode,
                        isCompleted && styles.activityNodeCompleted,
                        isLocked && styles.activityNodeLocked,
                      ]}
                      onPress={() => handleActivityPress(activity.id)}
                      disabled={isLocked}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={getActivityIcon(activity.type, isCompleted, isLocked)}
                        size={36}
                        color={isCompleted ? "#10b981" : isLocked ? "#94a3b8" : "#22c55e"}
                      />

                      {/* Decorações naturais */}
                      {!isLocked && (
                        <View style={styles.sparkles}>
                          <Text style={styles.sparkle}>✨</Text>
                        </View>
                      )}
                    </TouchableOpacity>

                    <View style={[styles.activityInfo, { marginLeft: 16 }]}>
                      <Text style={[styles.activityTitle, isLocked && styles.activityTitleLocked]}>
                        {activity.title}
                      </Text>
                      <Text style={styles.activityXP}>+{activity.xp} XP 🌟</Text>
                    </View>

                    {/* Elementos naturais decorativos */}
                    {isEven && <Text style={styles.decoration}>🌸</Text>}
                    {!isEven && <Text style={styles.decoration}>🍃</Text>}
                  </View>
                )
              })}
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2fe",
  },
  header: {
    height: 160,
    overflow: "hidden",
  },
  skyGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: "#7dd3fc",
  },
  cloud: {
    position: "absolute",
    opacity: 0.8,
  },
  cloudEmoji: {
    fontSize: 40,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 4,
  },
  progressCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  progressXP: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22c55e",
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 6,
  },
  journeyContainer: {
    flex: 1,
  },
  landscapeContainer: {
    flex: 1,
    position: "relative",
  },
  mountains: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  mountain: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
  },
  mountainBack: {
    borderLeftWidth: 100,
    borderRightWidth: 100,
    borderBottomWidth: 150,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#94a3b8",
    opacity: 0.3,
  },
  mountainFront: {
    borderLeftWidth: 80,
    borderRightWidth: 80,
    borderBottomWidth: 120,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#64748b",
    opacity: 0.5,
    marginTop: 30,
  },
  grassField: {
    backgroundColor: "#86efac",
    minHeight: 600,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 100,
    paddingTop: 40,
  },
  path: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  activityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
  },
  pathLine: {
    position: "absolute",
    top: -40,
    width: 4,
    height: 50,
    backgroundColor: "#bbf7d0",
  },
  activityNode: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#22c55e",
    shadowColor: "#22c55e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    position: "relative",
  },
  activityNodeCompleted: {
    borderColor: "#10b981",
    backgroundColor: "#d1fae5",
    shadowColor: "#10b981",
  },
  activityNodeLocked: {
    borderColor: "#cbd5e1",
    backgroundColor: "#f1f5f9",
    shadowOpacity: 0.1,
  },
  sparkles: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  sparkle: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  activityTitleLocked: {
    color: "#94a3b8",
  },
  activityXP: {
    fontSize: 14,
    color: "#22c55e",
    fontWeight: "700",
  },
  decoration: {
    position: "absolute",
    right: 10,
    top: 20,
    fontSize: 24,
  },
})

export default JourneyScreen
