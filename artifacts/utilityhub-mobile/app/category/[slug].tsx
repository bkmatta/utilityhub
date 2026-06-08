import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  FlatList, Platform, StyleSheet, Text, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ToolCard } from '@/components/ToolCard';
import { useColors } from '@/hooks/useColors';
import { CATEGORIES, getToolsByCategory } from '@/lib/registry';

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const tools = getToolsByCategory(slug ?? '');
  const catInfo = CATEGORIES.find((c) => c.slug === slug);
  const label = catInfo?.label ?? (slug ?? 'Tools');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={tools}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: Platform.OS === 'web' ? 34 : 20,
        }}
        ListHeaderComponent={
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.cat, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
              {tools.length} tools
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ToolCard
            tool={item}
            onPress={() => router.push(`/tool/${item.slug}` as any)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
              No tools available in this category
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
  cat: { fontSize: 13 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 14 },
});
