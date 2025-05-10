// final/components/learning-hub/pdf/PrioritizationMatrixPDFDocument.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register a common font if needed, e.g., Helvetica (default) or a custom one.
// For simplicity, we'll use the default Helvetica. If you have a specific brand font,
// you would register it here using Font.register.

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 35,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 65, // Increased bottom padding for potential footer space or just margin
    lineHeight: 1.4,
    color: '#333333',
  },
  header: {
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
    color: '#004851', // Brand color: Dark Teal
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#004851', // Brand color: Dark Teal
    borderBottomWidth: 1,
    borderBottomColor: '#68F6C8', // Brand color: Mint Green for accent
    paddingBottom: 3,
  },
  subSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#004851', // Darker shade or same brand color
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'justify',
  },
  instructionText: {
    fontSize: 9,
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#555555',
  },
  listItem: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 10, // Indent list items
  },
  // Table Styles
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#BDBDBD', // Lighter grey for borders
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
    marginBottom: 15,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Default row color
  },
  tableRowAlt: {
    margin: 'auto',
    flexDirection: 'row',
    backgroundColor: '#F7F9FA', // Slightly off-white for alternating rows
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderColor: '#BDBDBD',
    borderBottomColor: '#004851', // Brand color for header bottom border
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1.5, // Thicker bottom border for header
    backgroundColor: '#E0F2F1', // Light teal background for header, derived from brand
    padding: 6,
    flexGrow: 1,
  },
  tableCol: {
    borderStyle: 'solid',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    flexGrow: 1,
  },
  tableHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#004851', // Brand color for header text
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 8,
    textAlign: 'left',
  },
  tableCellCentered: {
    fontSize: 8,
    textAlign: 'center',
  },
  // Specific column widths for Prioritization Matrix
  useCaseCol: { width: '30%' },
  criteriaCol: { width: '12%' }, // For Impact, Feasibility, Urgency, Score
  notesCol: { width: '34%' },   // For Notes, wider

  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: 'grey',
    fontSize: 8,
  }
});

// Define the structure of your PDF document
const PrioritizationMatrixPDFDocument = () => (
  <Document title="AI Use Case Prioritization Matrix">
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>AI Use Case Prioritization Matrix</Text>

      {/* Instructions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionText}>
          This matrix helps you evaluate and prioritize potential AI use cases based on predefined criteria.
          For each use case, assess it against each criterion and assign a score. The total score will help
          in ranking the use cases.
        </Text>
        <Text style={styles.text}>
          1. List all potential AI use cases.
        </Text>
        <Text style={styles.text}>
          2. Define your scoring mechanism (e.g., 1-5, 1-10).
        </Text>
        <Text style={styles.text}>
          3. Score each use case on 'Impact', 'Feasibility', and 'Urgency'.
        </Text>
        <Text style={styles.text}>
          4. Calculate the 'Overall Score' (this could be a sum or a weighted average).
        </Text>
        <Text style={styles.text}>
          5. Add any relevant 'Notes' or considerations.
        </Text>
      </View>

      {/* Criteria Definitions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Criteria Definitions</Text>
        <Text style={styles.subSectionTitle}>Impact</Text>
        <Text style={styles.text}>
          The potential positive effect or benefit the AI use case will have on business goals, efficiency, revenue, customer satisfaction, etc.
        </Text>
        <Text style={styles.subSectionTitle}>Feasibility</Text>
        <Text style={styles.text}>
          The likelihood of successfully implementing the AI use case, considering technical complexity, resource availability (budget, skills, data), and time constraints.
        </Text>
        <Text style={styles.subSectionTitle}>Urgency</Text>
        <Text style={styles.text}>
          The timeliness or critical need for implementing the AI use case, considering market pressures, competitive advantages, or immediate problem-solving.
        </Text>
        {/* Add more criteria definitions if needed */}
      </View>

      {/* Use Case Evaluation Matrix Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Use Case Evaluation Matrix</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={[styles.tableColHeader, styles.useCaseCol]}><Text style={styles.tableHeader}>Use Case / Initiative</Text></View>
            <View style={[styles.tableColHeader, styles.criteriaCol]}><Text style={styles.tableHeader}>Impact (1-10)</Text></View>
            <View style={[styles.tableColHeader, styles.criteriaCol]}><Text style={styles.tableHeader}>Feasibility (1-10)</Text></View>
            <View style={[styles.tableColHeader, styles.criteriaCol]}><Text style={styles.tableHeader}>Urgency (1-10)</Text></View>
            <View style={[styles.tableColHeader, styles.criteriaCol]}><Text style={styles.tableHeader}>Overall Score</Text></View>
            <View style={[styles.tableColHeader, styles.notesCol]}><Text style={styles.tableHeader}>Notes / Comments</Text></View>
          </View>

          {/* Example Row 1 (Blank for template) */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.useCaseCol]}><Text style={styles.tableCell}> </Text></View>
            <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
            <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
            <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
            <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
            <View style={[styles.tableCol, styles.notesCol]}><Text style={styles.tableCell}> </Text></View>
          </View>

          {/* Example Row 2 (Blank for template) */}
           <View style={styles.tableRowAlt}>
            <View style={[styles.tableCol, styles.useCaseCol]}><Text style={styles.tableCell}> </Text></View>
            <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
            <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
            <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
            <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
            <View style={[styles.tableCol, styles.notesCol]}><Text style={styles.tableCell}> </Text></View>
          </View>

          {/* Add more blank rows as needed to represent the template structure */}
          {[...Array(5)].map((_, i) => (
            <View style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt} key={`row-${i}`}>
              <View style={[styles.tableCol, styles.useCaseCol]}><Text style={styles.tableCell}> </Text></View>
              <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
              <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
              <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
              <View style={[styles.tableCol, styles.criteriaCol]}><Text style={styles.tableCellCentered}> </Text></View>
              <View style={[styles.tableCol, styles.notesCol]}><Text style={styles.tableCell}> </Text></View>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.footer} fixed>
        AI Use Case Prioritization Matrix - Generated from Learning Hub
      </Text>
    </Page>
  </Document>
);

export default PrioritizationMatrixPDFDocument;
