const handleDeleteClick = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/expense/${expenseId}`, {
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
