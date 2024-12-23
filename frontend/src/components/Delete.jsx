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
function deleteForSure() {
  let sure = prompt("Are you sure you want to delete this expense? Type 'yes' to confirm");
  if (sure === 'yes') {
    handleDeleteClick();
  }
  else if (sure === null) {
    onCancel();
  }
}
