import React from 'react';

export default function InvoicePreview({ invoiceData }) {
    const formatCurrency = (amount) => {
        const currency = invoiceData.currency || 'USD';
        const localeMap = {
            'USD': 'en-US',
            'INR': 'en-IN',
            'AED': 'en-AE',
        };
        const locale = localeMap[currency] || 'en-US';

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const calculateSubtotal = () => {
        return invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    };

    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.1; // Example 10% tax, can be made dynamic later
    const total = subtotal + tax;

    return (
        <div className="invoice-preview-container bg-gray-500 p-8 rounded-xl overflow-auto flex justify-center no-print-bg">
            <div className="invoice-page bg-white shadow-lg p-10 w-full max-w-[210mm] min-h-[297mm] flex flex-col relative text-sm">

                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">INVOICE</h1>
                        <p className="text-gray-500">#{Math.floor(Math.random() * 10000)}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-slate-700">{invoiceData.companyName || 'Company Name'}</h2>
                        <p className="text-gray-500 whitespace-pre-line">{invoiceData.companyAddress || 'Address'}</p>
                        <p className="text-gray-500">{invoiceData.companyEmail || 'email@example.com'}</p>
                    </div>
                </div>

                {/* Client & Date Info */}
                <div className="flex justify-between mb-12">
                    <div>
                        <h3 className="text-gray-500 font-medium mb-1">Bill To:</h3>
                        <h4 className="text-lg font-bold text-slate-800">{invoiceData.clientName || 'Client Name'}</h4>
                        <div className="text-gray-500 whitespace-pre-line">{invoiceData.clientAddress || 'Client Address'}</div>
                    </div>
                    <div className="text-right">
                        <div className="mb-2">
                            <span className="text-gray-500 font-medium">Date: </span>
                            <span className="font-semibold text-slate-700">{invoiceData.date}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 font-medium">Due Date: </span>
                            <span className="font-semibold text-slate-700">{invoiceData.dueDate}</span>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-8 flex-grow">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-200">
                                <th className="py-3 font-semibold text-slate-600">Description</th>
                                <th className="py-3 font-semibold text-slate-600 text-center">Qty</th>
                                <th className="py-3 font-semibold text-slate-600 text-right">Price</th>
                                <th className="py-3 font-semibold text-slate-600 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.items.map((item, index) => (
                                <tr key={index} className="border-b border-slate-100">
                                    <td className="py-3 text-slate-700">{item.description || 'Item description'}</td>
                                    <td className="py-3 text-slate-700 text-center">{item.quantity}</td>
                                    <td className="py-3 text-slate-700 text-right">{formatCurrency(item.price)}</td>
                                    <td className="py-3 text-slate-700 text-right font-medium">
                                        {formatCurrency(item.quantity * item.price)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {invoiceData.items.length === 0 && (
                        <div className="text-center py-8 text-gray-400 italic">No items added</div>
                    )}
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-12">
                    <div className="w-1/2 max-w-xs">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-semibold text-slate-700">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-gray-500">Tax (10%)</span>
                            <span className="font-semibold text-slate-700">{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b-2 border-slate-800">
                            <span className="font-bold text-slate-800 text-lg">Total</span>
                            <span className="font-bold text-primary text-xl">{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8 border-t border-slate-100 text-center text-gray-400 text-sm">
                    {invoiceData.notes || 'Thank you for your business!'}
                </div>

            </div>
        </div>
    );
}
