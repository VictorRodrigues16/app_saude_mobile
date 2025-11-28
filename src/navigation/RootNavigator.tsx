import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"
import MainTabNavigator from "./MainTabNavigator"
import ActivityScreen from "../screens/ActivityScreen"
import type { RootStackParamList } from "../types/navigation"
import { useHealth } from "../context/HealthContext"

const Stack = createStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const { user } = useHealth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
          <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator
