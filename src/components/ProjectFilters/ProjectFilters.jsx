import React from "react";
import "./ProjectFilters.css";

function ProjectFilters({categoryData}) {

    const options = [
        '', 'Fashion', 'Beauty', 'Health', 'Active', 'Creative'
      ];
    
    const [selectedValue , setSelectedValue ] = useState(options[0]);
    
    const handleFilterInput = (event) => {
        let value = event.target.options;
        setSelectedValue(value);
        props.handleCategorySearch(value);  
    };
    
    return(
        <div>
            <Select options={options} onChange={handleFilterInput} value={selectedValue} placeholder="Select a category"/>
        </div>
    );
}



export default ProjectFilters;