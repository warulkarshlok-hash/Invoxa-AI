import React, { useState, useEffect } from 'react';
import { Loader2, Mail, Copy, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import TextareaField from '../ui/TextareaField';
import axiosInstance from '../../utils/AxiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import toast from 'react-hot-toast';

const ReminderModal = ({ isOpen, onClose, invoiceId }) => {

    const [reminderText, setReminderText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);

    useEffect(() => {
        if (isOpen && invoiceId) {
            const generateReminder = async () => {
                setIsLoading(true);
                setReminderText('');

                try {
                    const response = await axiosInstance.post(
                        API_PATHS.AI.GENERATE_REMINDER,
                        { invoiceId }
                    );

                    setReminderText(response.data.reminderText);
                } catch (error) {
                    toast.error('Failed to generate reminder.');
                    console.error('AI reminder error:', error);
                    onClose();
                } finally {
                    setIsLoading(false);
                }
            };

            generateReminder();
        }
    }, [isOpen, invoiceId, onClose]);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(reminderText);
        setHasCopied(true);
        toast.success('Reminder copied to clipboard!');
        setTimeout(() => setHasCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-7">

                    <div className="flex items-center justify-between mb-6">
                        <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
                            <Mail className="w-6 h-6 text-blue-600" />
                            AI-Generated Reminder
                        </h3>

                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 text-xl transition-colors"
                        >
                            &times;
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <div className="mb-6">
                            <TextareaField
                                name="reminderText"
                                value={reminderText}
                                readOnly
                                rows={10}
                            />
                        </div>
                    )}

                    <div className="flex justify-end items-center gap-3">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                        >
                            Close
                        </Button>

                        <Button
                            onClick={handleCopyToClipboard}
                            icon={hasCopied ? Check : Copy}
                            disabled={isLoading}
                        >
                            {hasCopied ? 'Copied!' : 'Copy Text'}
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReminderModal;