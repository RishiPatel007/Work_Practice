## **Project: File-Based CRUD API with Event Logging**

### **Project Description**

This project aims to create a basic **CRUD (Create, Read, Update, Delete)** API using Node.js. The API will interact with a JSON file to store and manage data. Additionally, the application will use **Event Emitters** to log actions (like creating, updating, or deleting data) and an **HTTP server** to handle API requests.

---

### **Features**

1. **HTTP Server**: Create an HTTP server to handle incoming requests.
2. **API Routing**: Implement routing for different HTTP methods (GET, POST, PUT, DELETE).
3. **File System (fs)**: Use the `fs` module to read from and write to a JSON file (`data.json`) for data persistence.
4. **Event Emitter**: Emit events for every action (e.g., creating, updating, or deleting data) and log them to the console.
5. **CRUD Operations**:
    - **Create**: Add a new item to the JSON file.
    - **Read**: Fetch all items or a specific item by ID.
    - **Update**: Modify an existing item by ID.
    - **Delete**: Remove an item by ID.