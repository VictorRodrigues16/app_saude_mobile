import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import RootNavigator from "./src/navigation/RootNavigator"
import { HealthProvider } from "./src/context/HealthContext"

export default function App() {
  return (
    <HealthProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#6366f1" />
        <RootNavigator />
      </NavigationContainer>
    </HealthProvider>
  )
}
