const kindOptions = ['Land', 'Building', 'PPE', 'Machinery', 'Vehicle', 'Tools', 'Furniture'];

const tableBody = document.querySelector('#depreciationTable tbody');
const addRowBtn = document.getElementById('addRowBtn');
const removeLastRowBtn = document.getElementById('removeLastRowBtn');

// Función para actualizar totales
function updateTotals() {
  let totalMonthly = 0;
  let totalYearly = 0;

  Array.from(tableBody.children).forEach(row => {
    const monthlyDep = parseFloat(row.querySelector('td:nth-child(6) input').value);
    const yearlyDep = parseFloat(row.querySelector('td:nth-child(7) input').value);
    if (!isNaN(monthlyDep)) {
      totalMonthly += monthlyDep;
    }
    if (!isNaN(yearlyDep)) {
      totalYearly += yearlyDep;
    }
  });

  document.getElementById('totalMonthly').textContent = totalMonthly.toFixed(2);
  document.getElementById('totalYearly').textContent = totalYearly.toFixed(2);
}

// Función para eliminar la última fila
function removeLastRow() {
  const rows = tableBody.children;
  if (rows.length > 0) {
    rows[rows.length - 1].remove();
    updateTotals();
  }
}

// Función para crear y añadir una fila nueva
function addRow() {
  const row = document.createElement('tr');

  // Columna Kind
  const tdKind = document.createElement('td');
  const selectKind = document.createElement('select');
  kindOptions.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    selectKind.appendChild(opt);
  });
  tdKind.appendChild(selectKind);
  row.appendChild(tdKind);

  // Asset Name
  const tdAssetName = document.createElement('td');
  const inputAssetName = document.createElement('input');
  inputAssetName.type = 'text';
  tdAssetName.appendChild(inputAssetName);
  row.appendChild(tdAssetName);

  // Useful Life (Years)
  const tdUsefulYears = document.createElement('td');
  const inputUsefulYears = document.createElement('input');
  inputUsefulYears.type = 'number';
  inputUsefulYears.min = '0';
  inputUsefulYears.step = '1';
  tdUsefulYears.appendChild(inputUsefulYears);
  row.appendChild(tdUsefulYears);

  // Useful Life (Months)
  const tdUsefulMonths = document.createElement('td');
  const inputUsefulMonths = document.createElement('input');
  inputUsefulMonths.type = 'number';
  inputUsefulMonths.readOnly = true;
  inputUsefulMonths.value = '';
  tdUsefulMonths.appendChild(inputUsefulMonths);
  row.appendChild(tdUsefulMonths);

  // Buy Value
  const tdBuyValue = document.createElement('td');
  const inputBuyValue = document.createElement('input');
  inputBuyValue.type = 'number';
  inputBuyValue.min = '0';
  inputBuyValue.step = '0.01';
  tdBuyValue.appendChild(inputBuyValue);
  row.appendChild(tdBuyValue);

  // Monthly Depreciation
  const tdMonthlyDep = document.createElement('td');
  const inputMonthlyDep = document.createElement('input');
  inputMonthlyDep.type = 'number';
  inputMonthlyDep.readOnly = true;
  inputMonthlyDep.value = '';
  tdMonthlyDep.appendChild(inputMonthlyDep);
  row.appendChild(tdMonthlyDep);

  // Yearly Depreciation
  const tdYearlyDep = document.createElement('td');
  const inputYearlyDep = document.createElement('input');
  inputYearlyDep.type = 'number';
  inputYearlyDep.readOnly = true;
  inputYearlyDep.value = '';
  tdYearlyDep.appendChild(inputYearlyDep);
  row.appendChild(tdYearlyDep);

  // Función para calcular valores
  function calcularDepreciacion() {
    const years = parseFloat(inputUsefulYears.value);
    const buyValue = parseFloat(inputBuyValue.value);
    const monthsField = inputUsefulMonths;
    const monthlyDepField = inputMonthlyDep;
    const yearlyDepField = inputYearlyDep;

    if (!isNaN(years) && years > 0) {
      const months = years * 12;
      monthsField.value = months;

      if (!isNaN(buyValue) && buyValue >= 0 && months > 0) {
        const monthlyDep = buyValue / months;
        monthlyDepField.value = monthlyDep.toFixed(2);
      } else {
        monthlyDepField.value = '';
      }

      if (!isNaN(buyValue) && buyValue >= 0 && years > 0) {
        const yearlyDep = buyValue / years;
        yearlyDepField.value = yearlyDep.toFixed(2);
      } else {
        yearlyDepField.value = '';
      }
    } else {
      monthsField.value = '';
      monthlyDepField.value = '';
      yearlyDepField.value = '';
    }
    updateTotals();
  }

  // Eventos para cálculo
  [inputUsefulYears, inputBuyValue].forEach(input => {
    input.addEventListener('input', calcularDepreciacion);
  });
  inputUsefulYears.addEventListener('change', calcularDepreciacion);

  // Añadir fila al tbody
  tableBody.appendChild(row);
}

// Evento para añadir fila
addRowBtn.addEventListener('click', addRow);

// Evento para quitar última fila
removeLastRowBtn.addEventListener('click', removeLastRow);

// Añadir una fila inicial
addRow();
