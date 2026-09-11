import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/AxiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import { Loader2, Edit, Printer, AlertCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import CreateInvoice from './CreateInvoice';
import Button from '../../components/ui/Button';
import ReminderModal from '../../Components/invoices/ReminderModal';

const InvoiceDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const invoiceRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.INVOICE.GET_INVOICE_BY_ID(id)
        );

        setInvoice(response.data);
      } catch (error) {
        toast.error('Failed to fetch invoice.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.INVOICE.UPDATE_INVOICE(id),
        formData
      );

      toast.success('Invoice updated successfully!');
      setIsEditing(false);
      setInvoice(response.data);
    } catch (error) {
      toast.error('Failed to update invoice.');
      console.error(error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-lg">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        <h3 className="text-lg font-medium text-slate-900 mb-2">
          Invoice Not Found
        </h3>

        <p className="text-slate-500 mb-6 max-w-md">
          The invoice you are looking for does not exist or could not be found.
        </p>

        <Button onClick={() => navigate('/invoices')}>
          Back to All Invoices
        </Button>
      </div>
    );
  }
  if (isEditing) {
    return (
      <CreateInvoice
        existingInvoice={invoice}
        onSave={handleUpdate}
      />
    );
  }

  return (
    <>
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        invoiceId={id}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 print:hidden ">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4 sm:mb-0">
          Invoice <span className="font-mono text-slate-500">{invoice.invoiceNumber}</span>
        </h1>

        <div className="flex items-center gap-2">
          {invoice.status !== 'Paid' && (
            <Button
              variant="secondary"
              onClick={() => setIsReminderModalOpen(true)}
              icon={Mail}
            >
              Generate Reminder
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={() => setIsEditing(true)}
            icon={Edit}
          >
            Edit
          </Button>

          <Button
            variant="primary"
            onClick={handlePrint}
            icon={Printer}
          >
            Print or Download
          </Button>
        </div>
      </div>

      <div id="invoice-content-wrapper">
        <div
          ref={invoiceRef}
          id="invoice-preview"
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 sm:p-12 "
        >
          <div className="flex justify-between items-start pb-8 border-b border-slate-200">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
                INVOICE
              </h2>

              <p className="text-base text-slate-500 mt-2">
                # {invoice.invoiceNumber}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500 mb-2">
                Status
              </p>

              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoice.status === 'Paid'
                  ? 'bg-emerald-100 text-emerald-800'
                  : invoice.status === 'Pending'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                  }`}
              >
                {invoice.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                Bill From
              </h3>

              <p className="text-base font-semibold text-slate-900">
                {invoice.billFrom.businessName}
              </p>

              <p className="text-base text-slate-600 mt-1">
                {invoice.billFrom.address}
              </p>

              <p className="text-base text-slate-600 mt-1">
                {invoice.billFrom.email}
              </p>

              <p className="text-base text-slate-600 mt-1">
                {invoice.billFrom.phone}
              </p>
            </div>

            <div className="sm:text-right">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                Bill To
              </h3>

              <p className="text-base font-semibold text-slate-900">
                {invoice.billTo.clientName}
              </p>

              <p className="text-base text-slate-600 mt-1">
                {invoice.billTo.address}
              </p>

              <p className="text-base text-slate-600 mt-1">
                {invoice.billTo.email}
              </p>

              <p className="text-base text-slate-600 mt-1">
                {invoice.billTo.phone}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Invoice Date
                </h3>
                <p className="text-base font-medium text-slate-900">
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Due Date
                </h3>
                <p className="text-base font-medium text-slate-900">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Payment Terms
                </h3>
                <p className="text-base font-medium text-slate-900">
                  {invoice.paymentTerms}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-sm font-medium text-slate-500 uppercase tracking-wide">
                      Item
                    </th>

                    <th className="px-8 py-4 text-right text-sm font-medium text-slate-500 uppercase tracking-wide">
                      Qty
                    </th>

                    <th className="px-8 py-4 text-right text-sm font-medium text-slate-500 uppercase tracking-wide">
                      Price
                    </th>

                    <th className="px-8 py-4 text-right text-sm font-medium text-slate-500 uppercase tracking-wide">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-8 py-5 text-base text-slate-900">
                        {item.name}
                      </td>

                      <td className="px-8 py-5 text-right text-base text-slate-700">
                        {item.quantity}
                      </td>

                      <td className="px-8 py-5 text-right text-base text-slate-700">
                        ${item.unitPrice.toFixed(2)}
                      </td>

                      <td className="px-8 py-5 text-right text-base font-medium text-slate-900">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <div className="w-full max-w-sm space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax</span>
                <span>${invoice.taxTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg text-slate-900 border-t border-slate-200 pt-3 mt-3">
                <span>Total</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Notes
              </h3>

              <p className="text-sm text-slate-600">
                {invoice.notes}
              </p>
            </div>
          )}
        </div>

      </div>

      <style>
        {`
    @page {
      padding: 10px;
    }

    @media print {
      body * {
        visibility: hidden;
      }

      #invoice-content-wrapper,
      #invoice-content-wrapper * {
        visibility: visible;
      }

      #invoice-content-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        width: 100%;
      }

      #invoice-preview {
        box-shadow: none;
        border: none;
        border-radius: 0;
        padding: 0;
      }
    }
  `}
      </style>

    </>
  );
};

export default InvoiceDetail;