/**
 * Screen — page shell. Vibe background, left-weighted header, mono kicker.
 * Tokens only: import the vibe's native theme and reference nothing else.
 */
import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import theme from './theme'; // tokens/<vibe>/native/theme.js, copied into the app

type Props = {
  kicker?: string;
  title: string;
  children?: React.ReactNode;
};

export function Screen({ kicker, title, children }: Props) {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          {kicker ? <Text style={styles.kicker}>{kicker.toUpperCase()}</Text> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  scroll: { padding: theme.space['5'], paddingBottom: theme.space['8'] },
  header: { marginBottom: theme.space['6'], alignItems: 'flex-start' },
  kicker: {
    fontFamily: theme.font.mono,
    fontSize: theme.text.xs,
    letterSpacing: theme.text.xs * (theme.tracking?.kicker ?? 0.09),
    color: theme.color.accent,
    marginBottom: theme.space['2'],
  },
  title: {
    fontFamily: theme.font.display,
    fontSize: theme.text['2xl'],
    lineHeight: theme.text['2xl'] * (theme.leading?.tight ?? 1.1),
    color: theme.color.ink,
    textAlign: 'left',
  },
});
