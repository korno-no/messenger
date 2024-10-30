export default class Validation {
    static validate(value: string, type: string): boolean{
        switch(type){
            case "second_name":
            case "first_name":
                const nameRegex = /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/;
                return nameRegex.test(value);
            case "login":
                const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
                return loginRegex.test(value);
            case "email":
                const mailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
                return mailRegex.test(value);
            case "password":
            case "password_confirm":
                const passwordRefex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
                return passwordRefex.test(value);
            case "phone":
                const phoneRefex = /^\+?\d{10,15}$/;
                return phoneRefex.test(value);
            case "message":
                return value !== '';
            default:
                return true;
                
        }
    }
}
