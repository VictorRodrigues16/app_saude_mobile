"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useHealth } from "../context/HealthContext"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useHealth()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = () => {
    // Validações
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, insira seu email")
      return
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido")
      return
    }

    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, insira sua senha")
      return
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres")
      return
    }

    // Mock de login - aceita qualquer email/senha válidos
    const success = login(email, password)

    if (success) {
      Alert.alert("Sucesso", "Login realizado com sucesso!")
    } else {
      Alert.alert("Erro", "Credenciais inválidas")
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="heart-circle" size={80} color="#6366f1" />
          <Text style={styles.title}>Bem-estar</Text>
          <Text style={styles.subtitle}>Sua jornada de saúde começa aqui</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#6366f1" />
            <Text style={styles.infoText}>Use qualquer email válido e senha com 6+ caracteres para testar</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 8,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#1e293b",
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#eef2ff",
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "flex-start",
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#4f46e5",
    marginLeft: 8,
    lineHeight: 20,
  },
})

export default LoginScreen
