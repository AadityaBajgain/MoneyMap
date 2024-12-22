import React from "react";

const Delete = ({ onCancel, expenseId,onDelete }) => {
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/expense/${expenseId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        onDelete(); 
      } else {
        console.error('Failed to delete expense');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div>
      <p>Are you sure you want to delete?</p>
      <div className="flex justify-around">
        <button className="bg-green-400" onClick={onCancel}>Cancel</button>
        <button className="bg-red-400" onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default Delete;
