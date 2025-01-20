// Load saved tasks when the page loads
window.onload = function() {
    loadTasks();
};

// Add a new task
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

    // Store the new task in localStorage
    storeTasks();

    // Clear the input field
    todoInput.value = '';
}

// Remove a task
function removeTodoItem(li) {
    li.remove();
    storeTasks();  // Update the storage after deleting a task
}

// Toggle a task's completed state using the checkbox
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

    storeTasks(); // Update the storage after toggling the completion
}

// Store tasks in localStorage
function storeTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#todoList li');

    taskItems.forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const isCompleted = item.querySelector('input').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });

    // Save tasks in localStorage as a JSON string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            const li = document.createElement('li');

            // Create task text
            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            // Create checkbox and set it to checked if completed
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.onclick = () => toggleCompleteTask(li, checkbox);

            // Create a "Delete" button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => removeTodoItem(li);

            // Append elements to the list item
            li.appendChild(taskText);
            li.appendChild(checkbox);
            li.appendChild(deleteBtn);

            // Mark task as completed if needed
            if (task.completed) {
                li.classList.add('completed');
                taskText.style.textDecoration = 'line-through';
                taskText.style.color = '#888';
            }

            // Add the list item to the ul
            document.getElementById('todoList').appendChild(li);
        });
    }
}

// Add event listener to "Add" button
document.getElementById('addBtn').addEventListener('click', addTodo);
