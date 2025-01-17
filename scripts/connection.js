const form = document.querySelector('.contacts__form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const successMessage = document.querySelector('.contacts__form-fly')

const inputs = {
    name: document.querySelector('#name'),
    email: document.querySelector('#email'),
    message: document.querySelector('#message'),
}

const debounce = (func, wait) => { 
    let timeout; 
    return (...args) => { 
        clearTimeout(timeout); 
        timeout = setTimeout(() => func.apply(this, args), wait); 
    }; 
};

const validateInput = (input) => {
    const errorElement = document.querySelector(`.contacts__form-${input.name}_error`);
    errorElement.textContent = ''; 
    input.classList.remove('contacts__form-field_error');
    errorElement.classList.remove('show') 
    let isValid = true;

    if (input.name === 'email'){ 
        if (input.value.trim() === ''){ 
            showError(input, errorElement, 'Введите ваш email!'); 
            isValid = false;
        }else if (!/\S+@\S+\.\S+/.test(input.value)){ 
            showError(input, errorElement, 'Введите корректный email!'); 
            isValid = false; 
        }
    } else if (input.name === 'name' && input.value.trim() === ''){ 
        showError(input, errorElement, `Введите ваше имя!`);
        isValid = false;
    }

    return isValid;
}; 

const showError = (input, errorElement, message) =>{ 
    errorElement.textContent = message;
    errorElement.classList.add('show')
    input.classList.add('contacts__form-field_error'); 
};

const  handleSuccess = (result) => {
    Object.values(inputs).forEach(input => input.value = '');
    successMessage.style.display = 'block';
    setTimeout(() => { successMessage.style.display = 'none'; }, 1000);
    console.log(result)
};

const sendDataToServer = async (data) =>{ 
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts',{ 
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: { 
                'Content-type': 'application/json; charset=UTF-8' 
            } 
        })

        if (!response.ok) { 
            throw new Error('Ошибка сети');
        }

        const result = await response.json()
        handleSuccess(result)
    } catch (error) { 
        throw new Error('Ошибка:' + error);
    }
};

Object.values(inputs).forEach(input => {
    input.addEventListener('input', debounce(() => validateInput(input), 1000)); 
});

form.addEventListener('submit', (event) => { 
    event.preventDefault(); 
    let formIsValid = true; 
    Object.values(inputs).forEach(input =>{ 
        if (!validateInput(input)) { 
            formIsValid = false; 
        }
    }); 
    if (formIsValid) {
        const data = { 
            name: inputs.name.value,
            email: inputs.email.value,
            message: inputs.message.value 
        }; 
        sendDataToServer(data); 
    } 
});
