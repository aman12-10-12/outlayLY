# outlayLY

## Project idea

outlayLY will be a personal expense and income tracker. Users will be able to create an account, add their income and expenses, see their current balance, review charts, and download their records.

## Technology I want to use

| Technology | Why I will use it |
|---|---|
| React | To build the frontend screens and user interface. |
| Vite | To run and build the React frontend quickly. |
| Tailwind CSS | To style pages, forms, cards, and responsive layouts. |
| Node.js | To run the backend application. |
| Express.js | To create API routes for users, income, expenses, and dashboard data. |
| MongoDB | To store user accounts and financial transactions. |
| Mongoose | To create MongoDB models and work with database data. |
| JWT | To keep users logged in securely. |
| bcrypt | To hash user passwords before saving them. |
| Multer | To upload profile images. |
| Recharts | To show income and expense charts. |
| XLSX | To download income and expense data as Excel files. |

## Main features planned

- User signup and login
- Secure authentication using JWT
- Profile image upload
- Add income transactions
- Add expense transactions
- View total balance, income, and expenses
- View recent transactions
- View income and expense charts
- Delete transactions
- Download income and expense data in Excel format

## Development plan

I will complete the backend first and then start the frontend.

### Phase 1: Backend first

1. Set up the Node.js and Express server.
2. Connect the server to MongoDB.
3. Create User, Income, and Expense database models.
4. Build signup, login, and current-user APIs.
5. Add JWT authentication middleware.
6. Add profile image upload API.
7. Build income APIs: add, list, delete, and Excel download.
8. Build expense APIs: add, list, delete, and Excel download.
9. Build dashboard API for balance, totals, recent transactions, and chart data.
10. Test every API before beginning frontend work.

### Phase 2: Frontend after backend

1. Set up the React and Vite project.
2. Configure Axios to communicate with the backend APIs.
3. Create login and signup pages.
4. Add user context and protected routes.
5. Build the dashboard layout, navbar, and sidebar.
6. Build dashboard cards, transaction lists, and charts.
7. Build income add, list, delete, and export screens.
8. Build expense add, list, delete, and export screens.
9. Test the complete frontend with the backend.
10. Deploy the frontend and backend.

## Project structure planned

```text
outlayLY/
├── server/   # Backend: API, database models, controllers, and routes
├── client/   # Frontend: React pages, components, charts, and API calls
└── Readme.md # Project plan and documentation
```

## Goal

Build a clean and simple finance tracker that makes it easy for users to understand where their money comes from and where it goes.
