"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { type RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../types/navigation"
import { useHealth } from "../context/HealthContext"

type ActivityScreenRouteProp = RouteProp<RootStackParamList, "ActivityScreen">
type NavigationProp = StackNavigationProp<RootStackParamList>

const ActivityScreen = () => {
  const route = useRoute<ActivityScreenRouteProp>()
  const navigation = useNavigation<NavigationProp>()
  const { activity } = route.params
  const { completeActivity, completedActivities } = useHealth()

  const [timeLeft, setTimeLeft] = useState(activity.duration)
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(completedActivities.includes(activity.id))

  // Animações
  const scaleAnim = useRef(new Animated.Value(1)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      handleComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  // Animação baseada no tipo de atividade
  useEffect(() => {
    console.log("Atividade ativa:", isActive)
    console.log("Tipo de atividade:", activity.type)
    if (isActive) {
      switch (activity.type) {
        case "breathing":
          startBreathingAnimation()
          break
        case "meditation":
          startMeditationAnimation()
          break
        case "exercise":
          startExerciseAnimation()
          break
        case "water":
          startWaterAnimation()
          break
      }
    }
  }, [isActive])

  const startBreathingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  const startMeditationAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }

  const startExerciseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  const startWaterAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleComplete = () => {
    setIsActive(false)
    if (!isCompleted) {
      completeActivity(activity.id)
      setIsCompleted(true)
      Alert.alert("Parabéns! 🎉", `Você completou "${activity.title}" e ganhou ${activity.xp} XP!`, [
        {
          text: "Continuar",
          onPress: () => navigation.goBack(),
        },
      ])
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getActivityColor = () => {
    switch (activity.type) {
      case "breathing":
        return "#3b82f6"
      case "meditation":
        return "#8b5cf6"
      case "exercise":
        return "#f59e0b"
      case "water":
        return "#06b6d4"
      default:
        return "#22c55e"
    }
  }

  const getActivityEmoji = () => {
    switch (activity.type) {
      case "breathing":
        return "🌬️"
      case "meditation":
        return "🧘"
      case "exercise":
        return "💪"
      case "water":
        return "💧"
      default:
        return "✨"
    }
  }

  const getInstructions = () => {
    switch (activity.type) {
      case "breathing":
        return "Inspire profundamente por 4 segundos\nSegure por 4 segundos\nExpire por 4 segundos"
      case "meditation":
        return "Feche os olhos\nFoque na sua respiração\nDeixe os pensamentos passarem"
      case "exercise":
        return "Alongue os braços acima da cabeça\nIncline-se para os lados\nRespire profundamente"
      case "water":
        return "Beba um copo de água\nHidrate-se bem\nMantenha-se saudável"
      default:
        return ""
    }
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const color = getActivityColor()

  return (
    <View style={[styles.container, { backgroundColor: color + "10" }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{activity.title}</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{activity.xp} XP</Text>
        </View>
      </View>

      {/* Área de animação central */}
      <View style={styles.animationContainer}>
        <Text style={styles.emoji}>{getActivityEmoji()}</Text>

        {activity.type === "breathing" && (
          <Animated.View style={[styles.breathingCircle, { transform: [{ scale: scaleAnim }], borderColor: color }]} />
        )}

        {activity.type === "meditation" && (
          <Animated.View style={[styles.meditationRing, { transform: [{ rotate: spin }] }]}>
            <View style={[styles.ringSegment, { backgroundColor: color }]} />
            <View style={[styles.ringSegment, { backgroundColor: color, opacity: 0.6 }]} />
            <View style={[styles.ringSegment, { backgroundColor: color, opacity: 0.3 }]} />
          </Animated.View>
        )}

        {activity.type === "exercise" && (
          <Animated.View style={[styles.exerciseIcon, { transform: [{ scale: pulseAnim }] }]}>
            <Ionicons name="fitness" size={80} color={color} />
          </Animated.View>
        )}

        {activity.type === "water" && (
          <Animated.View style={[styles.waterDrop, { transform: [{ scale: scaleAnim }] }]}>
            <Ionicons name="water" size={80} color={color} />
          </Animated.View>
        )}

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={[styles.timer, { color }]}>{formatTime(timeLeft)}</Text>
          {isActive && <Text style={styles.timerLabel}>Continue...</Text>}
        </View>
      </View>

      {/* Instruções */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Como fazer:</Text>
        <Text style={styles.instructionsText}>{getInstructions()}</Text>
      </View>

      {/* Controles */}
      <View style={styles.controls}>
        {!isActive && timeLeft > 0 && (
          <TouchableOpacity
            style={[styles.button, styles.startButton, { backgroundColor: color }]}
            onPress={handleStart}
          >
            <Ionicons name="play" size={32} color="#fff" />
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        )}

        {isActive && (
          <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={handlePause}>
            <Ionicons name="pause" size={32} color="#fff" />
            <Text style={styles.buttonText}>Pausar</Text>
          </TouchableOpacity>
        )}

        {!isActive && timeLeft !== activity.duration && timeLeft > 0 && (
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => setTimeLeft(activity.duration)}>
            <Ionicons name="refresh" size={24} color="#64748b" />
          </TouchableOpacity>
        )}

        {isCompleted && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={32} color="#10b981" />
            <Text style={styles.completedText}>Atividade Concluída!</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  xpBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  xpText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  emoji: {
    fontSize: 80,
    marginBottom: 40,
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    position: "absolute",
    top: "25%",
  },
  meditationRing: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "25%",
  },
  ringSegment: {
    width: 180,
    height: 180,
    borderRadius: 90,
    position: "absolute",
    opacity: 0.3,
  },
  exerciseIcon: {
    position: "absolute",
    top: "25%",
  },
  waterDrop: {
    position: "absolute",
    top: "25%",
  },
  timerContainer: {
    alignItems: "center",
    marginTop: 240,
  },
  timer: {
    fontSize: 64,
    fontWeight: "bold",
  },
  timerLabel: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 8,
  },
  instructionsContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
  },
  controls: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 12,
  },
  startButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  pauseButton: {
    backgroundColor: "#ef4444",
  },
  resetButton: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d1fae5",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 12,
  },
  completedText: {
    color: "#10b981",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default ActivityScreen
