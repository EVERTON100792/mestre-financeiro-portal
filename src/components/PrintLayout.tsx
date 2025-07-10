
import React from 'react';

interface PrintLayoutProps {
  title: string;
  children: React.ReactNode;
  date?: string;
}

const PrintLayout = ({ title, children, date = new Date().toLocaleDateString('pt-BR') }: PrintLayoutProps) => {
  return (
    <div className="print-only">
      <div className="print-header">
        <div className="print-logo">
          <h1>FinanceCalc</h1>
          <p>Calculadoras Financeiras</p>
        </div>
        <div className="print-date">
          <p>Data: {date}</p>
        </div>
      </div>
      
      <div className="print-title">
        <h2>{title}</h2>
      </div>
      
      <div className="print-content">
        {children}
      </div>
      
      <div className="print-footer">
        <p>Este relatório foi gerado automaticamente pela FinanceCalc</p>
        <p>www.financecalc.com.br</p>
      </div>
    </div>
  );
};

export default PrintLayout;
