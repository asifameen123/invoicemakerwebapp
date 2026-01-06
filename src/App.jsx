import React, { useState } from 'react';
import { Printer, Download } from 'lucide-react';
import InvoiceEditor from './components/InvoiceEditor';
import InvoicePreview from './components/InvoicePreview';
import './App.css';

function App() {
  const [invoiceData, setInvoiceData] = useState({
    companyName: 'Tech Solutions Inc.',
    yourName: 'Alex Smith',
    companyAddress: '123 Innovation Dr\nSilicon Valley, CA 94025',
    companyEmail: 'billing@techsolutions.com',
    clientName: 'Global Corp',
    clientAddress: '456 Enterprise Way\nNew York, NY 10001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [
      { description: 'Web Development Services', quantity: 40, price: 150 },
      { description: 'Server Setup', quantity: 1, price: 500 },
    ],
    currency: 'USD',
    notes: 'Please pay within 30 days via bank transfer.'
  });

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <header className="header no-print">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            Invoice Maker Pro
          </h1>
          <p className="text-muted text-sm">Create beautiful invoices in seconds</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={18} /> Print / Save PDF
          </button>
        </div>
      </header>

      <div className="invoice-layout">
        <div className="no-print">
          <InvoiceEditor
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            handleItemChange={handleItemChange}
            addItem={addItem}
            removeItem={removeItem}
          />
        </div>

        <div className="preview-wrapper">
          <InvoicePreview invoiceData={invoiceData} />
        </div>
      </div>
    </div>
  );
}

export default App;
