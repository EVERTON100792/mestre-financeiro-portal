
import React from 'react';

interface PrintTableRow {
  label: string;
  value: string | number;
  highlight?: boolean;
  category?: string;
}

interface PrintTableProps {
  rows: PrintTableRow[];
}

const PrintTable = ({ rows }: PrintTableProps) => {
  const formatValue = (value: string | number) => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    }
    return value;
  };

  let currentCategory = '';

  return (
    <div className="print-table">
      {rows.map((row, index) => {
        const showCategory = row.category && row.category !== currentCategory;
        if (row.category) currentCategory = row.category;

        return (
          <div key={index}>
            {showCategory && (
              <div className="print-category">
                <h4>{row.category}</h4>
              </div>
            )}
            <div className={`print-row ${row.highlight ? 'highlight' : ''}`}>
              <span className="print-label">{row.label}:</span>
              <span className="print-value">{formatValue(row.value)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrintTable;
