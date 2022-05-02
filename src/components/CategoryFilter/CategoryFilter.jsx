import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./CategoryFilter.css";

// const categoryFilters = [
//     { label: 'Fashion', value: 'Fashion'},
//     { label: 'Beauty', value: 'Beauty'},
//     { label: 'Health', value: 'Health'},
//     { label: 'Active', value: 'Active'},
// ];

function CategoryFilter() {

    const [categoryData, setCategoryData] = useState([]);
    
    // Actions & Helpers
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}category/`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setCategoryData(data);
        });
    }, []);

    return (
        <div className="category-filter">
            <label class="filter-label">Project Category</label>
            <Select
                options={categoryData.id}
                isMulti
                onChange={opt => console.log(opt)}
                placeholder="Select a category"
            />
        </div>
    );
}



export default CategoryFilter;