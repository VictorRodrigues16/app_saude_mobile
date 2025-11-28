import { View, Text, ScrollView, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useHealth } from "../context/HealthContext"

const StatsScreen = () => {
  const { progress } = useHealth()

  const stats = [
    {
      icon: "flame" as const,
      label: "Ofensiva Diária",
      value: progress.streak,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
    {
      icon: "trophy" as const,
      label: "Nível Atual",
      value: progress.level,
      color: "#fbbf24",
      bgColor: "#fef3c7",
    },
    {
      icon: "checkmark-circle" as const,
      label: "Atividades",
      value: progress.totalActivities,
      color: "#10b981",
      bgColor: "#d1fae5",
    },
    {
      icon: "star" as const,
      label: "XP Total",
      value: progress.currentXP,
      color: "#6366f1",
      bgColor: "#e0e7ff",
    },
  ]

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
  const weekProgress = [true, true, true, true, true, false, false]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Suas Estatísticas</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <Ionicons name="flame" size={40} color="#f59e0b" />
            <View style={styles.streakInfo}>
              <Text style={styles.streakNumber}>{progress.streak}</Text>
              <Text style={styles.streakLabel}>dias de ofensiva</Text>
            </View>
          </View>
          <Text style={styles.streakMessage}>Continue assim! Cada dia conta.</Text>

          <View style={styles.weekGrid}>
            {weekDays.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <View style={[styles.dayCircle, weekProgress[index] && styles.dayCircleActive]}>
                  {weekProgress[index] && <Ionicons name="checkmark" size={16} color="#fff" />}
                </View>
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}>
                <Ionicons name={stat.icon} size={28} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.motivationCard}>
          <Ionicons name="heart" size={24} color="#ec4899" />
          <Text style={styles.motivationText}>
            Você está no caminho certo! Continue praticando atividades saudáveis todos os dias.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#6366f1",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  streakCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  streakHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  streakInfo: {
    marginLeft: 16,
  },
  streakNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#f59e0b",
  },
  streakLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  streakMessage: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 20,
  },
  weekGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayColumn: {
    alignItems: "center",
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  dayCircleActive: {
    backgroundColor: "#f59e0b",
  },
  dayLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
  motivationCard: {
    backgroundColor: "#fce7f3",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  motivationText: {
    flex: 1,
    fontSize: 14,
    color: "#831843",
    marginLeft: 12,
    lineHeight: 20,
  },
})

export default StatsScreen
