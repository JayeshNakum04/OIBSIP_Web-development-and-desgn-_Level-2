 // Global variables
        let currentUser = null;
        let users = {};
        let todos = [];
        let todoIdCounter = 1;

        // Page Navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Remove active class from all nav buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Add active class to clicked nav button
            event.target.classList.add('active');
        }

        // Calculator Functions
        function appendToDisplay(value) {
            const display = document.getElementById('calcDisplay');
            if (display.value === '0' && value !== '.') {
                display.value = value;
            } else {
                display.value += value;
            }
        }

        function clearDisplay() {
            document.getElementById('calcDisplay').value = '';
        }

        function deleteLast() {
            const display = document.getElementById('calcDisplay');
            display.value = display.value.slice(0, -1);
        }

        function calculate() {
            const display = document.getElementById('calcDisplay');
            try {
                // Replace × with * for calculation
                const expression = display.value.replace(/×/g, '*');
                const result = eval(expression);
                display.value = result;
            } catch (error) {
                display.value = 'Error';
                setTimeout(() => clearDisplay(), 1500);
            }
        }

        // Todo App Functions
        function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();
            
            if (text === '') {
                alert('Please enter a task!');
                return;
            }
            
            const todo = {
                id: todoIdCounter++,
                text: text,
                completed: false,
                createdAt: new Date().toLocaleString()
            };
            
            todos.push(todo);
            input.value = '';
            renderTodos();
        }

        function toggleTodo(id) {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                if (todo.completed) {
                    todo.completedAt = new Date().toLocaleString();
                }
                renderTodos();
            }
        }

        function deleteTodo(id) {
            todos = todos.filter(t => t.id !== id);
            renderTodos();
        }

        function editTodo(id) {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                const newText = prompt('Edit task:', todo.text);
                if (newText && newText.trim() !== '') {
                    todo.text = newText.trim();
                    renderTodos();
                }
            }
        }

        function renderTodos() {
            const pendingContainer = document.getElementById('pendingTasks');
            const completedContainer = document.getElementById('completedTasks');
            
            const pendingTodos = todos.filter(t => !t.completed);
            const completedTodos = todos.filter(t => t.completed);
            
            // Update counts
            document.getElementById('pendingCount').textContent = pendingTodos.length;
            document.getElementById('completedCount').textContent = completedTodos.length;
            
            // Render pending todos
            pendingContainer.innerHTML = pendingTodos.map(todo => `
                <div class="todo-item">
                    <div>
                        <div><strong>${todo.text}</strong></div>
                        <small>Created: ${todo.createdAt}</small>
                    </div>
                    <div class="todo-actions">
                        <button class="todo-btn complete-btn" onclick="toggleTodo(${todo.id})">✓</button>
                        <button class="todo-btn edit-btn" onclick="editTodo(${todo.id})">✏️</button>
                        <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">🗑️</button>
                    </div>
                </div>
            `).join('');
            
            // Render completed todos
            completedContainer.innerHTML = completedTodos.map(todo => `
                <div class="todo-item completed">
                    <div>
                        <div><strong>${todo.text}</strong></div>
                        <small>Completed: ${todo.completedAt}</small>
                    </div>
                    <div class="todo-actions">
                        <button class="todo-btn complete-btn" onclick="toggleTodo(${todo.id})">↶</button>
                        <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">🗑️</button>
                    </div>
                </div>
            `).join('');
        }

        function handleEnterKey(event) {
            if (event.key === 'Enter') {
                addTodo();
            }
        }

        // Authentication Functions
        // Show/hide password toggles
    document.addEventListener('DOMContentLoaded', function () {
        const loginPassword = document.getElementById('loginPassword');
        const toggleLogin = document.getElementById('toggleLoginPassword');
        toggleLogin.addEventListener('change', function () {
            loginPassword.type = this.checked ? 'text' : 'password';
        });

            const registerPassword = document.getElementById('registerPassword');
            const toggleRegister = document.getElementById('toggleRegisterPassword');
            toggleRegister.addEventListener('change', function () {
                registerPassword.type = this.checked ? 'text' : 'password';
            });
        });

        
        function toggleAuthForm() {
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            
            if (loginForm.style.display === 'none') {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            }
        }

        function register() {
            const username = document.getElementById('registerUsername').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            
            if (!username || !email || !password) {
                alert('Please fill in all fields!');
                return;
            }
            
            if (users[username]) {
                alert('Username already exists!');
                return;
            }
            
            users[username] = {
                email: email,
                password: password,
                registeredAt: new Date().toLocaleString()
            };
            
            alert('Registration successful! You can now login.');
            toggleAuthForm();
            
            // Clear form
            document.getElementById('registerUsername').value = '';
            document.getElementById('registerEmail').value = '';
            document.getElementById('registerPassword').value = '';
        }

        function login() {
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            if (!username || !password) {
                alert('Please enter username and password!');
                return;
            }
            
            if (!users[username] || users[username].password !== password) {
                alert('Invalid username or password!');
                return;
            }
            
            currentUser = username;
            document.getElementById('currentUser').textContent = username;
            document.getElementById('loginTime').textContent = new Date().toLocaleString();
            
            // Hide forms and show dashboard
            document.getElementById('authForms').style.display = 'none';
            document.getElementById('userDashboard').style.display = 'block';
            
            // Clear form
            document.getElementById('loginUsername').value = '';
            document.getElementById('loginPassword').value = '';
        }

        function logout() {
            currentUser = null;
            document.getElementById('authForms').style.display = 'block';
            document.getElementById('userDashboard').style.display = 'none';
            
            // Reset to login form
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('registerForm').style.display = 'none';
        }

        // Initialize the application
        window.onload = function() {
            // Add some sample users for demo
            users = {
                'demo': { password: 'demo123', email: 'demo@example.com' },
                'admin': { password: 'admin123', email: 'admin@example.com' }
            };
            
            // Add some sample todos
            todos = [
                { id: 1, text: 'Complete internship tasks', completed: false, createdAt: new Date().toLocaleString() },
                { id: 2, text: 'Study JavaScript', completed: true, createdAt: new Date().toLocaleString(), completedAt: new Date().toLocaleString() }
            ];
            todoIdCounter = 3;
            
            renderTodos();
        };