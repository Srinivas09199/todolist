import React from 'react';
import { saveAs } from 'file-saver';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  task: {
    marginBottom: 10,
  },
  completed: {
    textDecoration: 'line-through',
  },
});

const DownloadPDF = ({ todos }) => {
  const generatePDF = () => {
    // Create a PDF document
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={{ marginBottom: 10, fontSize: 20 }}>Task List</Text>
            {todos.map(todo => (
              <View key={todo._id} style={[styles.task, todo.done ? styles.completed : null]}>
                <Text>{todo.task}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    // Generate blob from PDF document
    pdf(doc).toBlob().then(blob => {
      // Save PDF blob using file-saver
      saveAs(blob, 'task-list.pdf');
    });
  };

  return (
    <div>
      <button className="btn btn-secondary mt-3" onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default DownloadPDF;