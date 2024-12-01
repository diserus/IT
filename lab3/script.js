class Currency {
    constructor(name, rate) {
        this.name = name;
        this.rate = rate;
    }
  }
  
  class ExpenseType {
    constructor(name) {
        this.name = name;
    }
  }
  
  class IncomeType {
    constructor(name) {
        this.name = name;
    }
  }
  
  class Expense {
    constructor(value, type, date, currency) {
        this.value = value;
        this.type = type;
        this.date = date;
        this.currency = currency;
    }
  }
  
  class Income {
    constructor(value, type, date, currency) {
        this.value = value;
        this.type = type;
        this.date = date;
        this.currency = currency; 
    }
  }
  
  class Budget {
    constructor() {
        this.currencies = [];
        this.expenseTypes = [];
        this.incomeTypes = [];
        this.expenses = [];
        this.incomes = [];
    }

    addCurrency(currency) {
        this.currencies.push(currency);
    }
  
    updateCurrency(index, currency) {
        this.currencies[index] = currency;
    }
  
    deleteCurrency(index) {
        this.currencies.splice(index, 1);
    }
  
    addExpenseType(expenseType) {
        this.expenseTypes.push(expenseType);
    }
  
    updateExpenseType(index, expenseType) {
        this.expenseTypes[index] = expenseType;
    }
  
    deleteExpenseType(index) {
        this.expenseTypes.splice(index, 1);
    }
  
    addIncomeType(incomeType) {
        this.incomeTypes.push(incomeType);
    }
  
    updateIncomeType(index, incomeType) {
        this.incomeTypes[index] = incomeType;
    }
  
    deleteIncomeType(index) {
        this.incomeTypes.splice(index, 1);
    }
  
    addExpense(expense) {
        this.expenses.push(expense);
    }
  
    updateExpense(index, expense) {
        this.expenses[index] = expense;
    }
  
    deleteExpense(index) {
        this.expenses.splice(index, 1);
    }
  
    addIncome(income) {
        this.incomes.push(income);
    }
  
    updateIncome(index, income) {
        this.incomes[index] = income;
    }
  
    deleteIncome(index) {
        this.incomes.splice(index, 1);
    }
  
    calculateBalance(startDate, endDate) {
        let totalIncome = this.incomes
            .filter(income => income.date >= startDate && income.date <= endDate)
            .reduce((sum, income) => {
                let rate = income.currency.rate / 1;
                return sum + parseFloat(income.value) * rate;
            }, 0);
    
        let totalExpense = this.expenses
            .filter(expense => expense.date >= startDate && expense.date <= endDate)
            .reduce((sum, expense) => {
                let rate = expense.currency.rate / 1;
                return sum + parseFloat(expense.value) * rate;
            }, 0);
    
        return totalIncome - totalExpense;
    }
  
    filterTransactions(startDate, endDate) {
        let filteredIncomes = this.incomes.filter(income => income.date >= startDate && income.date <= endDate);
        let filteredExpenses = this.expenses.filter(expense => expense.date >= startDate && expense.date <= endDate);
  
        return {
            incomes: filteredIncomes,
            expenses: filteredExpenses
        };
    }
}
  
let budget = new Budget();
let purchaseCount = 1;
let isEditing = false;
function addExpenses()
{
    
    purchaseCount++;
    document.getElementById('add-expenses')
    const expensesList = document.getElementById('expenses-list');
    const newPurchase = document.createElement('li');
    newPurchase.className = 'list-group-item d-flex justify-content-between align-items-start';
    newPurchase.innerHTML =`
        <div class="ms-2 me-auto" id="expense${purchaseCount}">
                        <div class="fw-bold" style="display: flex; align-items: center;">
                            <span style="margin-right: 10px;"id="expense-date${purchaseCount}">Дата расхода</span>
                            <button class="btn" onclick="updateExpense(${purchaseCount})" id="editButton${purchaseCount}">
                                            <img src="https://img.icons8.com/?size=100&id=ky9dlsSpTXp0&format=png&color=000000" alt="Edit" width="25" height="24" class="d-inline-block align-text-right">
                                        </button>
                                        <button class="btn" onclick="deleteExpense(${purchaseCount})" id="deleteButton${purchaseCount}" style="margin-left: 10px;">
                                            <img src="https://img.icons8.com/?size=100&id=85081&format=png&color=000000" alt="Delete" width="25" height="24" class="d-inline-block align-text-right">
                                        </button>
                        </div>
                        <div id="expense-type${purchaseCount}" style="color: #595f5c;">Тип расхода</div>
                        
                    </div>
                     <div class="currency"><span class="expended" id="expense-amount${purchaseCount}">0 </span><div id="expense-currency${purchaseCount}" style="display: inline;">₽</div></div>
`;
    expensesList.insertBefore(newPurchase, expensesList.lastElementChild);    
    
}
function updateExpense(expenseId) {
    const dateElement = document.getElementById(`expense-date${expenseId}`);
    const amountElement = document.getElementById(`expense-amount${expenseId}`);
    const currencyElement = document.getElementById(`expense-currency${expenseId}`);
    const typeElement = document.getElementById(`expense-type${expenseId}`);
    const buttonElement = document.getElementById(`editButton${expenseId}`);

    if (!isEditing) {
 
        dateElement.innerHTML = `<input type="date" value="${dateElement.innerText}" />`;
        amountElement.innerHTML = `<input type="number" value="${amountElement.innerText}" />`;
        currencyElement.innerHTML = `<select><option value="₽">₽</option><option value="$">$</option></select>`;
        typeElement.innerHTML = `<input type="text" value="${typeElement.innerText}" />`;
        buttonElement.innerHTML = `<img src="https://img.icons8.com/?size=100&id=61643&format=png&color=228BE6" width="25" height="24" class="d-inline-block align-text-right">`;
    } else {

        const newDate = dateElement.querySelector('input').value;
        const newAmount = amountElement.querySelector('input').value;
        const newCurrency = currencyElement.querySelector('select').value;
        const newType = typeElement.querySelector('input').value;

        dateElement.innerText = newDate;
        amountElement.innerText = newAmount;
        currencyElement.innerText = newCurrency;
        typeElement.innerText = newType;
        let expense = new Expense(newAmount,newType,newDate,newCurrency);
         console.log(`Adding expense: ${newAmount}, ${newType}, ${newDate}, ${newCurrency}`);
        budget.addExpense(expense);
        calculateTotalExpense();
        buttonElement.innerHTML = `<img src="https://img.icons8.com/?size=100&id=ky9dlsSpTXp0&format=png&color=000000" alt="Edit" width="25" height="24" class="d-inline-block align-text-right">`;
    }
    isEditing = !isEditing;

}
function deleteExpense(expenseId) {
    budget.deleteExpense(expenseId - 1);
    console.log(budget.expenses);
    // Находим элемент в DOM и удаляем его
    const expenseElement = document.getElementById(`expense${expenseId}`);
    expenseElement.parentElement.remove();
    
    // Обновляем общую сумму
    calculateTotalExpense();
}
function calculateTotalExpense()
{
    const totalValue = budget.expenses.reduce((accumulator, expense) => {
        return accumulator + Number(expense.value);
    }, 0);  
    document.getElementById("expense-total").textContent = totalValue;  
}
function selectItem(item, text) {
    const dropdownItems = item.closest('.dropdown-menu').querySelectorAll('.dropdown-item');
    dropdownItems.forEach(dropdownItem => {
        dropdownItem.classList.remove('active'); 
    });
    item.classList.add('active'); 
    document.getElementById('selected-item').textContent = text; 
    const dropdownMenu = item.closest('.dropdown-menu');
    dropdownMenu.classList.remove('show'); 
}