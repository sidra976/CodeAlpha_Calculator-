const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const toggleThemeButton = document.getElementById('toggleTheme');
const calculator = document.getElementById('calculator');

let expression = '';

function evaluateExpression(expr) {
  try {
    const sanitized = expr
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/deg/g, '*Math.PI/180');
    return eval(sanitized).toString();
  } catch {
    return 'Error';
  }
}

buttons.forEach(button => {
  button.addEventListener('click', e => {
    const value = e.target.innerText;

    switch (value) {
      case '=':
        expression = evaluateExpression(expression);
        break;
      case 'Ac':
        expression = '';
        break;
      case 'sin':
        expression += 'sin(';
        break;
      case 'deg':
        expression += 'deg';
        break;
      case '()':
        const open = (expression.match(/\(/g) || []).length;
        const close = (expression.match(/\)/g) || []).length;
        expression += open > close ? ')' : '(';
        break;
      case 'α':
        expression += 'alpha';
        break;
      case 'μ':
        expression += 'mu';
        break;
      default:
        expression += value;
    }

    display.value = expression;
  });
});

toggleThemeButton.addEventListener('click', () => {
  calculator.classList.toggle('light-theme');
  calculator.classList.toggle('dark-theme');
});
