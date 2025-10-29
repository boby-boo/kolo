import React, { useEffect, useState } from 'react';
import { useUsersContext } from '../../features/users/context/UsersContext';
import { useDebounce } from 'react-use';

const FilterInput = () => {
    const { setFilterTerm, filterTerm, resetFilter } = useUsersContext();
    const [value, setValue] = useState(filterTerm);

    useDebounce(() => setFilterTerm(value), 300, [value]);

    useEffect(() => {
        if (filterTerm !== value) {
            setValue(filterTerm);
        }
    }, [filterTerm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleReset = () => {
        setValue('');
        resetFilter();
    };

    return (
        <div className="filter-input-wrapper">
            <input
                className="filter-input"
                type="text"
                placeholder="Search interests..."
                value={value}
                onChange={handleChange}
            />
            {filterTerm && (
                <button
                    className="filter-clear-btn"
                    onClick={handleReset}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default FilterInput;
