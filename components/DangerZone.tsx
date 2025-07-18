import { createSettingsStyles } from '@/assets/styles/settings.styles'
import useTheme from '@/hooks/useTheme'
import { useMutation } from 'convex/react'
import { View, Text ,Alert, TouchableOpacity} from 'react-native'
import {api} from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const DangerZone = () => {

    const { colors } = useTheme()
    const settingsStyles = createSettingsStyles(colors)
    const clearAllTodos = useMutation(api.todos.clearAllTodos)
    
    const handleResetApp = async () => {
        Alert.alert(
            "Reset App",
            "⚠ This will delete All your todos Permanently.This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete All",
                    style:"default",
                    onPress: async () => {
                        try {
                            const result = await clearAllTodos()
                            Alert.alert(
                                "App Reset",
                                `Successfully deleted ${result.deletedCount} todo${result.deletedCount===1 ? "" : "s"}. Your app has been reset.`
                            )
                        } catch (error) {
                            console.log("Error deleting all todos", error);
                            Alert.alert("Error","Failed to reset app")
                        }
                    }
        
                }
            ]
        )
    }

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>
            <TouchableOpacity style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]}
                onPress={handleResetApp}
                activeOpacity={0.7}>
                <View style={settingsStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
                        <Ionicons name='trash' size={18} color="#fff" />
                    </LinearGradient>
                        <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
                </View>
                <Ionicons name='chevron-forward' size={18} color={colors.textMuted}/>
            </TouchableOpacity>
      </LinearGradient>
  )
}

export default DangerZone