import React from 'react';

function Category({ category, handleCatChange }) {
  return (
    <div>
      <select
        onChange={(e) => handleCatChange(e.target.value)}
        className="form-select"
        defaultValue="all" 
      >
        <option value="all">All Categories</option>
        {category.map((el, i) => (
          <option key={i} value={el.id}>
            {el.CategoryName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Category;
