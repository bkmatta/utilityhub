import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text,
  TextInput, TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { useColors } from '@/hooks/useColors';
import { getToolBySlug } from '@/lib/registry';
import { Tool, ToolField } from '@/lib/types';

const DESKTOP_ONLY_CATEGORIES = ['pdf', 'image'];

export default function ToolScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const tool = getToolBySlug(slug ?? '');
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [results, setResults] = useState<Record<string, any> | null>(null);
  const [calculated, setCalculated] = useState(false);

  // Initialize defaults
  useEffect(() => {
    if (!tool) return;
    const defaults: Record<string, any> = {};
    tool.inputs.forEach((f) => { defaults[f.name] = f.defaultValue ?? ''; });
    setInputs(defaults);
    setResults(null);
    setCalculated(false);
  }, [slug]);

  // Track recents
  useEffect(() => {
    if (!slug) return;
    AsyncStorage.getItem('recent_tools').then((val) => {
      let slugs: string[] = [];
      try { slugs = val ? JSON.parse(val) : []; } catch { /* ignore */ }
      const filtered = slugs.filter((s) => s !== slug);
      filtered.unshift(slug);
      AsyncStorage.setItem('recent_tools', JSON.stringify(filtered.slice(0, 20)));
    });
  }, [slug]);

  const calculate = useCallback(() => {
    if (!tool) return;
    try {
      const result = tool.calculate(inputs);
      setResults(result);
      setCalculated(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      setResults({ error: 'Calculation failed. Please check your inputs.' });
      setCalculated(true);
    }
  }, [tool, inputs]);

  const reset = () => {
    if (!tool) return;
    const defaults: Record<string, any> = {};
    tool.inputs.forEach((f) => { defaults[f.name] = f.defaultValue ?? ''; });
    setInputs(defaults);
    setResults(null);
    setCalculated(false);
  };

  if (!tool) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Feather name="alert-circle" size={40} color={colors.border} />
        <Text style={[styles.notFoundText, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
          Tool not found
        </Text>
      </View>
    );
  }

  if (DESKTOP_ONLY_CATEGORIES.includes(tool.category)) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Feather name="monitor" size={44} color={colors.primary} />
        <Text style={[styles.desktopTitle, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>
          Desktop Only
        </Text>
        <Text style={[styles.desktopDesc, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
          This tool uses file processing APIs that require a browser. Please visit utilityhub.com on your desktop to use this tool.
        </Text>
      </View>
    );
  }

  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: botPad + 24, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Description */}
        <Text style={[styles.desc, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
          {tool.description}
        </Text>

        {/* Inputs */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>
            Inputs
          </Text>
          {tool.inputs.map((field) => (
            <FieldInput
              key={field.name}
              field={field}
              value={inputs[field.name]}
              onChange={(val) => setInputs((prev) => ({ ...prev, [field.name]: val }))}
              colors={colors}
            />
          ))}
        </View>

        {/* Calculate button */}
        <TouchableOpacity
          style={[styles.calcBtn, { backgroundColor: colors.primary }]}
          onPress={calculate}
          activeOpacity={0.85}
        >
          <Feather name="play" size={16} color={colors.primaryForeground} />
          <Text style={[styles.calcBtnText, { color: colors.primaryForeground, fontFamily: 'Inter_600SemiBold' }]}>
            Calculate
          </Text>
        </TouchableOpacity>

        {/* Results */}
        {calculated && results && (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.resultsHeader}>
              <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>
                Results
              </Text>
              <TouchableOpacity onPress={reset} hitSlop={8}>
                <Feather name="refresh-cw" size={16} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>
            {results.error ? (
              <Text style={[styles.errorText, { color: colors.destructive, fontFamily: 'Inter_400Regular' }]}>
                {results.error}
              </Text>
            ) : (
              tool.outputs.map((out) => (
                <ResultRow
                  key={out.name}
                  label={out.label}
                  value={results[out.name]}
                  type={out.type}
                  colors={colors}
                />
              ))
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FieldInput({
  field, value, onChange, colors,
}: {
  field: ToolField;
  value: any;
  onChange: (v: any) => void;
  colors: ReturnType<typeof useColors>;
}) {
  if (field.type === 'select' && field.options) {
    return (
      <View style={styles.fieldWrap}>
        <Text style={[styles.fieldLabel, { color: colors.mutedForeground, fontFamily: 'Inter_500Medium' }]}>
          {field.label}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
          {field.options.map((opt) => {
            const active = String(value) === String(opt.value);
            return (
              <TouchableOpacity
                key={String(opt.value)}
                style={[
                  styles.optionChip,
                  { borderColor: active ? colors.primary : colors.border, backgroundColor: active ? `${colors.primary}18` : colors.background },
                ]}
                onPress={() => onChange(opt.value)}
              >
                <Text style={[styles.optionText, { color: active ? colors.primary : colors.foreground, fontFamily: active ? 'Inter_600SemiBold' : 'Inter_400Regular' }]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, { color: colors.mutedForeground, fontFamily: 'Inter_500Medium' }]}>
        {field.label}{field.unit ? ` (${field.unit})` : ''}
      </Text>
      <TextInput
        style={[styles.textInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.foreground, fontFamily: 'Inter_400Regular' }]}
        value={String(value ?? '')}
        onChangeText={(t) => onChange(field.type === 'number' ? t : t)}
        keyboardType={field.type === 'number' ? 'decimal-pad' : 'default'}
        placeholder={field.placeholder ?? (field.type === 'number' ? '0' : 'Enter value...')}
        placeholderTextColor={colors.mutedForeground}
      />
    </View>
  );
}

function ResultRow({ label, value, type, colors }: { label: string; value: any; type: string; colors: ReturnType<typeof useColors> }) {
  const formatted = formatValue(value, type);
  return (
    <View style={[styles.resultRow, { borderBottomColor: colors.border }]}>
      <Text style={[styles.resultLabel, { color: colors.mutedForeground, fontFamily: 'Inter_400Regular' }]}>
        {label}
      </Text>
      <Text style={[styles.resultValue, { color: colors.primary, fontFamily: 'Inter_700Bold' }]} selectable>
        {formatted}
      </Text>
    </View>
  );
}

function formatValue(value: any, type: string): string {
  if (value === null || value === undefined) return '—';
  const num = Number(value);
  if (type === 'currency') {
    if (isNaN(num)) return String(value);
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  if (type === 'percentage') return `${value}%`;
  if (type === 'number') {
    if (isNaN(num)) return String(value);
    return num.toLocaleString('en-IN', { maximumFractionDigits: 4 });
  }
  if (type === 'json') {
    try { return JSON.stringify(JSON.parse(value as string), null, 2); } catch { return String(value); }
  }
  return String(value);
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  desc: { fontSize: 13, lineHeight: 20, marginBottom: 16 },
  card: {
    borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 14,
  },
  cardTitle: { fontSize: 14, marginBottom: 14 },
  calcBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderRadius: 14, paddingVertical: 14, marginBottom: 14,
  },
  calcBtnText: { fontSize: 15 },
  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  resultRow: {
    paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6,
  },
  resultLabel: { fontSize: 13, flex: 1 },
  resultValue: { fontSize: 16 },
  errorText: { fontSize: 14, lineHeight: 20 },
  fieldWrap: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, marginBottom: 6 },
  textInput: {
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10,
    fontSize: 15,
  },
  optionScroll: { flexDirection: 'row' },
  optionChip: {
    borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, marginRight: 8,
  },
  optionText: { fontSize: 13 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  notFoundText: { fontSize: 14 },
  desktopTitle: { fontSize: 18, marginTop: 8 },
  desktopDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
