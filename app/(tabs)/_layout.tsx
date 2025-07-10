import { Tabs } from "expo-router";
import {Ionicons} from '@expo/vector-icons'
import useTheme from "@/hooks/useTheme";


export default function TabsLayout() {
  const { colors } = useTheme()
  
  return (
    //_layout.tsx is most important file
    //Use tabs accordingly
    <Tabs
      //even though /(tabs)/index in _layout
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: true, //below tab icons--
        headerShown: false, //tab names--
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          //bottom tab bar's styling
          backgroundColor:colors.surface ,// "#1e293b"
          borderTopWidth: 1, //behind tab bar
          borderTopColor: colors.border,
          paddingBottom:30,//bottom up
          paddingTop: 10, //top down
          height:75
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight:"600"
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos",//--
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",//--
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
