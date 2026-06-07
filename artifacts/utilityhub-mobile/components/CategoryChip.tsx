import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

interface CategoryInfo {
  slug: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
}

interface Props {
  category: CategoryInfo;
  toolCount: number;
  onPress: () => void;
}

export function CategoryCard({ category, toolCount, onPress }: Props) {
  const colors = useColors();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.iconWrap, { backgroundColor: isDark ? `${category.color}22` : category.bg }]}>
        <Feather name={category.icon as any} size={22} color={category.color} />
      </View>
      <Text style={[styles.label, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>
        {category.label}
      </Text>
      <Text style={[styles.count, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
        {toolCount} tools
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    minWidth: 100,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 13 },
  count: { fontSize: 11 },
});
