import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const insights = [
  { icon: '💰', title: 'Follow the 50/30/20 rule', detail: 'Aim to use 50% of income for needs, 30% for wants and 20% for savings.' },
  { icon: '🎯', title: 'Set a savings goal', detail: 'Choose a monthly savings target and track your progress consistently.' },
  { icon: '🧾', title: 'Review your spending', detail: 'Check your transactions regularly and identify expenses you can reduce.' },
  { icon: '🛟', title: 'Build an emergency fund', detail: 'Gradually save enough to cover three to six months of essential expenses.' },
];

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>SIMPLIFY MONEY</Text>
      <Text style={styles.heading}>Money Insights</Text>
      <Text style={styles.subtitle}>Small steps today. Better finances tomorrow.</Text>
      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>YOUR FINANCIAL WELLNESS</Text>
        <Text style={styles.bannerTitle}>Make your money work for you.</Text>
        <Text style={styles.bannerText}>Build healthy habits, plan ahead and make informed financial decisions.</Text>
      </View>
      <Text style={styles.section}>Tips for you</Text>
      {insights.map((item) => (
        <View key={item.title} style={styles.card}>
          <Text style={styles.icon}>{item.icon}</Text>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.detail}</Text>
          </View>
        </View>
      ))}
      <Text style={styles.footer}>Your journey to smarter money management starts here.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F6FB' },
  content: { padding: 20, paddingTop: 32, paddingBottom: 40 },
  brand: { color: '#667085', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  heading: { color: '#172033', fontSize: 28, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#667085', fontSize: 14, marginTop: 7, marginBottom: 22 },
  banner: { backgroundColor: '#12345A', borderRadius: 18, padding: 22, marginBottom: 26 },
  bannerLabel: { color: '#BFD7FF', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  bannerTitle: { color: '#FFFFFF', fontSize: 23, fontWeight: '800', marginTop: 14, lineHeight: 30 },
  bannerText: { color: '#E0E9F7', fontSize: 14, lineHeight: 21, marginTop: 10 },
  section: { color: '#172033', fontSize: 19, fontWeight: '800', marginBottom: 13 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 17, marginBottom: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 13 },
  icon: { fontSize: 25 },
  cardBody: { flex: 1 },
  cardTitle: { color: '#172033', fontSize: 15, fontWeight: '700' },
  cardText: { color: '#667085', fontSize: 13, lineHeight: 20, marginTop: 6 },
  footer: { color: '#667085', fontSize: 12, textAlign: 'center', marginTop: 15, lineHeight: 19 },
});
