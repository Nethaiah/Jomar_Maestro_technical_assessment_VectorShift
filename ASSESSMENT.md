# VectorShift Frontend Technical Assessment

## Overview

This assessment is a small full-stack pipeline builder app.

- Frontend: JavaScript/React in `frontend/src`
- Backend: Python/FastAPI in `backend`
- Main UI concept: users drag nodes onto a React Flow canvas, connect them into a pipeline, then submit the pipeline to the backend for analysis.

## Hiring Thread Context

Albert Mao, a co-founder of VectorShift, sent this as Step 1 of their interview process.

VectorShift's stated product goal is to become an end-to-end horizontal solution for bringing generative AI to non-technical users. This assessment is meant to test whether you can turn a starter pipeline-builder interface into a polished, working product experience.

The interview process described in the thread:

1. Technical take-home assessment
2. Behavioral and technical screen
3. Behavioral interview with Albert, co-founder
4. Technical interview with Alex, co-founder

The assessment will be judged based on:

- successful completion of the required tasks
- code architecture
- design

The thread also asks for a screen recording that walks through the final product. The recording should focus on final functionality and design, with a brief discussion of the code.

Deadline from the thread: 11:59 PM IST on the upcoming Sunday. If the message was received on Monday, June 22, 2026, that would be Sunday, June 28, 2026. Confirm against the original email timestamp before submitting.

The final product should let a user:

1. Build a node pipeline visually.
2. Add and configure different node types.
3. Use a text node that grows with content and detects variables like `{{ input }}`.
4. Click submit.
5. See an alert showing:
   - number of nodes
   - number of edges
   - whether the graph is a directed acyclic graph (DAG)

## How To Run

### Frontend

From the repository root:

```bash
cd frontend
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

### Backend

From the repository root, in a separate terminal:

```bash
cd backend
uvicorn main:app --reload
```

The backend should run at:

```text
http://localhost:8000
```

You can test the root endpoint in the browser:

```text
http://localhost:8000/
```

Expected response:

```json
{"Ping":"Pong"}
```

## What You Need To Build

## Part 1: Node Abstraction

Current files:

- `frontend/src/nodes/inputNode.js`
- `frontend/src/nodes/outputNode.js`
- `frontend/src/nodes/llmNode.js`
- `frontend/src/nodes/textNode.js`

Right now, each node repeats a lot of similar structure:

- outer container
- title/header
- form fields
- React Flow handles
- dimensions and styling

You need to create a reusable node abstraction so new node types can be added without copying a full node file every time.

A good approach:

1. Create a shared base component such as `BaseNode`.
2. Let each node define:
   - title
   - fields
   - handles
   - custom content
   - default size
3. Refactor the existing four nodes to use that abstraction.
4. Add five new node types of your choosing.

Example new nodes:

- API node
- Filter node
- Transform node
- Database node
- Image generation node

The new nodes do not need to have real backend behavior. They mainly demonstrate that your abstraction makes new nodes easy to create.

## Part 2: Styling

The starter UI is mostly unstyled. You need to make the app look like a polished product.

You should style:

- toolbar
- draggable node buttons
- canvas area
- node cards
- node inputs/selects/textareas
- submit button
- layout spacing
- colors, borders, shadows, hover states

The design should feel unified. It can be inspired by VectorShift, but it does not have to copy VectorShift exactly.

## Part 3: Text Node Logic

The text node needs two upgrades.

### 1. Auto-resizing

As the user types more text, the text node should grow so the content remains visible.

This likely means replacing the single-line input with a textarea and adjusting the node width/height based on content length or textarea scroll height.

### 2. Variable Handles

Users should be able to type variables inside double curly braces:

```text
{{ input }}
{{ user_name }}
{{ documentText }}
```

When the text contains a valid JavaScript variable name inside `{{ }}`, the node should create a new target handle on the left side.

For example:

```text
Summarize this: {{ document }}
```

The text node should show a left-side handle for `document`.

Valid variable examples:

```text
{{ input }}
{{ userName }}
{{ user_name }}
{{ _privateValue }}
```

Invalid examples:

```text
{{ 123abc }}
{{ user-name }}
{{ input value }}
```

## Part 4: Backend Integration

You need to connect the frontend submit button to the FastAPI backend.

### Frontend

Update:

```text
frontend/src/submit.js
```

The submit button should:

1. Read the current `nodes` and `edges` from the Zustand store.
2. Send them to the backend endpoint:

```text
POST http://localhost:8000/pipelines/parse
```

3. Receive a response like:

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

4. Show a user-friendly alert with those values.

### Backend

Update:

```text
backend/main.py
```

The `/pipelines/parse` endpoint should:

1. Accept the posted pipeline data.
2. Count the number of nodes.
3. Count the number of edges.
4. Determine whether the graph is a DAG.
5. Return:

```json
{
  "num_nodes": 0,
  "num_edges": 0,
  "is_dag": true
}
```

## What A DAG Means

DAG means directed acyclic graph.

For this app:

- Nodes are graph vertices.
- Edges are directed connections from one node to another.
- The graph is a DAG if there is no cycle.

Example DAG:

```text
Input -> Text -> LLM -> Output
```

Example not a DAG:

```text
Input -> Text -> LLM
         ^        |
         |________|
```

The backend should detect cycles from the submitted edges.

## Suggested Implementation Order

1. Run the existing frontend and backend.
2. Confirm the starter drag-and-drop UI works.
3. Add CORS support to the backend so the React app can call FastAPI.
4. Implement the backend `/pipelines/parse` endpoint.
5. Wire the frontend submit button to the backend.
6. Refactor nodes into a reusable abstraction.
7. Add five new node types.
8. Improve the text node auto-resize behavior.
9. Add dynamic variable handles to the text node.
10. Apply final styling.
11. Test a few pipelines:
    - empty graph
    - simple chain
    - branching graph
    - graph with a cycle
12. Record the walkthrough video.

## Submission Requirements

Submit through the provided Google Form.

You need two files:

1. Completed code as a zip file.
   - Naming format: `FirstName_LastName_technical_assessment`
2. Screen recording walkthrough.
   - Naming format: `FirstName_LastName_screenrecording`

In the screen recording, focus on:

- final functionality
- final design
- how the node abstraction works
- text node variable handles
- submit/backend result
- brief explanation of the code architecture

Suggested walkthrough structure:

1. Briefly introduce the app as a visual pipeline builder.
2. Drag several nodes onto the canvas.
3. Connect the nodes into a valid pipeline.
4. Show the five new node types.
5. Open the text node and demonstrate auto-resizing.
6. Type variables such as `{{ input }}` and show the dynamic handles.
7. Click submit and show the alert from the backend.
8. Briefly explain:
   - the node abstraction
   - the Zustand/React Flow state flow
   - the FastAPI parsing endpoint
   - the DAG detection logic

## Current Starter Repo Status

The repository currently contains the starter version:

- React Flow canvas exists.
- Four starter nodes exist.
- Basic drag-and-drop exists.
- Zustand store exists.
- Submit button exists but does not submit pipeline data yet.
- FastAPI backend exists but `/pipelines/parse` is only a placeholder.
- Styling is still minimal.

So the main task is to turn this starter into a polished, working pipeline builder.
