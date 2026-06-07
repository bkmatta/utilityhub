import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Tool } from '@/lib/types';

interface Props {
  tool: Tool;
  onPress: () => void;
  compact?: boolean;
}

export function ToolCard({ tool, onPress, compact }: Props) {
  const colors = useColors();

  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compact, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={onPress}
        activeOpacity={0.75}
      >
        <Text style={[styles.compactTitle, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]} numberOfLines={1}>
          {tool.title}
        </Text>
        <Text style={[styles.compactDesc, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]} numberOfLines={2}>
          {tool.description}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={[styles.title, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]} numberOfLines={1}>
            {tool.title}
          </Text>
          <Text style={[styles.desc, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]} numberOfLines={2}>
            {tool.description}
          </Text>
        </View>
        <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardText: { flex: 1 },
  title: { fontSize: 14, marginBottom: 2 },
  desc: { fontSize: 12, lineHeight: 18 },
  compact: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    flex: 1,
  },
  compactTitle: { fontSize: 13, marginBottom: 4 },
  compactDesc: { fontSize: 11, lineHeight: 16 },
});
