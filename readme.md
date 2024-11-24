# Node-based Workflow Pipeline Application

This project is a web-based application for creating node-based workflows using a drag-and-drop interface. The application allows users to visually design workflows by connecting different types of nodes. Each node represents a specific functionality, and workflows are analyzed to provide insights like the number of nodes, edges, and whether the workflow forms a Directed Acyclic Graph (DAG).

---

## Features
- **Drag-and-Drop Interface**: Create workflows easily with a modern UI.
- **Custom Nodes**: Includes 9 predefined node types, each with unique functionality.
- **Node Connections**: Connect nodes to define data or workflow dependencies.
- **Pipeline Analysis**: Submit pipelines for backend analysis and receive structured results.
- **Dynamic UI**: Leverage modular components to extend or modify nodes and their functionality.

---

## Project Structure
```
.
├── frontend/
│   ├── src/
│   |   ├── nodes, App.js, index.css, store.js, submit.js, ui.js ...
|   |
│   └── public/
├── backend/
│   ├── main.py
│   └── requirements.txt
└── README.md
```

---

## Running the Application

### Frontend
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```
4. Access the app at `http://localhost:3000`.

### Backend
1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Install required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Start the FastAPI server:
    ```bash
    uvicorn app:main --reload
    ```
4. Access the backend API at `http://127.0.0.1:8000`.

---

## Frontend Overview

### Workflow UI
The frontend provides a **drag-and-drop UI** for creating workflows:
- **Node Creation**: Nodes are draggable elements defined in `toolbar.js`.
- **Node Types**: The `ui.js` file defines custom nodes and their types, such as:
  - `customInput`: Represents input data nodes.
  - `llm`: Represents a Large Language Model node for text generation.
  - `customOutput`: Represents output or result nodes.
  - `text`, `ide`, `translator`, etc.: Represent various utilities.
  
- **Node Interaction**:
  - Users can drag nodes from the toolbar to the canvas.
  - Nodes can be connected using edges to define data flow.

### UI Implementation (`ui.js`)
- **ReactFlow Library**: The drag-and-drop feature uses ReactFlow.
- **Node Types**: Each node is a React component, and their logic is imported from respective files like `inputNode.js` and `outputNode.js`.
- **Store Integration**: Nodes and edges are managed via a global state using Zustand.

---

## Node Details
1. **Input Node**: Accepts initial data inputs.
2. **LLM Node**: Calls a language model API for generating or processing text.
3. **Output Node**: Displays the final output of the workflow.
4. **Text Node**: Handles text manipulation or annotation tasks.
5. **IDE Node**: Represents code-editing functionalities.
6. **Translator Node**: Translates text between languages.
7. **API Fetch Node**: Fetches data from external APIs.
8. **Calculator Node**: Performs basic arithmetic or mathematical computations.
9. **Data Visualizer Node**: Visualizes input data in graphs or charts.

---

## Backend Overview

The backend is a FastAPI-based service that:
- **Analyzes Workflows**:
  - Accepts a JSON object containing nodes and edges.
  - Analyzes whether the pipeline forms a Directed Acyclic Graph (DAG).
  - Counts nodes and edges.
- **API Endpoint**:
  - **POST** `/pipeline/analyze`: Accepts a pipeline configuration and returns an analysis.
  
### Example API Request
```json
{
  "nodes": [
    {"id": "1", "type": "customInput", "data": {"text": "Input data"}},
    {"id": "2", "type": "llm", "data": {"text": "Processed text"}}
  ],
  "edges": [
    {"source": "1", "target": "2"}
  ]
}
```

### Response
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

---

## Components Overview

### `toolbar.js`
- **Purpose**: Displays draggable node buttons in the toolbar.
- **Functionality**:
  - Uses `DraggableNode` components to represent different node types.
  - Nodes include types like `customInput`, `llm`, `customOutput`, etc.

### `NodeContainer.js`
- **Purpose**: Renders the individual node UI.
- **Features**:
  - Contains expandable/collapsible headers.
  - Custom input fields for node data (e.g., name, type).
  - Includes connection handles for data flow.

### `SubmitButton.js`
- **Purpose**: Submits the pipeline configuration to the backend for analysis.
- **Features**:
  - Displays the result in a custom alert dialog.
  - Handles loading state during submission.

---

## Future Enhancements
- Add custom node types and logic.
- Implement user authentication for saving and loading pipelines.
- Provide real-time collaboration features.

---

## Contribution
1. Fork the repository and create a feature branch.
2. Submit a pull request with clear descriptions of your changes.
3. Ensure code quality with proper testing and documentation.

---

## License
This project is licensed under the MIT License. See `LICENSE` for more details.
