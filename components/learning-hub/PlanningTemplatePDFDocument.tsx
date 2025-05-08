import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004851',
    textAlign: 'center',
  },
  introduction: {
    fontSize: 12,
    marginBottom: 20,
    color: '#333333',
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#004851',
    borderBottom: '1px solid #68F6C8',
    paddingBottom: 5,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 15,
    color: '#004851',
  },
  text: {
    fontSize: 11,
    marginBottom: 10,
    lineHeight: 1.4,
    color: '#333333',
  },
  listItem: {
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.4,
    color: '#333333',
    flexDirection: 'row',
  },
  bullet: {
    width: 10,
    fontSize: 11,
  },
  listItemContent: {
    flex: 1,
    fontSize: 11,
  },
  subListItem: {
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.4,
    color: '#333333',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 9,
    textAlign: 'center',
    color: '#666666',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 10,
    color: '#666666',
  },
});

// PDF content component
const PlanningTemplatePDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>AI Efficiency Scorecard - Learning Hub</Text>
      </View>
      
      <Text style={styles.title}>AI Project Planning Template</Text>
      
      <Text style={styles.introduction}>
        This template provides a structured framework to help you plan and implement AI initiatives within your organization. 
        Follow the six phases outlined below, addressing the guiding questions to ensure a comprehensive approach to your AI project.
      </Text>
      
      {/* Phase 1 */}
      <Text style={styles.sectionTitle}>Phase 1: Strategy & Goal Definition</Text>
      <Text style={styles.text}>
        Begin by clearly defining your strategic objectives and establishing measurable goals for your AI initiative.
      </Text>
      
      <Text style={styles.subsectionTitle}>Strategic Alignment</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How does this AI initiative support your overall business strategy?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What specific business problem or opportunity will this AI project address?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How does this initiative align with other digital transformation efforts?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Goal Setting</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What are the specific, measurable goals for this AI project? (KPIs)</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What does success look like in 3 months? 6 months? 1 year?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you measure ROI for this initiative?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Stakeholder Identification</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Who are the key stakeholders for this project?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Who will be the executive sponsor?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Who will be directly affected by this AI implementation?</Text>
      </View>
      
      {/* Phase 2 */}
      <Text style={styles.sectionTitle}>Phase 2: Data Assessment & Readiness</Text>
      <Text style={styles.text}>
        Evaluate your data landscape to ensure you have the necessary foundation for your AI initiative.
      </Text>
      
      <Text style={styles.subsectionTitle}>Data Inventory</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What data sources will be required for this AI initiative?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Is the necessary data currently available? If not, how will you acquire it?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Who are the data owners for each required data source?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Data Quality Assessment</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How would you rate the quality of your available data? (completeness, accuracy, consistency)</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What data cleaning or preparation will be necessary?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Are there known biases in your data that need to be addressed?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Data Infrastructure</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What data infrastructure is needed to support this AI initiative?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Are there any data integration challenges to overcome?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you ensure data security and compliance with regulations?</Text>
      </View>
    </Page>
    
    <Page size="A4" style={styles.page}>
      {/* Phase 3 */}
      <Text style={styles.sectionTitle}>Phase 3: Technology & Solution Design</Text>
      <Text style={styles.text}>
        Determine the most appropriate AI approach and outline the technical solution to address your business challenge.
      </Text>
      
      <Text style={styles.subsectionTitle}>AI Approach Selection</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Which AI approach best suits your business need? (e.g., machine learning, natural language processing, computer vision)</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Build vs. buy: Will you develop a custom solution or use existing AI tools/platforms?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What specific AI technologies or algorithms are most appropriate?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Technical Requirements</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What are the detailed technical requirements for this AI solution?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What computational resources will be required?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will the AI solution integrate with existing systems?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Solution Architecture</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What is the high-level architecture of the AI solution?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will users interact with the AI system?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What security measures need to be implemented?</Text>
      </View>
      
      {/* Phase 4 */}
      <Text style={styles.sectionTitle}>Phase 4: Pilot Program & Implementation</Text>
      <Text style={styles.text}>
        Design and execute a limited-scope implementation to validate your AI solution before full-scale deployment.
      </Text>
      
      <Text style={styles.subsectionTitle}>Pilot Scope</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What is the specific scope of your pilot program?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Which department, team, or function will participate in the pilot?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What is the timeline for the pilot implementation?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Implementation Plan</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What are the key milestones for implementation?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What resources (human, financial, technical) are required for implementation?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you manage change and ensure user adoption?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Testing & Feedback</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you test the AI solution during the pilot?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What mechanisms will you use to collect user feedback?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you iterate based on pilot results?</Text>
      </View>
      
      {/* Phase 5 */}
      <Text style={styles.sectionTitle}>Phase 5: Performance Monitoring & Baseline</Text>
      <Text style={styles.text}>
        Establish a baseline and set up systems to monitor the ongoing performance of your AI solution.
      </Text>
      
      <Text style={styles.subsectionTitle}>Performance Metrics</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What specific metrics will you track to measure AI performance?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How do these metrics relate to your defined business goals?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What is the current baseline for these metrics?</Text>
      </View>
    </Page>
    
    <Page size="A4" style={styles.page}>
      <Text style={styles.subsectionTitle}>Monitoring System</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you continuously monitor the AI system's performance?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What tools or dashboards will you use for monitoring?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Who will be responsible for regular performance review?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Model Governance</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you ensure ongoing ethical use of AI?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What processes will you implement for model validation and verification?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you handle model drift and data changes over time?</Text>
      </View>
      
      {/* Phase 6 */}
      <Text style={styles.sectionTitle}>Phase 6: Optimization & Scaling</Text>
      <Text style={styles.text}>
        Refine your AI solution based on performance data and develop a strategy for scaling across the organization.
      </Text>
      
      <Text style={styles.subsectionTitle}>Performance Optimization</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What opportunities exist to improve the AI solution's performance?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you address any issues or limitations identified during the pilot?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What additional data sources or features could enhance the solution?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Scaling Strategy</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What is your plan for scaling the AI solution across the organization?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What additional resources will be required for scaling?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you prioritize rollout to different departments or functions?</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Long-term Maintenance</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>Who will be responsible for the long-term maintenance of the AI solution?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>What ongoing training or updates will be necessary?</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>• </Text>
        <Text style={styles.listItemContent}>How will you continue to measure ROI and business impact over time?</Text>
      </View>

      <View style={styles.footer}>
        <Text>AI Efficiency Scorecard | AI Project Planning Template | Page 3</Text>
      </View>
    </Page>
  </Document>
);

export default PlanningTemplatePDFDocument; 