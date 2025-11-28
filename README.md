# 🌿 App de Bem-estar - Jornada Saudável

Aplicativo mobile desenvolvido com React Native e Expo que incentiva práticas saudáveis através de uma jornada gamificada de atividades de bem-estar.

## 📱 Sobre o Projeto

O App de Bem-estar é um aplicativo que motiva usuários a manterem hábitos saudáveis através de:
- Sistema de níveis e experiência (XP)
- Ofensiva diária (streak)
- Atividades interativas de respiração, meditação, exercícios e hidratação
- Interface visual atraente com animações

## 🔑 Credenciais de Acesso

Para testar o aplicativo, use:
- **Email**: Qualquer email válido (exemplo: usuario@email.com)
- **Senha**: Qualquer senha com 6 ou mais caracteres (exemplo: 123456)

O sistema aceita qualquer combinação válida de email/senha para fins de demonstração.

## ✨ Funcionalidades

### Tela de Login ✅
- Validação de formulário completa
- Validação de formato de email
- Validação de senha mínima (6 caracteres)
- Feedback visual com alerts
- Design moderno e responsivo

### Navegação ✅
- **Stack Navigator**: Navegação principal entre Login e App autenticado
- **Tab Navigator**: 3 abas no aplicativo principal (Jornada, Estatísticas, Perfil)
- Navegação fluida entre telas de atividades

### Telas Implementadas ✅

1. **Tela de Login** (LoginScreen.tsx)
   - Formulário com validação
   - Feedback de erros
   - Design com gradientes e ícones

2. **Tela de Jornada** (JourneyScreen.tsx)
   - Visualização de progresso
   - Lista de atividades gamificada
   - Sistema de desbloqueio progressivo
   - Animações de nuvens e elementos naturais

3. **Tela de Estatísticas** (StatsScreen.tsx)
   - Cards de estatísticas
   - Visualização de streak semanal
   - Métricas de progresso (nível, XP, atividades)

4. **Tela de Perfil** (ProfileScreen.tsx)
   - Informações do usuário
   - Estatísticas resumidas
   - Menu de configurações
   - Logout com confirmação

5. **Tela de Atividade** (ActivityScreen.tsx)
   - Timer interativo
   - Animações específicas por tipo de atividade
   - Instruções detalhadas
   - Sistema de conclusão com recompensas

## 📦 Componentes Utilizados

### Componentes React Native ✅

- **View**: Estruturação de layout em todas as telas
- **ScrollView**: Rolagem de conteúdo nas telas (Login, Journey, Stats, Profile)
- **TextInput**: Campos de email e senha no Login
- **Text**: Exibição de textos, títulos, labels e resultados
- **Image**: Ícones através do Ionicons (@expo/vector-icons)
- **TouchableOpacity**: Botões interativos (login, atividades, logout, menu)
- **Alert**: Mensagens de validação, confirmações e feedback
- **Animated**: Animações de respiração, meditação e exercícios
- **StyleSheet**: Estilização de todos os componentes

### Componentes Adicionais
- **Ionicons**: Ícones vetoriais
- **Navigation Components**: Stack e Tab Navigators

## 🎨 Estilização

### StyleSheet ✅
- Todos os componentes estilizados com StyleSheet nativo
- Paleta de cores consistente
- Design responsivo
- Sombras e elevações
- Animações suaves
- Layout flexível e moderno

### Paleta de Cores
- Primário: `#6366f1` (Índigo)
- Secundário: `#22c55e` (Verde)
- Destaque: `#f59e0b` (Âmbar)
- Fundo: `#f8fafc` (Cinza claro)

## 🏗️ Arquitetura e Organização

### Estrutura de Pastas ✅

```
├── src/
│   ├── screens/           # Telas do aplicativo
│   │   ├── LoginScreen.tsx
│   │   ├── JourneyScreen.tsx
│   │   ├── StatsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ActivityScreen.tsx
│   │   └── HomeScreen.tsx
│   ├── navigation/        # Configuração de navegação
│   │   ├── RootNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── context/          # Context API para estado global
│   │   ├── HealthContext.tsx
│   │   └── RecipesContext.tsx
│   └── types/            # Definições TypeScript
│       └── navigation.ts
├── assets/               # Recursos visuais
├── App.tsx              # Componente raiz
└── app.json             # Configuração Expo
```

### Padrões Utilizados
- Context API para gerenciamento de estado
- TypeScript para tipagem forte
- Componentes funcionais com Hooks
- Navegação modular e escalável

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI
- Emulador Android/iOS ou Expo Go no celular

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd listareceitamobile
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o projeto:
```bash
npx expo start
```

4. Execute no emulador:
- Pressione `a` para Android
- Pressione `i` para iOS
- Ou escaneie o QR Code com o app Expo Go

## 📱 Testando o Aplicativo

1. Ao abrir o app, você verá a tela de login
2. Digite qualquer email válido (ex: teste@email.com)
3. Digite uma senha com 6+ caracteres (ex: 123456)
4. Clique em "Entrar"
5. Explore as abas: Jornada, Estatísticas e Perfil
6. Na Jornada, clique nas atividades desbloqueadas
7. Complete atividades para ganhar XP e subir de nível


## 📝 Observações

- O aplicativo não possui integração com backend (mock de dados)
- O sistema de login é apenas demonstrativo
- As credenciais são aceitas em memória durante a sessão
- Dados não são persistidos entre sessões

## 🛠️ Tecnologias

- React Native
- Expo SDK 52
- TypeScript
- React Navigation (Stack + Bottom Tabs)
- Context API
- Expo Vector Icons
- React Native Animated API

## 👨‍💻 Desenvolvimento

Desenvolvido como projeto acadêmico demonstrando:
- Navegação entre telas
- Validação de formulários
- Gerenciamento de estado
- Animações
- Design responsivo
- Boas práticas de código
