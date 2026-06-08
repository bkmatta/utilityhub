import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { ToolCard } from '@/components/ToolCard';
import { useColors } from '@/hooks/useColors';
import { allTools, searchTools } from '@/lib/registry';
import { Tool } from '@/lib/types';

export default function SearchScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const results: Tool[] = query.length > 0 ? searchTools(query) : allTools;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Header */}
      <View style={[styles.headerWrap, { paddingTop: topPad + 8 }]}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: 'Inter_700Bold' }]}>
          Search
        </Text>
        <View style={[styles.inputWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            style={[styles.input, { color: colors.foreground, fontFamily: 'Inter_400Regular' }]}
            placeholder="Search tools..."
            placeholderTextColor={colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
              <Feather name="x-circle" size={16} color={colors.mutedForeground} />
            </TouchableOpacity>
          )}
        </View>
        {query.length > 0 && (
          <Text style={[styles.resultCount, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </Text>
        )}
      </View>

      <FlatList
        data={results}
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
            <Feather name="search" size={40} color={colors.border} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
              No tools found for "{query}"
            </Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrap: { paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 28, letterSpacing: -0.5, marginBottom: 14 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1, borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 12,
    marginBottom: 8,
  },
  input: { flex: 1, fontSize: 15 },
  resultCount: { fontSize: 12, marginBottom: 4 },
  list: { paddingHorizontal: 20, paddingTop: 4 },
  empty: { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText: { fontSize: 14, textAlign: 'center' },
});
