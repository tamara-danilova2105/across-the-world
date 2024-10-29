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

export const validatePassword = (password: string) => {
    if (!password) {
        return data.required;
    }
    if (password.length < 8) {
        return data.errors.passwordTooShort;
    }
    if (!/[a-z]/.test(password)) {
        return data.errors.passwordMissingLowercase;
    }
    if (!/[A-Z]/.test(password)) {
        return data.errors.passwordMissingUppercase;
    }
    if (!/\d/.test(password)) {
        return data.errors.passwordMissingDigit;
    }
    return null; 
};