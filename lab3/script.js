class Currency {
    constructor(name, rate, date) {
        this.name = name;
        this.rate = rate;
        this.date = date;
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
        if (index >= 0 && index < this.expenses.length) {
            this.expenses.splice(index, 1);
        }
    }
    addIncome(income) {
        this.incomes.push(income);
    }
    updateIncome(index, income) {
        this.incomes[index] = income;
    }
    deleteIncome(index) {
        if (index >= 0 && index < this.incomes.length) {
            this.incomes.splice(index, 1);
        }
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
let incomeCount = 1;
let isEditing = false;
budget.addIncome = function(income) {
    this.incomes.push(income);
    updateBalanceChart();
};
budget.deleteIncome = function(index) {
    if (index >= 0 && index < this.incomes.length) {
        this.incomes.splice(index, 1);
        updateBalanceChart();
    }
};
budget.addExpense = function(expense) {
    this.expenses.push(expense);
    updateBalanceChart();
};
budget.deleteExpense = function(index) {
    if (index >= 0 && index < this.expenses.length) {
        this.expenses.splice(index, 1);
        updateBalanceChart();
    }
};
function addExpenses() {
    purchaseCount++;
    const expensesList = document.getElementById('expenses-list');
    const newPurchase = document.createElement('li');
    newPurchase.className = 'list-group-item d-flex justify-content-between align-items-start';
    newPurchase.innerHTML = `
        <div class="ms-2 me-auto" id="expense${purchaseCount}">
            <div class="fw-bold" style="display: flex; align-items: center;">
                <span style="margin-right: 10px;" id="expense-date${purchaseCount}">Дата расхода</span>
                <button class="btn" onclick="updateExpense(${purchaseCount})" id="editButton${purchaseCount}">
                    <img src="https://img.icons8.com/?size=100&id=ky9dlsSpTXp0&format=png&color=000000" alt="Edit" width="25" height="24" class="d-inline-block align-text-right">
                </button>
                <button class="btn" onclick="deleteExpense(${purchaseCount})" id="deleteButton${purchaseCount}" style="margin-left: 10px;">
                    <img src="https://img.icons8.com/?size=100&id=85081&format=png&color=000000" alt="Delete" width="25" height="24" class="d-inline-block align-text-right">
                </button>
            </div>
            <div id="expense-type${purchaseCount}" style="color: #595f5c;">Тип расхода</div>
        </div>
        <div class="currency">
            <span class="expended" id="expense-amount${purchaseCount}">0</span>
            <span id="expense-currency${purchaseCount}">₽</span>
        </div>
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
        let currencySelect = '<select>';
        budget.currencies.forEach(currency => {
            currencySelect += `<option value="${currency.name}">${currency.name}</option>`;
        });
        currencySelect += '</select>';
        currencyElement.innerHTML = currencySelect;
        
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

        const currency = budget.currencies.find(c => c.name === newCurrency) || { rate: 1 };
        let expense = new Expense(newAmount, newType, newDate, currency);
        budget.addExpense(expense);
        calculateTotalExpense();
        updateBalanceChart();
        buttonElement.innerHTML = `<img src="https://img.icons8.com/?size=100&id=ky9dlsSpTXp0&format=png&color=000000" alt="Edit" width="25" height="24" class="d-inline-block align-text-right">`;
    }
    isEditing = !isEditing;
}
function deleteExpense(expenseId) {
    const expenseElement = document.getElementById(`expense${expenseId}`);
    if (!expenseElement) return;
    const index = Array.from(expenseElement.parentElement.parentElement.children)
        .filter(el => el.querySelector('[id^="expense"]'))
        .indexOf(expenseElement.parentElement);
    if (index !== -1) {
        budget.deleteExpense(index);
        expenseElement.parentElement.remove();
        calculateTotalExpense();
        updateBalanceChart();
    }
}
function calculateTotalExpense() {
    if (budget.expenses.length === 0) {
        document.getElementById("expense-total").textContent = "0.00";
        return;
    }
    const totalValue = budget.expenses.reduce((accumulator, expense) => {
        const currency = budget.currencies.find(c => c.name === expense.currency.name);
        if (!currency) return accumulator;
        const valueInRubles = Number(expense.value) * currency.rate;
        return accumulator + valueInRubles;
    }, 0);
    document.getElementById("expense-total").textContent = totalValue.toFixed(2);
}
function addIncome() {
    incomeCount++;
    const incomeList = document.getElementById('income-list');
    const newIncome = document.createElement('li');
    newIncome.className = 'list-group-item d-flex justify-content-between align-items-start';
    newIncome.innerHTML = `
        <div class="ms-2 me-auto" id="income${incomeCount}">
            <div class="fw-bold" style="display: flex; align-items: center;">
                <span style="margin-right: 10px;" id="income-date${incomeCount}">Дата дохода</span>
                <button class="btn" onclick="updateIncome(${incomeCount})" id="editButtonIncome${incomeCount}">
                    <img src="https://img.icons8.com/?size=100&id=ky9dlsSpTXp0&format=png&color=000000" alt="Edit" width="25" height="24" class="d-inline-block align-text-right">
                </button>
                <button class="btn" onclick="deleteIncome(${incomeCount})" id="deleteButtonIncome${incomeCount}" style="margin-left: 10px;">
                    <img src="https://img.icons8.com/?size=100&id=85081&format=png&color=000000" alt="Delete" width="25" height="24" class="d-inline-block align-text-right">
                </button>
            </div>
            <div id="income-type${incomeCount}" style="color: #595f5c;">Тип дохода</div>
        </div>
        <div class="currency">
            <span class="expended" id="income-amount${incomeCount}">0</span>
            <span id="income-currency${incomeCount}">₽</span>
        </div>
    `;
    incomeList.insertBefore(newIncome, incomeList.lastElementChild);
}
function updateIncome(incomeId) {
    const dateElement = document.getElementById(`income-date${incomeId}`);
    const amountElement = document.getElementById(`income-amount${incomeId}`);
    const currencyElement = document.getElementById(`income-currency${incomeId}`);
    const typeElement = document.getElementById(`income-type${incomeId}`);
    const buttonElement = document.getElementById(`editButtonIncome${incomeId}`);

    if (!isEditing) {
        dateElement.innerHTML = `<input type="date" value="${dateElement.innerText}" />`;
        amountElement.innerHTML = `<input type="number" value="${amountElement.innerText}" />`;
        let currencySelect = '<select>';
        budget.currencies.forEach(currency => {
            currencySelect += `<option value="${currency.name}">${currency.name}</option>`;
        });
        currencySelect += '</select>';
        currencyElement.innerHTML = currencySelect;
        
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

        const currency = budget.currencies.find(c => c.name === newCurrency) || { rate: 1 };
        let income = new Income(newAmount, newType, newDate, currency);
        budget.addIncome(income);
        calculateTotalIncome();
        updateBalanceChart();
        buttonElement.innerHTML = `<img src="https://img.icons8.com/?size=100&id=ky9dlsSpTXp0&format=png&color=000000" alt="Edit" width="25" height="24" class="d-inline-block align-text-right">`;
    }
    isEditing = !isEditing;
}
function deleteIncome(incomeId) {
    const incomeElement = document.getElementById(`income${incomeId}`);
    if (!incomeElement) return;
    const index = Array.from(incomeElement.parentElement.parentElement.children)
        .filter(el => el.querySelector('[id^="income"]'))
        .indexOf(incomeElement.parentElement);

    if (index !== -1) {
        budget.deleteIncome(index);
        incomeElement.parentElement.remove();
        calculateTotalIncome();
        updateBalanceChart();
    }
}
function calculateTotalIncome() {
    if (budget.incomes.length === 0) {
        document.getElementById("income-total").textContent = "0.00";
        return;
    }
    const totalValue = budget.incomes.reduce((accumulator, income) => {
        const currency = budget.currencies.find(c => c.name === income.currency.name);
        if (!currency) return accumulator;
        const valueInRubles = Number(income.value) * currency.rate;
        return accumulator + valueInRubles;
    }, 0);
    document.getElementById("income-total").textContent = totalValue.toFixed(2);
}
function applyExpenseFilters() {
    const startDate = document.getElementById('expense-start-date').value;
    const endDate = document.getElementById('expense-end-date').value;
    const typeFilter = document.getElementById('expense-type-filter').value.toLowerCase().trim();
    let filteredExpenses = budget.expenses.filter(expense => {
        let matchesDate = true;
        let matchesType = true;
        if (startDate && endDate) {
            const expenseDate = new Date(expense.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            expenseDate.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            matchesDate = expenseDate >= start && expenseDate <= end;
        } else if (startDate) {
            const expenseDate = new Date(expense.date);
            const start = new Date(startDate);
            expenseDate.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            matchesDate = expenseDate >= start;
        } else if (endDate) {
            const expenseDate = new Date(expense.date);
            const end = new Date(endDate);
            expenseDate.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            matchesDate = expenseDate <= end;
        }
        if (typeFilter) {
            matchesType = expense.type.toLowerCase().includes(typeFilter);
        }
        return matchesDate && matchesType;
    });
    updateExpensesList(filteredExpenses);
}
function applyIncomeFilters() {
    const startDate = document.getElementById('income-start-date').value;
    const endDate = document.getElementById('income-end-date').value;
    const typeFilter = document.getElementById('income-type-filter').value.toLowerCase().trim();
    let filteredIncomes = budget.incomes.filter(income => {
        let matchesDate = true;
        let matchesType = true;
        if (startDate && endDate) {
            const incomeDate = new Date(income.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            incomeDate.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            matchesDate = incomeDate >= start && incomeDate <= end;
        } else if (startDate) {
            const incomeDate = new Date(income.date);
            const start = new Date(startDate);
            incomeDate.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            matchesDate = incomeDate >= start;
        } else if (endDate) {
            const incomeDate = new Date(income.date);
            const end = new Date(endDate);
            incomeDate.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            matchesDate = incomeDate <= end;
        }
        if (typeFilter) {
            matchesType = income.type.toLowerCase().includes(typeFilter);
        }
        return matchesDate && matchesType;
    });
    updateIncomesList(filteredIncomes);
}

function applyBalanceFilters() {
    const startDate = document.getElementById('balance-start-date').value;
    const endDate = document.getElementById('balance-end-date').value;
    const showIncome = document.getElementById('show-income').checked;
    const showExpenses = document.getElementById('show-expenses').checked;
    updateBalanceChart(startDate, endDate, showIncome, showExpenses);
}
function updateBalanceChart(startDate = '', endDate = '', showIncome = true, showExpenses = true) {
    const ctx = document.getElementById('balance-chart').getContext('2d');
    let dates = [...budget.incomes.map(i => i.date), ...budget.expenses.map(e => e.date)];
    dates = [...new Set(dates)].sort();
    if (startDate && endDate) {
        dates = dates.filter(date => date >= startDate && date <= endDate);
    }
    let balanceData = [];
    let runningBalance = 0;
    dates.forEach(date => {
        let dailyIncome = 0;
        let dailyExpense = 0;
        if (showIncome) {
            dailyIncome = budget.incomes
                .filter(income => income.date === date)
                .reduce((sum, income) => sum + (parseFloat(income.value) * income.currency.rate), 0);
        }
        if (showExpenses) {
            dailyExpense = budget.expenses
                .filter(expense => expense.date === date)
                .reduce((sum, expense) => sum + (parseFloat(expense.value) * expense.currency.rate), 0);
        }
        runningBalance += dailyIncome - dailyExpense;
        balanceData.push({ x: date, y: runningBalance });
    });
    if (window.balanceChart instanceof Chart) {
        window.balanceChart.destroy();
    }
    window.balanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Баланс',
                data: balanceData,
                borderColor: 'rgb(13, 110, 253)',  
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    title: {
                        display: true,
                        text: 'Дата'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Баланс (₽)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false  
                },
                title: {
                    display: true,
                    text: 'График баланса'
                }
            }
        }
    });
}
async function loadBudgetData() {
    try {
        const response = await fetch('http://localhost:3001/api/budget');
        const data = await response.json();
        data.currencies.forEach(currencyData => {
            budget.currencies.push(new Currency(currencyData.name, currencyData.rate, currencyData.date));
        });
        data.expenses.forEach(expenseData => {
            budget.expenses.push(new Expense(
                expenseData.value,
                expenseData.type,
                expenseData.date,
                expenseData.currency
            ));
        });
        data.incomes.forEach(incomeData => {
            budget.incomes.push(new Income(
                incomeData.value,
                incomeData.type,
                incomeData.date,
                incomeData.currency
            ));
        });
        updateCurrencyList();
        updateExpensesList(budget.expenses);
        updateIncomesList(budget.incomes);
        updateBalanceChart();
    } catch (error) {
        console.error('Error loading budget data:', error);
        if (budget.currencies.length === 0) {
            budget.addCurrency(new Currency('RUB', 1, new Date().toISOString().split('T')[0]));
            updateCurrencyList();
        }
    }
}
async function saveBudgetData() {
    try {
        await fetch('http://localhost:3001/api/budget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currencies: budget.currencies,
                expenses: budget.expenses,
                incomes: budget.incomes
            })
        });
    } catch (error) {
        console.error('Error saving budget data:', error);
    }
}
const originalAddExpense = budget.addExpense;
budget.addExpense = function(expense) {
    originalAddExpense.call(this, expense);
    saveBudgetData();
};
const originalDeleteExpense = budget.deleteExpense;
budget.deleteExpense = function(index) {
    originalDeleteExpense.call(this, index);
    saveBudgetData();
};
const originalAddIncome = budget.addIncome;
budget.addIncome = function(income) {
    originalAddIncome.call(this, income);
    saveBudgetData();
};
const originalDeleteIncome = budget.deleteIncome;
budget.deleteIncome = function(index) {
    originalDeleteIncome.call(this, index);
    saveBudgetData();
};
document.addEventListener('DOMContentLoaded', function() {
    loadBudgetData();
    if (budget.currencies.length === 0) {
        budget.addCurrency(new Currency('RUB', 1, new Date().toISOString().split('T')[0]));
    }
    updateCurrencyDropdowns();
    const balanceTab = document.getElementById('balance-tab-content');
    const canvas = document.createElement('canvas');
    canvas.id = 'balance-chart';
    balanceTab.appendChild(canvas);
    updateBalanceChart();  
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' || e.target.tagName === 'BUTTON') {
                e.stopPropagation();
            }
        });
    });
});
function updateExpensesList(filteredExpenses) {
    const expensesList = document.getElementById('expenses-list');
    const addButton = expensesList.lastElementChild;
    expensesList.innerHTML = '';
    filteredExpenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-start';
        li.innerHTML = `
            <div class="ms-2 me-auto" id="expense${index + 1}">
                <div class="fw-bold" style="display: flex; align-items: center;">
                    <span style="margin-right: 10px;" id="expense-date${index + 1}">${expense.date}</span>
                    <button class="btn" onclick="updateExpense(${index + 1})" id="editButton${index + 1}">
                        <img src="https://img.icons8.com/?size=100&id=ky9dlsSpTXp0&format=png&color=000000" alt="Edit" width="25" height="24" class="d-inline-block align-text-right">
                    </button>
                    <button class="btn" onclick="deleteExpense(${index + 1})" id="deleteButton${index + 1}" style="margin-left: 10px;">
                        <img src="https://img.icons8.com/?size=100&id=85081&format=png&color=000000" alt="Delete" width="25" height="24" class="d-inline-block align-text-right">
                    </button>
                </div>
                <div id="expense-type${index + 1}" style="color: #595f5c;">${expense.type}</div>
            </div>
            <div class="currency">
                <span class="expended" id="expense-amount${index + 1}">${expense.value}</span>
                <span id="expense-currency${index + 1}">${expense.currency.name}</span>
            </div>
        `;
        expensesList.appendChild(li);
    });
    expensesList.appendChild(addButton);
    updateFilteredTotal(filteredExpenses, 'expense');
}
function updateIncomesList(filteredIncomes) {
    const incomesList = document.getElementById('income-list');

    const addButton = incomesList.lastElementChild;
    incomesList.innerHTML = '';
    filteredIncomes.forEach((income, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-start';
        li.innerHTML = `
            <div class="ms-2 me-auto" id="income${index + 1}">
                <div class="fw-bold" style="display: flex; align-items: center;">
                    <span style="margin-right: 10px;" id="income-date${index + 1}">${income.date}</span>
                    <button class="btn" onclick="updateIncome(${index + 1})" id="editButtonIncome${index + 1}">
                        <img src="https://img.icons8.com/?size=100&id=ky9dlsSpTXp0&format=png&color=000000" alt="Edit" width="25" height="24" class="d-inline-block align-text-right">
                    </button>
                    <button class="btn" onclick="deleteIncome(${index + 1})" id="deleteButtonIncome${index + 1}" style="margin-left: 10px;">
                        <img src="https://img.icons8.com/?size=100&id=85081&format=png&color=000000" alt="Delete" width="25" height="24" class="d-inline-block align-text-right">
                    </button>
                </div>
                <div id="income-type${index + 1}" style="color: #595f5c;">${income.type}</div>
            </div>
            <div class="currency">
                <span class="expended" id="income-amount${index + 1}">${income.value}</span>
                <span id="income-currency${index + 1}">${income.currency.name}</span>
            </div>
        `;
        incomesList.appendChild(li);
    });
    incomesList.appendChild(addButton);
    updateFilteredTotal(filteredIncomes, 'income');
}
function updateFilteredTotal(filteredTransactions, type) {
    const totalValue = filteredTransactions.reduce((acc, t) => {
        const currency = budget.currencies.find(c => c.name === t.currency.name);
        if (!currency) return acc;
        return acc + (Number(t.value) * currency.rate);
    }, 0);
    const totalElement = document.getElementById(type === 'expense' ? 'expense-total' : 'income-total');
    totalElement.textContent = totalValue.toFixed(2);
}
function addCurrency() {
    const code = document.getElementById('currency-code').value.toUpperCase();
    const rate = parseFloat(document.getElementById('currency-rate').value);
    const date = document.getElementById('currency-date').value;
    if (!code || !rate || !date) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    const currency = new Currency(code, rate, date);
    budget.addCurrency(currency);
    updateCurrencyList();
    updateCurrencyDropdowns();
    document.getElementById('currency-code').value = '';
    document.getElementById('currency-rate').value = '';
    document.getElementById('currency-date').value = '';
}
function updateCurrencyList() {
    const currencyList = document.getElementById('currency-list');
    currencyList.innerHTML = ''; 
    if (!budget.currencies.some(c => c.name === 'RUB')) {
        budget.addCurrency(new Currency('RUB', 1, new Date().toISOString().split('T')[0]));
    }
    budget.currencies.forEach((currency, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div>
                <strong>${currency.name}</strong>
                <span class="ms-2">Курс: ${currency.rate}</span>
                <span class="ms-2">Дата: ${currency.date}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteCurrency(${index})">
                <img src="https://img.icons8.com/?size=100&id=85081&format=png&color=000000" alt="Delete" width="20" height="20">
            </button>
        `;
        currencyList.appendChild(li);
    });
}
function deleteCurrency(index) {
    budget.deleteCurrency(index);
    updateCurrencyList();
    updateCurrencyDropdowns();
}
function updateCurrencyDropdowns() {
    const expenseCurrencySelect = document.querySelector('#expense-currency1 select');
    const incomeCurrencySelect = document.querySelector('#income-currency1 select');
    if (expenseCurrencySelect) {
        updateDropdown(expenseCurrencySelect);
    }
    if (incomeCurrencySelect) {
        updateDropdown(incomeCurrencySelect);
    }
}
function updateDropdown(select) {
    select.innerHTML = '';
    budget.currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.name;
        option.textContent = currency.name;
        select.appendChild(option);
    });
}