import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import JourneyScreen from "../screens/JourneyScreen"
import StatsScreen from "../screens/StatsScreen"
import ProfileScreen from "../screens/ProfileScreen"
import type { MainTabParamList } from "../types/navigation"

const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap

          if (route.name === "Journey") {
            iconName = focused ? "map" : "map-outline"
          } else if (route.name === "Stats") {
            iconName = focused ? "stats-chart" : "stats-chart-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          } else {
            iconName = "help-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#e2e8f0",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Journey" component={JourneyScreen} options={{ title: "Jornada" }} />
      <Tab.Screen name="Stats" component={StatsScreen} options={{ title: "Estatísticas" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
