"use client";

import React from "react";

interface RadioOptionProps {
    name: string;
    value: string;
    label: string;
    color?: "blue" | "purple" | "yellow" | "red" | "green";
    checked: boolean;
    onChange: (value: string) => void;
    required?: boolean;
}

const RadioOption: React.FC<RadioOptionProps> = ({
    name,
    value,
    label,
    color = "green",
    checked,
    onChange,
    required = false,
}) => {
    const getBorderClass = (isChecked: boolean) => {
        if (!isChecked) return "border-gray-300 group-hover:border-gray-400";

        switch (color) {
            case "blue": return "border-blue-500";
            case "purple": return "border-purple-500";
            case "yellow": return "border-yellow-500";
            case "red": return "border-red-500";
            case "green": return "border-green-500";
            default: return "border-green-500";
        }
    };

    const getBgClass = (isChecked: boolean) => {
        if (!isChecked) return "bg-transparent group-hover:bg-gray-200";

        switch (color) {
            case "blue": return "bg-blue-500";
            case "purple": return "bg-purple-500";
            case "yellow": return "bg-yellow-500";
            case "red": return "bg-red-500";
            case "green": return "bg-green-500";
            default: return "bg-green-500";
        }
    };

    return (
        <label className="flex items-center cursor-pointer group text-gray-800">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                required={required}
                className="hidden"
            />
            <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 transition-all duration-200 ${getBorderClass(checked)}`}
            >
                <span
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${getBgClass(checked)}`}
                ></span>
            </span>
            <span className="text-sm font-medium">{label}</span>
        </label>
    );
};

export default RadioOption;