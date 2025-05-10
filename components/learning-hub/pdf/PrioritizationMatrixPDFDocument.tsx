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
  // Enhanced header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderBottom: '1px solid #E5E7EB',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 10,
    color: '#596B75',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'flex-end',
  },
  logo: {
    width: 120,
    height: 40,
  },
  // Enhanced typography
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#004851',
    textAlign: 'center',
  },
  introduction: {
    fontSize: 12,
    marginBottom: 24,
    color: '#333333',
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 30,
    color: '#004851',
    borderBottom: '2px solid #68F6C8',
    paddingBottom: 8,
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 18,
    color: '#004851',
  },
  text: {
    fontSize: 11,
    marginBottom: 12,
    lineHeight: 1.5,
    color: '#333333',
  },
  // Enhanced list styling
  listItem: {
    fontSize: 11,
    marginBottom: 8,
    lineHeight: 1.5,
    color: '#333333',
    flexDirection: 'row',
  },
  bullet: {
    width: 15,
    fontSize: 11,
    color: '#68F6C8',
    fontWeight: 'bold',
  },
  listItemContent: {
    flex: 1,
    fontSize: 11,
  },
  // Enhanced table styling
  tableHeader: {
    backgroundColor: '#004851',
    flexDirection: 'row',
    borderBottomColor: '#68F6C8',
    borderBottomWidth: 2,
    textAlign: 'center',
    borderRadius: '4 4 0 0',
  },
  tableHeaderCell: {
    margin: 8,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    minHeight: 30,
    alignItems: 'center',
  },
  tableRowEven: {
    flexDirection: 'row',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    backgroundColor: '#F9FAFB',
    minHeight: 30,
    alignItems: 'center',
  },
  tableDescriptionCell: {
    width: '30%',
    padding: 8,
    fontSize: 10,
  },
  tableScoreCell: {
    width: '10%',
    padding: 8,
    fontSize: 10,
    textAlign: 'center',
  },
  tableNotesCell: {
    width: '20%',
    padding: 8,
    fontSize: 10,
  },
  // Enhanced criteria box styling
  criteriaBox: {
    border: '1px solid #E5E7EB',
    borderRadius: 6,
    padding: 12,
    marginBottom: 18,
    backgroundColor: '#F9FAFB',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  criteriaTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#004851',
  },
  criteriaDescription: {
    fontSize: 11,
    marginBottom: 10,
    color: '#333333',
    lineHeight: 1.5,
  },
  criteriaScale: {
    fontSize: 10,
    color: '#596B75',
    marginBottom: 3,
    lineHeight: 1.4,
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
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  headerSection: {
    backgroundColor: '#E5F1F5',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  tableHeader: {
    backgroundColor: '#20E28F',
    color: '#FFFFFF',
    padding: 8,
    fontWeight: 'bold',
    flexDirection: 'row',
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  impactCell: {
    width: '25%',
    padding: 5,
  },
  effortCell: {
    width: '25%',
    padding: 5,
  },
  scoreCell: {
    width: '25%',
    padding: 5,
    color: '#20E28F',
    fontWeight: 'bold',
  },
  priorityCell: {
    width: '25%',
    padding: 5,
  },
  copyright: {
    position: 'absolute',
    bottom: 5,
    left: 20,
    fontSize: 9,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});

// PDF content component
const PrioritizationMatrixPDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Enhanced header with logo */}
      <View style={styles.header}>
        <Text style={styles.headerText}>AI EFFICIENCY SCORECARD - LEARNING HUB</Text>
        <View style={styles.logoContainer}>
          <Image src="/footer-logo.svg" style={styles.logo} />
        </View>
      </View>
      
      {/* Enhanced title and introduction */}
      <Text style={styles.title}>AI Use Case Prioritization Matrix</Text>
      
      <Text style={styles.introduction}>
        This structured framework helps evaluate and prioritize potential AI initiatives based on key business 
        and technical factors. Use it to systematically focus your resources on the most impactful opportunities 
        first, ensuring maximum return on your AI investments.
      </Text>
      
      {/* Enhanced section with better styling */}
      <Text style={styles.sectionTitle}>Instructions</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>1. </Text>
        <Text style={styles.listItemContent}>List your potential AI initiatives or use cases in the table.</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>2. </Text>
        <Text style={styles.listItemContent}>Score each use case against the defined criteria using the 1-5 scale described below.</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>3. </Text>
        <Text style={styles.listItemContent}>Calculate the priority score using the formula: (Impact + Confidence + Strategic Alignment) - Effort.</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>4. </Text>
        <Text style={styles.listItemContent}>Use the resulting rankings to guide your AI investment decisions and resource allocation.</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Prioritization Criteria Definitions</Text>
      
      {/* Enhanced criteria boxes with better styling */}
      <View style={styles.criteriaBox}>
        <Text style={styles.criteriaTitle}>(A) Potential Business Impact (Score 1-5)</Text>
        <Text style={styles.criteriaDescription}>
          How significantly could this initiative impact key business goals (e.g., revenue, cost savings, efficiency, customer experience)?
        </Text>
        <Text style={styles.criteriaScale}>5 = Transformational Impact: Could fundamentally change business outcomes</Text>
        <Text style={styles.criteriaScale}>4 = High Impact: Will significantly improve business metrics</Text>
        <Text style={styles.criteriaScale}>3 = Moderate Impact: Will noticeably improve business metrics</Text>
        <Text style={styles.criteriaScale}>2 = Low Impact: Will slightly improve business metrics</Text>
        <Text style={styles.criteriaScale}>1 = Minor Impact: Minimal effect on business metrics</Text>
      </View>
      
      <View style={styles.criteriaBox}>
        <Text style={styles.criteriaTitle}>(B) Implementation Effort/Cost (Score 1-5)</Text>
        <Text style={styles.criteriaDescription}>
          How much time, budget, technical resources, and organizational change are required?
        </Text>
        <Text style={styles.criteriaScale}>5 = Very High Effort/Cost: Major investment with significant resources required</Text>
        <Text style={styles.criteriaScale}>4 = High Effort/Cost: Substantial investment and resources needed</Text>
        <Text style={styles.criteriaScale}>3 = Moderate Effort/Cost: Reasonable investment and resource requirements</Text>
        <Text style={styles.criteriaScale}>2 = Low Effort/Cost: Minimal investment and resources required</Text>
        <Text style={styles.criteriaScale}>1 = Very Low Effort/Cost: Trivial investment with existing resources</Text>
        <Text style={styles.criteriaDescription}>
          Note: A higher score for Effort/Cost is less favorable in the priority calculation.
        </Text>
      </View>
      
      {/* Enhanced branded footer with detailed layout */}
      <View style={styles.fixedFooter} fixed>
        {/* Column 1: Logo and Social Links */}
        <View style={styles.footerCol}>
          <Link src="#">
            <Text style={styles.footerLogo}>SOCIAL GARDEN</Text>
          </Link>
          <View style={styles.footerSocialLinks}>
            <Link src="#"><Text style={styles.footerSocialLink}>LinkedIn</Text></Link>
            <Link src="#"><Text style={styles.footerSocialLink}>Twitter</Text></Link>
            <Link src="#"><Text style={styles.footerSocialLink}>Instagram</Text></Link>
          </View>
        </View>
        
        {/* Column 2: Address Information */}
        <View style={styles.footerCol}>
          <Text style={styles.footerHeading}>MELBOURNE</Text>
          <Text style={styles.footerText}>123 Collins Street</Text>
          <Text style={styles.footerCompanyInfo}>Melbourne, VIC 3000</Text>
          
          <Text style={styles.footerHeading}>SYDNEY</Text>
          <Text style={styles.footerText}>456 George Street</Text>
          <Text style={styles.footerCompanyInfo}>Sydney, NSW 2000</Text>
        </View>
        
        {/* Column 3: Links */}
        <View style={styles.footerCol}>
          <View style={styles.footerLinks}>
            <Link src="#"><Text style={styles.footerLink}>Careers</Text></Link>
            <Link src="#"><Text style={styles.footerLink}>Privacy Policy</Text></Link>
            <Link src="#"><Text style={styles.footerLink}>Terms of Service</Text></Link>
            <Link src="#"><Text style={styles.footerLink}>Contact Us</Text></Link>
          </View>
        </View>
        
        {/* Copyright and Page Numbers */}
        <Text style={styles.copyright}>© {new Date().getFullYear()} Social Garden. All rights reserved.</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </View>
    </Page>
    
    <Page size="A4" style={styles.page}>
      {/* Enhanced header with logo */}
      <View style={styles.header}>
        <Text style={styles.headerText}>AI EFFICIENCY SCORECARD - LEARNING HUB</Text>
        <View style={styles.logoContainer}>
          <Image src="/footer-logo.svg" style={styles.logo} />
        </View>
      </View>
      
      <View style={styles.criteriaBox}>
        <Text style={styles.criteriaTitle}>(C) Confidence / Data Availability (Score 1-5)</Text>
        <Text style={styles.criteriaDescription}>
          How confident are we in the technical feasibility, and what is the availability and quality of the required data?
        </Text>
        <Text style={styles.criteriaScale}>5 = Very High Confidence: Data ready & high quality, proven technical approach</Text>
        <Text style={styles.criteriaScale}>4 = High Confidence: Data mostly available, technical approach well-understood</Text>
        <Text style={styles.criteriaScale}>3 = Moderate Confidence: Some data gaps or quality concerns, feasible technical approach</Text>
        <Text style={styles.criteriaScale}>2 = Low Confidence: Significant data gaps, technical approach uncertain</Text>
        <Text style={styles.criteriaScale}>1 = Very Low Confidence: Critical data missing, technical approach unproven</Text>
      </View>
      
      <View style={styles.criteriaBox}>
        <Text style={styles.criteriaTitle}>(D) Strategic Alignment (Score 1-5)</Text>
        <Text style={styles.criteriaDescription}>
          How well does this initiative align with current, key business priorities and strategic objectives?
        </Text>
        <Text style={styles.criteriaScale}>5 = Perfectly Aligned: Core to current strategic priorities</Text>
        <Text style={styles.criteriaScale}>4 = Strongly Aligned: Directly supports strategic objectives</Text>
        <Text style={styles.criteriaScale}>3 = Moderately Aligned: Relates to strategic objectives</Text>
        <Text style={styles.criteriaScale}>2 = Loosely Aligned: Indirectly supports strategic objectives</Text>
        <Text style={styles.criteriaScale}>1 = Poorly Aligned: Not related to current strategic priorities</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Use Case Evaluation Matrix</Text>
      
      {/* Enhanced table with better styling */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Use Case Description</Text>
        <Text style={[styles.tableHeaderCell, { width: '10%' }]}>Impact</Text>
        <Text style={[styles.tableHeaderCell, { width: '10%' }]}>Effort</Text>
        <Text style={[styles.tableHeaderCell, { width: '10%' }]}>Confidence</Text>
        <Text style={[styles.tableHeaderCell, { width: '10%' }]}>Strategy</Text>
        <Text style={[styles.tableHeaderCell, { width: '10%' }]}>Priority Score</Text>
        <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Notes</Text>
      </View>
      
      {/* Example rows with alternating background colors */}
      <View style={styles.tableRow}>
        <Text style={[styles.tableDescriptionCell, { width: '30%' }]}>AI-Powered Lead Scoring</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>4</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>3</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>4</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>5</Text>
        <Text style={[styles.tableScoreCell, { width: '10%', fontWeight: 'bold' }]}>10</Text>
        <Text style={[styles.tableNotesCell, { width: '20%' }]}>Requires clean CRM data; Integrate with Sales Process</Text>
      </View>
      
      <View style={styles.tableRowEven}>
        <Text style={[styles.tableDescriptionCell, { width: '30%' }]}>Customer Support Chatbot</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>3</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>4</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>3</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>3</Text>
        <Text style={[styles.tableScoreCell, { width: '10%', fontWeight: 'bold' }]}>5</Text>
        <Text style={[styles.tableNotesCell, { width: '20%' }]}>Needs comprehensive knowledge base; Pilot with FAQ</Text>
      </View>
      
      <View style={styles.tableRow}>
        <Text style={[styles.tableDescriptionCell, { width: '30%' }]}>Predictive Inventory Management</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>5</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>5</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>3</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>4</Text>
        <Text style={[styles.tableScoreCell, { width: '10%', fontWeight: 'bold' }]}>7</Text>
        <Text style={[styles.tableNotesCell, { width: '20%' }]}>Requires historical sales data; May need ERP integration</Text>
      </View>
      
      <View style={styles.tableRowEven}>
        <Text style={[styles.tableDescriptionCell, { width: '30%' }]}>Customer Churn Prediction</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>4</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>3</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>4</Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}>4</Text>
        <Text style={[styles.tableScoreCell, { width: '10%', fontWeight: 'bold' }]}>9</Text>
        <Text style={[styles.tableNotesCell, { width: '20%' }]}>Good customer behavior data available; High ROI potential</Text>
      </View>
      
      <View style={styles.tableRow}>
        <Text style={[styles.tableDescriptionCell, { width: '30%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableNotesCell, { width: '20%' }]}></Text>
      </View>
      
      <View style={styles.tableRowEven}>
        <Text style={[styles.tableDescriptionCell, { width: '30%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableScoreCell, { width: '10%' }]}></Text>
        <Text style={[styles.tableNotesCell, { width: '20%' }]}></Text>
      </View>
      
      {/* Enhanced branded footer with detailed layout */}
      <View style={styles.fixedFooter} fixed>
        {/* Column 1: Logo and Social Links */}
        <View style={styles.footerCol}>
          <Link src="#">
            <Text style={styles.footerLogo}>SOCIAL GARDEN</Text>
          </Link>
          <View style={styles.footerSocialLinks}>
            <Link src="#"><Text style={styles.footerSocialLink}>LinkedIn</Text></Link>
            <Link src="#"><Text style={styles.footerSocialLink}>Twitter</Text></Link>
            <Link src="#"><Text style={styles.footerSocialLink}>Instagram</Text></Link>
          </View>
        </View>
        
        {/* Column 2: Address Information */}
        <View style={styles.footerCol}>
          <Text style={styles.footerHeading}>MELBOURNE</Text>
          <Text style={styles.footerText}>123 Collins Street</Text>
          <Text style={styles.footerCompanyInfo}>Melbourne, VIC 3000</Text>
          
          <Text style={styles.footerHeading}>SYDNEY</Text>
          <Text style={styles.footerText}>456 George Street</Text>
          <Text style={styles.footerCompanyInfo}>Sydney, NSW 2000</Text>
        </View>
        
        {/* Column 3: Links */}
        <View style={styles.footerCol}>
          <View style={styles.footerLinks}>
            <Link src="#"><Text style={styles.footerLink}>Careers</Text></Link>
            <Link src="#"><Text style={styles.footerLink}>Privacy Policy</Text></Link>
            <Link src="#"><Text style={styles.footerLink}>Terms of Service</Text></Link>
            <Link src="#"><Text style={styles.footerLink}>Contact Us</Text></Link>
          </View>
        </View>
        
        {/* Copyright and Page Numbers */}
        <Text style={styles.copyright}>© {new Date().getFullYear()} Social Garden. All rights reserved.</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </View>
    </Page>
  </Document>
);

export default PrioritizationMatrixPDFDocument; 