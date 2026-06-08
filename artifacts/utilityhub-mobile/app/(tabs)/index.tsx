import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { CategoryCard } from '@/components/CategoryChip';
import { useColors } from '@/hooks/useColors';
import { CATEGORIES, TRENDING, allTools, getToolBySlug, getToolsByCategory } from '@/lib/registry';
import { Tool } from '@/lib/types';

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [recentTools, setRecentTools] = useState<Tool[]>([]);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  useEffect(() => {
    AsyncStorage.getItem('recent_tools').then((val) => {
      if (val) {
        try {
          const slugs: string[] = JSON.parse(val);
          const tools = slugs.map((s) => getToolBySlug(s)).filter(Boolean) as Tool[];
          setRecentTools(tools.slice(0, 4));
        } catch { /* ignore */ }
      }
    });
  }, []);

  const trending = TRENDING.map((s) => getToolBySlug(s)).filter(Boolean) as Tool[];

  const goTool = (slug: string) => router.push(`/tool/${slug}` as any);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPad + 12, paddingBottom: Platform.OS === 'web' ? 120 : 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
            Good {getTimeOfDay()}
          </Text>
          <Text style={[styles.heroTitle, { color: colors.foreground, fontFamily: 'Inter_700Bold' }]}>
            Utility<Text style={{ color: colors.primary }}>Hub</Text>
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: `${colors.primary}18` }]}>
          <Text style={[styles.badgeText, { color: colors.primary, fontFamily: 'Inter_600SemiBold' }]}>
            {allTools.length}+ tools
          </Text>
        </View>
      </View>

      {/* Search shortcut */}
      <TouchableOpacity
        style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => router.push('/(tabs)/search' as any)}
        activeOpacity={0.8}
      >
        <Feather name="search" size={16} color={colors.mutedForeground} />
        <Text style={[styles.searchPlaceholder, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
          Search calculators & converters...
        </Text>
      </TouchableOpacity>

      {/* Recent Tools */}
      {recentTools.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>
            Recently Used
          </Text>
          <View style={styles.twoCol}>
            {recentTools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={[styles.recentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => goTool(tool.slug)}
                activeOpacity={0.75}
              >
                <Feather name="clock" size={13} color={colors.primary} />
                <Text style={[styles.recentTitle, { color: colors.foreground, fontFamily: 'Inter_500Medium' }]} numberOfLines={1}>
                  {tool.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Categories */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>
          Categories
        </Text>
        <View style={styles.catGrid}>
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              toolCount={getToolsByCategory(cat.slug).length}
              onPress={() => router.push(`/category/${cat.slug}` as any)}
            />
          ))}
        </View>
      </View>

      {/* Trending */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>
          Trending Tools
        </Text>
        {trending.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={[styles.trendCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => goTool(tool.slug)}
            activeOpacity={0.75}
          >
            <View style={styles.trendInfo}>
              <Text style={[styles.trendTitle, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>
                {tool.title}
              </Text>
              <Text style={[styles.trendDesc, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]} numberOfLines={1}>
                {tool.description}
              </Text>
            </View>
            <View style={[styles.catTag, { backgroundColor: `${colors.primary}15` }]}>
              <Text style={[styles.catTagText, { color: colors.primary, fontFamily: 'Inter_500Medium' }]}>
                {tool.category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, marginBottom: 16,
  },
  greeting: { fontSize: 13, marginBottom: 2 },
  heroTitle: { fontSize: 28, letterSpacing: -0.5 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { fontSize: 12 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: 20, marginBottom: 28,
    borderWidth: 1, borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 13,
  },
  searchPlaceholder: { fontSize: 14, flex: 1 },
  section: { marginBottom: 28, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, marginBottom: 12 },
  twoCol: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  recentCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1, borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10,
    width: '47%',
  },
  recentTitle: { fontSize: 12, flex: 1 },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  trendCard: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderRadius: 14,
    padding: 14, marginBottom: 8, gap: 12,
  },
  trendInfo: { flex: 1 },
  trendTitle: { fontSize: 14, marginBottom: 2 },
  trendDesc: { fontSize: 12 },
  catTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  catTagText: { fontSize: 11 },
});
