import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';
import TextareaField from '../ui/TextareaField';
import axiosInstance from '../../utils/AxiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateWithAIModal = ({ isOpen, onClose }) => {

  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please paste some text to generate an invoice.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AI.PARSE_INVOICE_TEXT,
        { text }
      );

      const invoiceData = response.data;

      toast.success('Invoice data extracted successfully!');
      onClose();

      // Navigate to create invoice page with the parsed data
      navigate('/invoices/new', {
        state: { aiData: invoiceData }
      });

    } catch (error) {
      toast.error('Failed to generate invoice from text.');
      console.error('AI parsing error:', error);

    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
              <Sparkles className="w-6 h-6 text-blue-600" />
              Create Invoice with AI
            </h3>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-xl transition-colors"
            >
              &times;
            </button>
          </div>

          <div className="space-y-5">
            <p className="text-sm leading-6 text-slate-600">
              Paste any text that contains invoice details (like client name, items,
              quantities, and prices) and the AI will attempt to create an invoice from it.
            </p>

            <TextareaField
              name="invoiceText"
              label="Paste Invoice Text Here"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., 'Invoice for ClientCorp: 2 hours of design work at $150/hr and 1 logo for $800"
              rows={8}
            />
          </div>

          <div className="flex justify-end items-center gap-3 mt-7">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              onClick={handleGenerate}
              isLoading={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Invoice'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateWithAIModal;
