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

    // Create the task text element
    const taskText = document.createElement('span');
    taskText.textContent = todoText;

    // Create a checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = () => toggleCompleteTask(li, checkbox);

    // Create a "Delete" button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => removeTodoItem(li);

    // Append task text, checkbox, and delete button to the list item
    li.appendChild(taskText); // Add task text first
    li.appendChild(checkbox); // Add checkbox second
    li.appendChild(deleteBtn); // Add delete button last

    // Append the list item to the ul
    document.getElementById('todoList').appendChild(li);

    // Clear the input field
    todoInput.value = '';
}

// This is for removing a task
function removeTodoItem(li) {
    li.remove();
}

// This is for toggling a task's completed state using the checkbox
function toggleCompleteTask(li, checkbox) {
    const taskText = li.querySelector('span'); // Get task text

    if (checkbox.checked) {
        // Mark as completed
        li.classList.add('completed');
        taskText.style.textDecoration = 'line-through'; // Add strike-through effect
        taskText.style.color = '#888'; // Change text color to gray
    } else {
        // Undo completion (unclick the task)
        li.classList.remove('completed');
        taskText.style.textDecoration = 'none'; // Remove strike-through
        taskText.style.color = ''; // Restore text color
    }
}
