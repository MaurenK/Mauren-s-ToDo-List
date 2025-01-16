// This is for adding a task
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new list item
    const li = document.createElement('li');
    li.textContent = todoText;

    // Create a "Complete" button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.onclick = () => toggleCompleteTask(li, completeBtn);

    // Create a "Delete" button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => removeTodoItem(li);

    // Append the buttons to the list item
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // Append the list item to the ul
    document.getElementById('todoList').appendChild(li);

    // Clear the input field
    todoInput.value = '';
}

// This is for removing a task
function removeTodoItem(li) {
    li.remove();
}

// This is for toggling a task's completed state
function toggleCompleteTask(li, completeBtn) {
    // Check if the task is already completed
    if (li.classList.contains('completed')) {
        // Undo completion (unclick the task)
        li.classList.remove('completed');
        li.style.opacity = '1'; // Restore full opacity
        li.style.textDecoration = 'none'; // Remove strike-through
        li.style.color = ''; // Restore text color
        completeBtn.textContent = 'Complete'; // Change button text back to 'Complete'
    } else {
        // Mark as completed
        li.classList.add('completed');
        li.style.opacity = '0.5'; // Make the task appear faded
        li.style.textDecoration = 'line-through'; // Add strike-through effect
        li.style.color = '#888'; // Change text color to gray
        completeBtn.textContent = 'Undo'; // Change button text to 'Undo'
    }
}
