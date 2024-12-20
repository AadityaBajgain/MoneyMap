import React from "react";

const Delete = ({ onCancel,expenseId }) => {
  const handleDeleteClick = async ()=>{
    try{
    await fetch(`http://localhost:3001/api/expense/${expenseId}`,{
        method:'DELETE'
    })
    }catch(error){
      console.log(error.message)
      resizeBy.status(500).json({error:error.message})
    }
}
  return (
    <div>
      <p>Are you sure you want to delete?</p>
      <div className="flex justify-around">
        <button onClick={onCancel}>Cancel</button>
        <button onClick = {handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default Delete;
