// 代码生成时间: 2025-09-13 21:15:39
// Import necessary libraries
const XLSX = require('xlsx'); // npm install xlsx
const path = require('path');
const fs = require('fs').promises;

// Define the ExcelGenerator class
class ExcelGenerator {
  // Constructor
  constructor() {
    // Initialize the workbook
    this.workbook = XLSX.utils.book_new();
  }

  // Function to add a sheet
  addSheet(data, sheetName = 'Sheet1') {
    const worksheet = XLSX.utils.aoa_to_sheet(data); // Converts array to worksheet
    this.workbook.Sheets[sheetName] = worksheet;
  }

  // Function to save the workbook as an Excel file
  async saveAsExcel(filename = 'generated_excel.xlsx') {
    try {
      if (!this.workbook || Object.keys(this.workbook.Sheets).length === 0) {
        throw new Error('No sheets added to the workbook.');
      }

      // Write the workbook to an Excel file
      const outputFilePath = path.join(__dirname, filename);
      await fs.writeFile(outputFilePath, XLSX.write(this.workbook, { type: 'binary', bookType: 'xlsx' }));

      console.log(`Excel file saved as ${outputFilePath}`);
    } catch (error) {
      console.error('Error saving Excel file:', error.message);
    }
  }
}

// Example usage
(async () => {
  try {
    const excelGenerator = new ExcelGenerator();
    
    // Add sample data to the sheet
    const sampleData = [
      [ 'ID', 'Name', 'Age' ],
      [ 1, 'John Doe', 30 ],
      [ 2, 'Jane Doe', 25 ]
    ];

    excelGenerator.addSheet(sampleData);

    // Save the Excel file
    await excelGenerator.saveAsExcel('sample_excel.xlsx');
  } catch (error) {
    console.error('Error generating Excel file:', error.message);
  }
})();