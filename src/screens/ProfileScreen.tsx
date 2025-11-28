import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useHealth } from "../context/HealthContext"

const ProfileScreen = () => {
  const { user, logout, progress } = useHealth()

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => logout(),
      },
    ])
  }

  const menuItems = [
    {
      icon: "notifications-outline" as const,
      label: "Notificações",
      onPress: () => Alert.alert("Notificações", "Em breve!"),
    },
    {
      icon: "settings-outline" as const,
      label: "Configurações",
      onPress: () => Alert.alert("Configurações", "Em breve!"),
    },
    { icon: "help-circle-outline" as const, label: "Ajuda", onPress: () => Alert.alert("Ajuda", "Em breve!") },
    {
      icon: "information-circle-outline" as const,
      label: "Sobre",
      onPress: () => Alert.alert("Sobre", "App de Bem-estar v1.0"),
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.[0].toUpperCase()}</Text>
            </View>
            <View style={styles.levelBadge}>
              <Ionicons name="trophy" size={16} color="#fbbf24" />
              <Text style={styles.levelBadgeText}>{progress.level}</Text>
            </View>
          </View>

          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{progress.streak}</Text>
              <Text style={styles.statLabel}>Dias</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{progress.totalActivities}</Text>
              <Text style={styles.statLabel}>Atividades</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{progress.level}</Text>
              <Text style={styles.statLabel}>Nível</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, index === menuItems.length - 1 && styles.menuItemLast]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#64748b" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
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
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  levelBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  levelBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6366f1",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e2e8f0",
  },
  menuSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: "#1e293b",
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#fee2e2",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
    marginLeft: 8,
  },
})

export default ProfileScreen
