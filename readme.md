# Calculator 🧮

A desktop calculator application built using [Electron]

## Features

- Perform basic arithmetic operations: addition, subtraction, multiplication, and division.
- Save and retrieve calculations in memory.
- Responsive and interactive UI.
- Electron-based desktop application.

## Usage

1. Launch the application using the `npm start` command.
2. Use the calculator interface to perform arithmetic operations.
3. Save calculations to memory using the `GM` button and retrieve them using the `LM` button.
4. Use the sidebar to view and reuse saved calculations.

### Electron IPC Handlers

- `perform-addition`: Handles addition requests.
- `perform-subtraction`: Handles subtraction requests.
- `perform-division`: Handles division requests.
- `perform-multiplication`: Handles multiplication requests.
- `retrieve-memory-data`: Retrieves memory data.
- `store-memory-data`: Stores data in memory.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
