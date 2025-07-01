document.addEventListener("DOMContentLoaded", () => {
  const typeInput = document.getElementById("typeInput");
  const descInput = document.getElementById("descInput");
  const amountInput = document.getElementById("amountInput");
  const addBtn = document.getElementById("addBtn");
  const transactionList = document.getElementById("transactionList");
  const incomeDisplay = document.getElementById("income");
  const expenseDisplay = document.getElementById("expense");
  const balanceDisplay = document.getElementById("balance");

  let totalincome = 0;
  let totalexpense = 0;

  addBtn.addEventListener("click", () => {
    const type = typeInput.value;
    const desc = descInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (desc === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid description and positive amount.");
      return;
    }

    const li = document.createElement("li");
    li.classList.add(type);
    li.innerHTML = `
      ${desc}: ₹${amount}
      <span class="delete-btn">✖</span>
    `;

    transactionList.appendChild(li);

    if (type === "income") {
      totalincome += amount;
    } else {
      totalexpense += amount;
    }

    updateTotals();

    descInput.value = "";
    amountInput.value = "";
  });

  function updateTotals() {
    const balance = totalincome - totalexpense;
    incomeDisplay.textContent = totalincome;
    expenseDisplay.textContent = totalexpense;
    balanceDisplay.textContent = balance;
  }

  // ✅ Event Delegation for delete
  transactionList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const li = e.target.parentElement;
      const type = li.classList.contains("income") ? "income" : "expense";

      const text = li.textContent;
      const amountMatch = text.match(/₹(\d+(\.\d+)?)/);
      if (!amountMatch) return;

      const amount = parseFloat(amountMatch[1]);

      if (type === "income") {
        totalincome -= amount;
      } else {
        totalexpense -= amount;
      }

      li.remove();
      updateTotals();
    }
  });
});
