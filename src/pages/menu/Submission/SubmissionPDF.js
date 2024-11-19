import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        width: '30%',
        fontWeight: 'bold',
        fontSize: 10,
    },
    input: {
        borderBottom: '1px solid #000',
        width: '70%',
        fontSize: 10,
    },
    checkboxRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    checkbox: {
        width: '3%',
        height: '3%',
        border: '1px solid #000',
        marginRight: 5,
    },
    checkboxLabel: {
        fontSize: 10,
    },
});

// Create Document
const SubmissionPDF = () => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.title}>
                FORMULIR PENDAFTARAN MERDEKA BELAJAR{'\n'}POLITEKNIK NEGERI BATAM{'\n'}Tahun ……………
            </Text>
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Nama</Text>
                    <Text style={styles.input}></Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Nomor Induk Mahasiswa</Text>
                    <Text style={styles.input}></Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Program Studi Asal</Text>
                    <Text style={styles.input}></Text>
                </View>
                {/* Add additional rows similar to the above */}
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Jenis Program Merdeka Belajar:</Text>
                <View style={styles.checkboxRow}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.checkboxLabel}>Penelitian/Riset</Text>
                </View>
                <View style={styles.checkboxRow}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.checkboxLabel}>Proyek Kemanusiaan</Text>
                </View>
                {/* Add more checkbox options */}
            </View>
            {/* Add additional sections */}
        </Page>
    </Document>
);

export default SubmissionPDF;
