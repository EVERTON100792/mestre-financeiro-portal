
import * as XLSX from 'xlsx';

export interface ExcelData {
  sheetName: string;
  data: Array<{ [key: string]: string | number }>;
}

export const exportToExcel = (filename: string, sheets: ExcelData[]) => {
  // Criar um novo workbook
  const workbook = XLSX.utils.book_new();

  sheets.forEach(sheet => {
    // Converter dados para planilha
    const worksheet = XLSX.utils.json_to_sheet(sheet.data);
    
    // Adicionar a planilha ao workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.sheetName);
  });

  // Fazer download do arquivo
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(value);
};
