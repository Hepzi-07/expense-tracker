const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Expense = require('./models/expense');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI);

// Routes

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Create expense
app.post('/api/expenses', async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});

// Delete expense
app.delete('/api/expenses/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));