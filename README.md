# Smart Goal Planner

Smart Goal Planner is a React-based web application that allows users to set, track, and manage their financial savings goals. Users can add new goals with a name, target amount, deadline, and category, then track progress by making deposits and editing or deleting goals as needed.

## Features

- Create new financial goals
- View all goals with progress bars
- Deposit saved amounts toward goals
- Edit goal information (name, amount, category, deadline)
- Delete goals
- View a financial overview with:
  - Total number of goals
  - Total amount saved
  - Number of completed goals
  - Goal deadlines with time remaining or overdue status

## Technologies Used

- React (Vite)
- Tailwind CSS (via CDN)
- React Router DOM
- JSON Server for local API simulation

## Getting Started

### Prerequisites

- Node.js and npm installed
- JSON Server installed globally

```bash
npm install -g json-server
```

## Installation

Clone this repository

```bash
git clone https://github.com/your-username/smart-goal-planner.git
cd smart-goal-planner
```

### Install dependencies

```bash
npm install
```

### Running the App

After installing dependencies,start the React app:

```bash
npm run dev
```

The application will be available at http://localhost:5173 

#### Live deployment

Or you can view the live app at :
https://react-code-challenge-phi.vercel.app/

## Notes

This project is front-end only and uses JSON Server as a mock backend.

## License

This project is intended for educational use only and is not licensed for commercial distribution.
