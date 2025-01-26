export const data = {
    required: "* Обязательное поле",
    errors: {
        validName: "Используйте только буквы",
        validEmail: "Введите корректный адрес почты",
        validPhone: "Введите корректный номер телефона",
        validNumbers: "Используйте только цифры",
        passwordTooShort: "Минимум 8 символов",
        passwordMissingLowercase: "Хотя бы одна строчная буква",
        passwordMissingUppercase: "Хотя бы одна заглавная буква",
        passwordMissingDigit: "Хотя бы одна цифра"
    }
}

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const textRegex = /^[а-яА-ЯёЁ\s]+$|^[a-zA-Z\s]+$/;
export const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
export const numberRegex = /^[0-9]+$/;

type ValidateResult = string | boolean | Promise<string | boolean>;

export const validatePassword = (password: string): ValidateResult => {
    if (!password) {
        return 'Обязательное поле';
    }
    if (password.length < 8) {
        return 'Минимум 8 символов';
    }
    if (!/[a-z]/.test(password)) {
        return 'Хотя бы одна строчная буква';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Хотя бы одна заглавная буква';
    }
    if (!/\d/.test(password)) {
        return 'Хотя бы одна цифра';
    }
    return true; 
};