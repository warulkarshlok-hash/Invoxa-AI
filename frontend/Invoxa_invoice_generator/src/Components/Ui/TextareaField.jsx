import React from 'react';

const TextareaField = ({ icon: Icon, label, name, ...props }) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-700 mb-2"
            >
                {label}
            </label>

            <div className="relative">

                {Icon && (
                    <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="w-5 h-5 text-slate-400" />
                    </div>
                )}

                <textarea
                    id={name}
                    name={name}
                    rows={3}
                    {...props}
                    className="w-full min-h-[100px] pl-12 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>

            </div>
        </div>
    );
};

export default TextareaField;