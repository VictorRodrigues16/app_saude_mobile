import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import RecipesStackNavigator from "./RecipesStackNavigator"
import AddRecipeScreen from "../screens/AddRecipeScreen"
import type { RootTabParamList } from "../types/navigation"

const Tab = createBottomTabNavigator<RootTabParamList>()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap

          if (route.name === "Recipes") {
            iconName = focused ? "book" : "book-outline"
          } else if (route.name === "AddRecipe") {
            iconName = focused ? "add-circle" : "add-circle-outline"
          } else {
            iconName = "help-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#d97706",
        tabBarInactiveTintColor: "#78716c",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#fed7aa",
          borderTopWidth: 2,
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
      <Tab.Screen name="Recipes" component={RecipesStackNavigator} options={{ title: "Todas as Receitas" }} />
      <Tab.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{
          title: "Adicionar Receita",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#d97706",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
