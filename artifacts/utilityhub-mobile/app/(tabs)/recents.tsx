import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  FlatList, Platform, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { ToolCard } from '@/components/ToolCard';
import { useColors } from '@/hooks/useColors';
import { getToolBySlug } from '@/lib/registry';
import { Tool } from '@/lib/types';

export default function RecentsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [recentTools, setRecentTools] = useState<Tool[]>([]);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const load = useCallback(() => {
    AsyncStorage.getItem('recent_tools').then((val) => {
      if (val) {
        try {
          const slugs: string[] = JSON.parse(val);
          const tools = slugs.map((s) => getToolBySlug(s)).filter(Boolean) as Tool[];
          setRecentTools(tools);
        } catch { setRecentTools([]); }
      } else {
        setRecentTools([]);
      }
    });
  }, []);

  useFocusEffect(load);

  const clearAll = async () => {
    await AsyncStorage.removeItem('recent_tools');
    setRecentTools([]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: 'Inter_700Bold' }]}>
          Recents
        </Text>
        {recentTools.length > 0 && (
          <TouchableOpacity onPress={clearAll} hitSlop={8}>
            <Text style={[styles.clearBtn, { color: colors.primary, fontFamily: 'Inter_500Medium' }]}>
              Clear all
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={recentTools}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: Platform.OS === 'web' ? 120 : 100 }]}
        renderItem={({ item }) => (
          <ToolCard
            tool={item}
            onPress={() => router.push(`/tool/${item.slug}` as any)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="clock" size={40} color={colors.border} />
            <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>
              No recent tools
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
              Tools you use will appear here
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16,
  },
  title: { fontSize: 28, letterSpacing: -0.5 },
  clearBtn: { fontSize: 14 },
  list: { paddingHorizontal: 20, paddingTop: 4 },
  empty: { alignItems: 'center', marginTop: 80, gap: 10 },
  emptyTitle: { fontSize: 17, marginTop: 8 },
  emptyDesc: { fontSize: 14, textAlign: 'center' },
});
