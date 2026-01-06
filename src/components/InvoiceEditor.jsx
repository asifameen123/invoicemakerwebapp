import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Input from './Input';

export default function InvoiceEditor({
    invoiceData,
    setInvoiceData,
    handleItemChange,
    addItem,
    removeItem
}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="card invoice-editor">
            <h2 className="text-2xl mb-6 font-bold text-primary">Edit Invoice</h2>

            <div className="section mb-8">
                <h3 className="text-lg mb-4 font-semibold text-muted">Invoice Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Currency</label>
                        <select
                            name="currency"
                            value={invoiceData.currency}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="USD">Dollar (USD)</option>
                            <option value="INR">Rupee (INR)</option>
                            <option value="AED">Dirham (AED)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="section mb-8">
                <h3 className="text-lg mb-4 font-semibold text-muted">Company Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Company Name" name="companyName" value={invoiceData.companyName} onChange={handleChange} placeholder="Your Company" />
                    <Input label="Your Name" name="yourName" value={invoiceData.yourName} onChange={handleChange} placeholder="John Doe" />
                    <Input label="Address" name="companyAddress" value={invoiceData.companyAddress} onChange={handleChange} placeholder="123 Street" />
                    <Input label="Email" name="companyEmail" value={invoiceData.companyEmail} onChange={handleChange} placeholder="you@example.com" />
                </div>
            </div>

            <div className="section mb-8">
                <h3 className="text-lg mb-4 font-semibold text-muted">Client Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Client Name" name="clientName" value={invoiceData.clientName} onChange={handleChange} placeholder="Client Company" />
                    <Input label="Client Address" name="clientAddress" value={invoiceData.clientAddress} onChange={handleChange} placeholder="456 Avenue" />
                    <Input label="Invoice Date" name="date" type="date" value={invoiceData.date} onChange={handleChange} />
                    <Input label="Due Date" name="dueDate" type="date" value={invoiceData.dueDate} onChange={handleChange} />
                </div>
            </div>

            <div className="section mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-muted">Items</h3>
                    <button onClick={addItem} className="btn btn-outline text-sm">
                        <Plus size={16} /> Add Item
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {invoiceData.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-end">
                            <div className="col-span-6">
                                <Input
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    type="number"
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="col-span-3">
                                <Input
                                    type="number"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <button
                                    onClick={() => removeItem(index)}
                                    className="btn btn-danger p-2 rounded-md"
                                    title="Remove Item"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h3 className="text-lg mb-4 font-semibold text-muted">Additional Notes</h3>
                <textarea
                    rows="3"
                    name="notes"
                    placeholder="Thank you for your business!"
                    value={invoiceData.notes}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
        </div>
    );
}
