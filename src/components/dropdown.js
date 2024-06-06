import React, { useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <div>
            <label htmlFor="dropdown">Choose an option:</label>
            <select id="dropdown" value={selectedOption} onChange={handleChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
