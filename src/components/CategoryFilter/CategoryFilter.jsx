import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./CategoryFilter.css";

// const categoryFilters = [
//     { label: 'Fashion', value: 'Fashion'},
//     { label: 'Beauty', value: 'Beauty'},
//     { label: 'Health', value: 'Health'},
//     { label: 'Active', value: 'Active'},
// ];

function CategoryFilter(props) {
    const {setFilterCategories} = props;

    const [categoryData, setCategoryData] = useState([]);
    
    // Actions & Helpers
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}category/`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {

            const selectOptions = data.results.map((category) => {
                return{
                    value: category.slug,
                    label: category.category_name
                }
            })
            console.log("data", data.results, selectOptions)

            setCategoryData(selectOptions);
        });
    }, []);


    return (
        <div className="category-filter">
            <label className="filter-label">Project Category</label>
            <Select
                options={categoryData}
                // isMulti
                onChange={option => setFilterCategories(option.value)}
                placeholder="Select a category"
            />
        </div>
    );
}



export default CategoryFilter;



