import { View, Text, TouchableOpacity ,StatusBar} from 'react-native'
import React from 'react'
import useTheme, {ThemeProvider } from '@/hooks/useTheme'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"
import  Header  from "@/components/Header"
import TodoInput from '@/components/TodoInput'

export default function Index() {
  const { toggleDarkMode,colors } = useTheme()
  
  // const todos = useQuery(api.todos.getTodos)
  // console.log(todos);
  
  // it is applied to entire project dynamically!!
  const homeStyles=createHomeStyles(colors)

  // const addTodoo = useMutation(api.todos.addTodo)
  
  // const clearAllTodos=useMutation(api.todos.clearAllTodos)

  return (
      //LinearGradient:to change entire project
     
      <LinearGradient
        colors={colors.gradients.background}
        style={homeStyles.container}
      >
        <StatusBar barStyle={colors.statusBarStyle} />
        <SafeAreaView style={homeStyles.safeArea}>
          
        <Header />
        <TodoInput/>
          <TouchableOpacity onPress={toggleDarkMode}>
            {/* last mode is saved using AsyncStore */}
            <Text>Toggle the mode</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
   );
}

