import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 50,
    paddingBottom: 120, // Extra space for footer
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#152F34',
  },
  subheaderText: {
    fontSize: 10,
    color: '#596B75',
    marginTop: 5,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 14,
    color: '#20E28F',
    fontWeight: 'bold',
  },
  // Enhanced footer styles
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#152F34',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '4px solid #20E28F',
  },
  footerCol: {
    flexDirection: 'column',
    width: '33%',
  },
  footerLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20E28F',
    marginBottom: 6,
  },
  footerSocialLinks: {
    flexDirection: 'row',
    marginTop: 8,
  },
  footerSocialLink: {
    fontSize: 9,
    color: '#20E28F',
    marginRight: 8,
    textDecoration: 'none',
  },
  footerHeading: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 9,
    color: '#CCCCCC',
    marginBottom: 2,
  },
  footerCompanyInfo: {
    fontSize: 8,
    color: '#AAAAAA',
    textAlign: 'right',
    marginTop: 6,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 10,
    color: '#FFFFFF',
  },
  copyright: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    fontSize: 9,
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#152F34',
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#E5F1F5',
    borderRadius: 5,
  },
  tableHeader: {
    backgroundColor: '#20E28F',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  tableHeaderCell: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    padding: 5,
    textAlign: 'center',
  },
  featureRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 8,
  },
  featureCell: {
    flex: 2,
    fontSize: 9,
    padding: 5,
  },
  compareCell: {
    flex: 1,
    fontSize: 9,
    padding: 5,
    textAlign: 'center',
  },
  checkIcon: {
    color: '#20E28F',
    fontSize: 10,
  },
  crossIcon: {
    color: '#FF5A5A',
    fontSize: 10,
  },
  partialIcon: {
    color: '#FFC107',
    fontSize: 10,
  },
  pageBreak: {
    marginTop: 30,
    marginBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
});

// Component definition for Tool Comparison PDF
const ToolComparisonPDFDocument = ({ tools }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with logo */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>AI Tool Comparison</Text>
          <Text style={styles.subheaderText}>AI Efficiency Scorecard - Learning Hub</Text>
        </View>
        <View>
          <Text style={styles.logoText}>Social Garden</Text>
        </View>
      </View>
      
      {/* Tool Comparison Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tool Comparison Matrix</Text>
        
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Feature</Text>
          {tools.map((tool, i) => (
            <Text key={i} style={styles.tableHeaderCell}>{tool.name}</Text>
          ))}
        </View>
        
        {/* Features Comparison - Example rows */}
        <View style={styles.featureRow}>
          <Text style={styles.featureCell}>Ease of Implementation</Text>
          {tools.map((tool, i) => (
            <Text key={i} style={styles.compareCell}>
              {tool.easeOfImplementation === 'high' ? '★★★' : 
               tool.easeOfImplementation === 'medium' ? '★★' : '★'}
            </Text>
          ))}
        </View>
        
        <View style={styles.featureRow}>
          <Text style={styles.featureCell}>Cost Efficiency</Text>
          {tools.map((tool, i) => (
            <Text key={i} style={styles.compareCell}>
              {tool.costEfficiency === 'high' ? '★★★' : 
               tool.costEfficiency === 'medium' ? '★★' : '★'}
            </Text>
          ))}
        </View>
        
        <View style={styles.featureRow}>
          <Text style={styles.featureCell}>Integration Capabilities</Text>
          {tools.map((tool, i) => (
            <Text key={i} style={styles.compareCell}>
              {tool.hasIntegration ? <Text style={styles.checkIcon}>✓</Text> : <Text style={styles.crossIcon}>✗</Text>}
            </Text>
          ))}
        </View>
        
        <View style={styles.featureRow}>
          <Text style={styles.featureCell}>Custom AI Training</Text>
          {tools.map((tool, i) => (
            <Text key={i} style={styles.compareCell}>
              {tool.customTraining ? <Text style={styles.checkIcon}>✓</Text> : <Text style={styles.crossIcon}>✗</Text>}
            </Text>
          ))}
        </View>
        
        <View style={styles.featureRow}>
          <Text style={styles.featureCell}>Enterprise Support</Text>
          {tools.map((tool, i) => (
            <Text key={i} style={styles.compareCell}>
              {tool.enterpriseSupport === 'full' ? <Text style={styles.checkIcon}>✓</Text> : 
               tool.enterpriseSupport === 'partial' ? <Text style={styles.partialIcon}>~</Text> : 
               <Text style={styles.crossIcon}>✗</Text>}
            </Text>
          ))}
        </View>
      </View>
      
      {/* Recommendations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { textAlign: 'left' }]}>
            Based on your specific needs and the comparative analysis above, we recommend focusing on tools that offer the best balance between ease of implementation and integration capabilities with your existing systems. Consider starting with a pilot project using one of the highly-rated tools to validate the approach before full implementation.
          </Text>
        </View>
      </View>
      
      {/* Fixed Footer */}
      <View style={styles.fixedFooter} fixed>
        {/* Column 1: Company and Social Links */}
        <View style={styles.footerCol}>
          <Link src="https://www.socialgarden.com.au/">
            <Text style={styles.footerLogo}>Social Garden</Text>
          </Link>
          <View style={styles.footerSocialLinks}>
            <Link src="https://www.linkedin.com/company/social-garden/">
              <Text style={styles.footerSocialLink}>[LinkedIn]</Text>
            </Link>
            <Link src="https://twitter.com/socialgardenau">
              <Text style={styles.footerSocialLink}>[Twitter]</Text>
            </Link>
          </View>
        </View>
        
        {/* Column 2: Address Information */}
        <View style={styles.footerCol}>
          <Text style={styles.footerHeading}>MELBOURNE</Text>
          <Text style={styles.footerText}>123 Collins Street</Text>
          <Text style={styles.footerText}>Melbourne, VIC 3000</Text>
          
          <Text style={styles.footerHeading}>SYDNEY</Text>
          <Text style={styles.footerText}>456 George Street</Text>
          <Text style={styles.footerText}>Sydney, NSW 2000</Text>
        </View>
        
        {/* Column 3: Company Links */}
        <View style={styles.footerCol}>
          <Link src="https://www.socialgarden.com.au/about">
            <Text style={styles.footerSocialLink}>About Us</Text>
          </Link>
          <Link src="https://www.socialgarden.com.au/services">
            <Text style={styles.footerSocialLink}>Services</Text>
          </Link>
          <Link src="https://www.socialgarden.com.au/contact">
            <Text style={styles.footerSocialLink}>Contact</Text>
          </Link>
          <Link src="https://www.socialgarden.com.au/privacy">
            <Text style={styles.footerSocialLink}>Privacy Policy</Text>
          </Link>
        </View>
        
        <Text style={styles.copyright}>© {new Date().getFullYear()} Social Garden. All rights reserved.</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </View>
    </Page>
  </Document>
);

export default ToolComparisonPDFDocument; 