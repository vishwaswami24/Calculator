let string = "";
let memory = 0;
const display = document.querySelector('#display');
const previous = document.querySelector('#previous');
const buttons = document.querySelectorAll('.button, .memory-btn');

const calculate = (expr) => {
    try {
        return Function('"use strict"; return (' + expr + ')')();
    } catch {
        return 'Error';
    }
};

const updateDisplay = () => {
    display.value = string;
    const memoryText = memory !== 0 ? `M: ${memory}` : '';
    previous.textContent = memoryText;
};

const handleInput = (value) => {
    if (value === '=') {
        if (string) {
            const result = calculate(string);
            previous.textContent = string + ' =';
            string = result === 'Error' ? '' : String(result);
        }
    } else if (value === 'C') {
        string = "";
        previous.textContent = '';
    } else if (value === 'backspace') {
        string = string.slice(0, -1);
    } else if (value === '%') {
        if (string) string = String(calculate(string + '/100'));
    } else if (value === 'MC') {
        memory = 0;
    } else if (value === 'MR') {
        string = String(memory);
    } else if (value === 'M+') {
        if (string) memory += Number(calculate(string));
    } else if (value === 'M-') {
        if (string) memory -= Number(calculate(string));
    } else {
        const lastChar = string.slice(-1);
        const operators = ['+', '-', '*', '/'];
        if (value === '.' && (lastChar === '.' || !string)) return;
        if (operators.includes(value) && operators.includes(lastChar)) return;
        string += value;
    }
    updateDisplay();
};

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const btn = e.target.closest('.button, .memory-btn');
        if (btn) handleInput(btn.getAttribute('data-value'));
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') handleInput(e.key);
    else if (['+', '-', '*', '/'].includes(e.key)) handleInput(e.key);
    else if (e.key === 'Enter' || e.key === '=') handleInput('=');
    else if (e.key === 'Escape') handleInput('C');
    else if (e.key === 'Backspace') handleInput('backspace');
    else if (e.key === '%') handleInput('%');
});

