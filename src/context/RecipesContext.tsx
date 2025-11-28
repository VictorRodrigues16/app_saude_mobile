"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Recipe } from "../types/navigation"

type RecipesContextType = {
  recipes: Recipe[]
  addRecipe: (recipe: Omit<Recipe, "id" | "createdAt">) => void
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined)

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      name: "Bolo de Chocolate",
      ingredients: "Farinha, açúcar, chocolate em pó, ovos, leite, óleo",
      prepTime: 45,
      refrigerate: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Mousse de Maracujá",
      ingredients: "Leite condensado, creme de leite, suco de maracujá concentrado, gelatina",
      prepTime: 20,
      refrigerate: true,
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Lasanha à Bolonhesa",
      ingredients: "Massa de lasanha, carne moída, molho de tomate, queijo, bechamel",
      prepTime: 90,
      refrigerate: false,
      createdAt: new Date(),
    },
  ])

  const addRecipe = (recipe: Omit<Recipe, "id" | "createdAt">) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      refrigerate: Boolean(recipe.refrigerate),
      createdAt: new Date(),
    }
    setRecipes((prev) => [newRecipe, ...prev])
  }

  return <RecipesContext.Provider value={{ recipes, addRecipe }}>{children}</RecipesContext.Provider>
}

export const useRecipes = () => {
  const context = useContext(RecipesContext)
  if (!context) {
    throw new Error("useRecipes must be used within RecipesProvider")
  }
  return context
}
