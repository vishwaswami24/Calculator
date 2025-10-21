let string = "";
let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click', (e)=>{
        let value = e.target.closest('.button').getAttribute('data-value');
        if (value == '=') {
            string = eval(string);
            document.querySelector('input').value = string;
        }
        else if (value == 'C') {
            string = "";
            document.querySelector('input').value = string;
        }
        else if (value == 'backspace') {
            string = string.slice(0,-1);
            document.querySelector('input').value = string;
        }
        else {
            console.log(e.target);
            string = string + value;
            document.querySelector('input').value = string;
        }
    })
})

