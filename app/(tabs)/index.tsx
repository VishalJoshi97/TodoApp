import { View, Text, TouchableOpacity ,StatusBar, FlatList,Alert,TextInput} from 'react-native'
import React, { useState } from 'react'
import useTheme, {ThemeProvider } from '@/hooks/useTheme'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"
import  Header  from "@/components/Header"
import TodoInput from '@/components/TodoInput'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Ionicons } from '@expo/vector-icons'
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks'
import { toggleTodo } from '@/convex/todos'
import { hide } from 'expo-router/build/utils/splash'
import EmptyState from '@/components/EmptyState'

type Todo = Doc<"todos">

export default function Index() {
  const { colors } = useTheme()
  
  // const todos = useQuery(api.todos.getTodos)
  // console.log(todos);
  
  const [editingId,setEditingId]=useState<Id<"todos"> | null>(null)
  const [editText,setEditText]=useState("")

  // it is applied to entire project dynamically!!
  const homeStyles = createHomeStyles(colors)
  
  const todos = useQuery(api.todos.getTodos)
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const deleteTodo=useMutation(api.todos.deleteTodo)
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined
  if (isLoading) return <LoadingSpinner />

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({id})
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error","Failed to toggle todo")
    }
  }
  
  const handleDeleteTodo = async (id: Id<"todos">) =>{
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
    {text:"Cancel",style:"cancel"},
    {text:"delete",style:"destructive",onPress:()=>deleteTodo({id})}
  ])
}

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text)
    setEditingId(todo._id)
  }

  const handlSaveEdit = async () => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editText.trim() })
        setEditingId(null)
        setEditText("")
      } catch (error) {
      console.log("Eroor updating todo",error);
      Alert.alert("Error","Failed to update todo")
      }
    }
  }

  const handleCancelEdit = async () => {
    setEditingId(null)
    setEditText("")
  }
  
  
  const renderTodoitem = ({ item }: { item: Todo }) => {

    const isEditing=editingId===item._id

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color={"#fff"} />
              )}
            </LinearGradient>
          </TouchableOpacity>

          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder='Edit yout todo...'
                placeholderTextColor={colors.textMuted}
              />
              <View style={homeStyles.editButtons}>
                <TouchableOpacity onPress={handlSaveEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name='checkmark' size={16} color='#fff' />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name='close' size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                </LinearGradient>
                </TouchableOpacity>
                
            </View>

          </View>
          ): (
             <View style={homeStyles.todoTextContainer}>
             <Text
               style={[
                 homeStyles.todoText,
                 item.isCompleted && {
                   textDecorationLine: "line-through",
                   color: colors.textMuted,
                   opacity: 0.6,
                 },
               ]}
             >
               {item.text}
             </Text>
 
             <View style={homeStyles.todoActions}>
               <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                 <LinearGradient
                   colors={colors.gradients.warning}
                   style={homeStyles.actionButton}
                 >
                   <Ionicons name="pencil" size={14} color="#fff" />
                 </LinearGradient>
               </TouchableOpacity>
 
               <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                 <LinearGradient
                   colors={colors.gradients.danger}
                   style={homeStyles.actionButton}
                 >
                   <Ionicons name="trash" size={14} color="#fff" />
                 </LinearGradient>
               </TouchableOpacity>
             </View>
           </View>
          )}
        </LinearGradient>
      </View>
    );
  };
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
          {/* {/* <TouchableOpacity onPress={toggleDarkMode}>
            * last mode is saved using AsyncStore 
            <Text>Toggle the mode</Text>
          </TouchableOpacity> 
        {todos?.map(todo => {
          <Text key={todo._id}>{ todo.text }</Text>
        })} */}

        <FlatList
          data={todos}
          renderItem={ renderTodoitem }
          // {({ item }) => (<Text>{item.text}</Text>)}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          // showsVerticalScrollIndicator={false}
        />
        </SafeAreaView>
       </LinearGradient>
      
   );
}

