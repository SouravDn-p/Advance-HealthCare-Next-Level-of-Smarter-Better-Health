"use client";

import React from "react";
import RadioOption from "./RadioOption";

interface Option {
    label: string;
    value: string;
}

interface RadioGroupProps {
    name: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    color?: "blue" | "purple" | "yellow" | "red" | "green";
    required?: boolean;
    label?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    name,
    options,
    value,
    onChange,
    color = "green",
    required = false,
    label,
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <p className="text-sm font-medium text-gray-700 pb-4">{label}</p>
            )}
            {options.map((option) => (
                <RadioOption
                    key={option.value}
                    name={name}
                    value={option.value}
                    label={option.label}
                    color={color}
                    checked={value === option.value}
                    onChange={onChange}
                    required={required}
                />
            ))}
        </div>
    );
};

export default RadioGroup;
