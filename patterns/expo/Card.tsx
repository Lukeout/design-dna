/**
 * Card — the atomic unit: name, thesis, preview, mono meta row.
 * Hairline border, flat radius; press feedback is opacity (ink), never lift.
 */
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import theme from './theme'; // tokens/<vibe>/native/theme.js, copied into the app

type Props = {
  name: string;
  thesis: string;
  meta?: string[];
  onPress?: () => void;
  children?: React.ReactNode; // the rendered preview — never ship title-only
};

export function Card({ name, thesis, meta = [], onPress, children }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.thesis}>{thesis}</Text>
      {children ? <View style={styles.preview}>{children}</View> : null}
      {meta.length > 0 && (
        <View style={styles.metaRow}>
          {meta.map((m) => (
            <Text key={m} style={styles.meta}>
              {m.toUpperCase()}
            </Text>
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.border,
    borderRadius: theme.radius.md,
    padding: theme.space['5'],
    marginBottom: theme.space['4'],
  },
  name: {
    fontFamily: theme.font.display,
    fontSize: theme.text.md,
    color: theme.color.ink,
    marginBottom: theme.space['1'],
  },
  thesis: {
    fontFamily: theme.font.body,
    fontSize: theme.text.sm,
    color: theme.color.inkMuted,
    marginBottom: theme.space['4'],
  },
  preview: {
    backgroundColor: theme.color.recessed ?? theme.color.bg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.borderFaint ?? theme.color.border,
    borderRadius: theme.radius.sm,
    padding: theme.space['4'],
  },
  metaRow: { flexDirection: 'row', gap: theme.space['3'], marginTop: theme.space['4'] },
  meta: {
    fontFamily: theme.font.mono,
    fontSize: theme.text.xs,
    color: theme.color.inkFaint ?? theme.color.inkMuted,
  },
});
