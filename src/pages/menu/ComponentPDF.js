import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
    paddingBottom: 4,
    marginBottom: 4,
  },
  cell: {
    flex: 1,
    paddingRight: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const ComponentPDF = ({ logbookData }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Logbook Entries</Text>

      <View style={styles.row}>
        <Text style={[styles.cell, styles.bold]}>Date</Text>
        <Text style={[styles.cell, styles.bold]}>Activity</Text>
        <Text style={[styles.cell, styles.bold]}>Description</Text>
      </View>

      {logbookData.map((entry, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.cell}>{entry.date}</Text>
          <Text style={styles.cell}>{entry.activity}</Text>
          <Text style={styles.cell}>{entry.description}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default ComponentPDF;
