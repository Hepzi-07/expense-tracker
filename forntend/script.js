const form = document.getElementById('expenseForm');
const list = document.getElementById('expensesList');

const loadExpenses = async () => {
  const res = await fetch(`http://localhost:3000/api/expenses`);
  const data = await res.json();
  list.innerHTML = '';
  data.forEach(exp => {
    const li = document.createElement('li');
    li.textContent = `${exp.title} - ₹${exp.amount}`;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteExpense(exp._id);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const amount = document.getElementById('amount').value;
  await fetch(`http://localhost:3000/api/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, amount })
  });
  form.reset();
  loadExpenses();
});

const deleteExpense = async (id) => {
  await fetch(`http://localhost:3000/api/expenses/${id}`, {
    method: 'DELETE'
  });
  loadExpenses();
};

loadExpenses();