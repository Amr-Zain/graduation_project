import React from 'react';
import Input from './input';

const RadioGroup = ({ title, name, options, selectedValue, onChange }) => (
    <div className={name}>
        <fieldset>
            <legend>{title}</legend>
            {options.map((option) => (
                <Input
                    key={option.id}
                    type="radio"
                    id={option.id}
                    name={name}
                    value={option.value}
                    checked={selectedValue === option.value}
                    handleChange={onChange}
                    label={option.label}
                />
            ))}
        </fieldset>
    </div>
);

export default RadioGroup;