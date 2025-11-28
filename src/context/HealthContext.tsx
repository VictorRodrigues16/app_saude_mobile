"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Activity, UserProgress } from "../types/navigation"

type HealthContextType = {
  user: { email: string; name: string } | null
  progress: UserProgress
  activities: Activity[]
  completedActivities: string[]
  login: (email: string, password: string) => boolean
  logout: () => void
  completeActivity: (activityId: string) => void
}

const HealthContext = createContext<HealthContextType | undefined>(undefined)

export const HealthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)

  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    streak: 5,
    totalActivities: 12,
    lastActivityDate: new Date().toISOString(),
  })

  const [activities] = useState<Activity[]>([
    {
      id: "1",
      title: "Respiração Calma",
      description: "Respire profundamente por 1:30 para acalmar a mente",
      duration: 90,
      type: "breathing",
      xp: 10,
    },
    {
      id: "2",
      title: "Meditação Guiada",
      description: "5 minutos de meditação para começar o dia",
      duration: 300,
      type: "meditation",
      xp: 20,
    },
    {
      id: "3",
      title: "Alongamento",
      description: "Alongue seu corpo por 3 minutos",
      duration: 180,
      type: "exercise",
      xp: 15,
    },
    {
      id: "4",
      title: "Hidratação",
      description: "Beba um copo de água",
      duration: 10,
      type: "water",
      xp: 5,
    },
    {
      id: "5",
      title: "Respiração Energizante",
      description: "Técnica de respiração para aumentar energia",
      duration: 120,
      type: "breathing",
      xp: 15,
    },
  ])

  const [completedActivities, setCompletedActivities] = useState<string[]>(["1"])

  const login = (email: string, password: string): boolean => {
    if (email && password) {
      setUser({ email, name: email.split("@")[0] })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const completeActivity = (activityId: string) => {
    const activity = activities.find((a) => a.id === activityId)
    if (activity && !completedActivities.includes(activityId)) {
      setCompletedActivities((prev) => [...prev, activityId])
      setProgress((prev) => {
        const newXP = prev.currentXP + activity.xp
        const newLevel = newXP >= prev.xpToNextLevel ? prev.level + 1 : prev.level
        const remainingXP = newXP >= prev.xpToNextLevel ? newXP - prev.xpToNextLevel : newXP

        return {
          level: newLevel,
          currentXP: remainingXP,
          xpToNextLevel: prev.xpToNextLevel + (newLevel > prev.level ? 50 : 0),
          streak: prev.streak + 1,
          totalActivities: prev.totalActivities + 1,
          lastActivityDate: new Date().toISOString(),
        }
      })
    }
  }

  return (
    <HealthContext.Provider
      value={{
        user,
        progress,
        activities,
        completedActivities,
        login,
        logout,
        completeActivity,
      }}
    >
      {children}
    </HealthContext.Provider>
  )
}

export const useHealth = () => {
  const context = useContext(HealthContext)
  if (!context) {
    throw new Error("useHealth must be used within HealthProvider")
  }
  return context
}
