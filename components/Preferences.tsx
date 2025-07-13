import { View, Text, Switch } from 'react-native'
import {useState} from 'react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Preferences = () => {
  
    const [isAutosync, setIsAutoSync] = useState(true);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    const { colors, isDarkMode, toggleDarkMode } = useTheme();
    const settingsStyles=createSettingsStyles(colors)

  return (
      <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Preferences</Text>

          {/* For DARK MODE */}
          <View style={settingsStyles.settingItem}>
              <View style={settingsStyles.settingLeft}>
                  <LinearGradient colors={colors.gradients.primary} style={settingsStyles.settingIcon}>
                      <Ionicons name='moon' size={18} color='#fff'/>
                  </LinearGradient>
                  <Text style={settingsStyles.settingText}>Dark Mode</Text>
              </View>
              <Switch value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  thumbColor="#fff"
                  trackColor={{ false: colors.border, true: colors.primary }}
                ios_backgroundColor={colors.border}
              />
          </View>

          {/* For Notification  */}
          <View style={settingsStyles.settingItem}>
              <View style={settingsStyles.settingLeft}>
                  <LinearGradient colors={colors.gradients.warning} style={settingsStyles.settingIcon}>
                      <Ionicons name='notifications' size={18} color='#fff'/>
                  </LinearGradient>
                  <Text style={settingsStyles.settingText}>Notifications</Text>
              </View>
              <Switch value={isNotificationsEnabled}
                  onValueChange={()=> setIsNotificationsEnabled (!isNotificationsEnabled)}
                  thumbColor="#fff"
                  trackColor={{ false: colors.border, true: colors.warning }}
                ios_backgroundColor={colors.border}
              />
          </View>

          {/* For AUTO  SYNC */}
          <View style={settingsStyles.settingItem}>
              <View style={settingsStyles.settingLeft}>
                  <LinearGradient colors={colors.gradients.success} style={settingsStyles.settingIcon}>
                      <Ionicons name='sync' size={18} color='#fff'/>
                  </LinearGradient>
                  <Text style={settingsStyles.settingText}>Notifications</Text>
              </View>
              <Switch value={isAutosync}
                  onValueChange={()=> setIsAutoSync (!isAutosync)}
                  thumbColor="#fff"
                  trackColor={{ false: colors.border, true: colors.success }}
                ios_backgroundColor={colors.border}
              />
          </View>


    </LinearGradient>
  )
}

export default Preferences