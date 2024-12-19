import React from "react";

const Delete = ({ onCancel }) => {
  return (
    <div>
      <p>Are you sure you want to delete?</p>
      <div className="flex justify-around">
        <button onClick={onCancel}>Cancel</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Delete;
