import { Button } from "../../components"
import { Input } from "../../components"
import { InputWrapper } from "../../components"
import { BlockProps } from "../../core/block";
import Validation from "../../utils/validation";
import Block from "../../core/block"



 interface IRegistrationProps extends BlockProps  {
    
}
 
export default class RegistrationPage extends Block <IRegistrationProps>{
    constructor(props: IRegistrationProps) {
        super({
            ...props,
            title: "Registration Page"
        })
        
    }
    init(){
        const EmailInput= new InputWrapper({
            type:'email', 
            name: "email", 
            label: "email", 
            error: false,
            settings: {withInternalID: true},
            Input: new Input({
                type:'email', 
                name: "email", 
                label: "email", 
                id: 'EmailInput',
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    EmailInput.setProps({ error: !Validation.validate(value, 'email') });                     
                }
            }),
        });
        const LoginInput= new InputWrapper({
            type:'text', 
            name: "login", 
            label: "login", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'text', 
                name: "login", 
                label: "login", 
                id: 'LoginInput',
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    LoginInput.setProps({ error: !Validation.validate(value, 'login') });      
                }
            }),
        });
        const FirstNameInput= new InputWrapper({
            type:'text', 
            name: "first_name", 
            label: "first name", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'text', 
                name: "first_name", 
                label: "first name",
                id: 'FirstNameInput', 
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    FirstNameInput.setProps({ error: !Validation.validate(value, 'first_name') });      
                }
            }),
        });
        const SecondNameInput= new InputWrapper({
            type:'text', 
            name: "second_name", 
            label: "second name", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'text', 
                name: "second_name", 
                label: "second name", 
                settings: {withInternalID: true},
                id:'SecondNameInput',
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    SecondNameInput.setProps({ error: !Validation.validate(value, 'second_name') });      
                }
            }),
        });
        const PhoneInput= new InputWrapper({
            type:'', 
            name: "phone", 
            label: "phone", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'text', 
                name: "phone", 
                label: "phone", 
                id: "PhoneInput",
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    PhoneInput.setProps({ error: !Validation.validate(value, 'phone') });      
                }
            }),
        });
        const PasswordInput = new InputWrapper({
            type:'password', 
            name: "password", 
            label: "password", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'password', 
                name: "password", 
                label: "password", 
                id: "PasswordInput",
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    PasswordInput.setProps({ error: !Validation.validate(value, 'password') });       
                }
            }),
        });
        const PasswordConfirmInput = new InputWrapper({
            type:'password', 
            name: "password_confirm", 
            label: "password confirm", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'password', 
                name: "password_confirm", 
                label: "password confirm", 
                id: "PasswordConfirmInput",
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    PasswordConfirmInput.setProps({ error: !Validation.validate(value, 'password_confirm') });                     
                }
            }),
        });
        const ButtonSignUp = new Button({mode: 'primary', text: 'Sign up', settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
                this.onSignUp()
            }
        });
        const ButtonSignIn= new Button({mode: 'link', text: 'Sign in', settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
                this.onSignIn()
            }
        });
        

        this.children = {
            ...this.children,
                EmailInput,
                LoginInput,
                FirstNameInput,
                SecondNameInput,
                PhoneInput,
                PasswordInput,
                PasswordConfirmInput,
            ButtonSignIn,
            ButtonSignUp
        };
    
    }

    
    onSignUp(){
        console.log("we clicked onSignUp")
        let inputsCollection = document.querySelectorAll('input');
        inputsCollection.forEach( input => {
            console.log(`${input.id} value > ${input.value}`)
            if (input.id && input.id !== '/') {
                const error = !Validation.validate(input.value, input.name);
                //TODO: add check if error have been changed
                this.children[input.id].setProps({ error });
            }
        })
    }

    onSignIn() {
        console.log("we clicked onSignIn")
    }
    
    render(): string {
        return (`
            <div class="wrapper">
                    <div class="modal">
                        <h1 class="wrapper_title">{{title}}</h1>
                        <form class="registration_form">
                            {{{EmailInput}}}
                            {{{LoginInput}}}
                            {{{FirstNameInput}}}
                            {{{SecondNameInput}}}
                            {{{PhoneInput}}}
                            {{{PasswordInput}}}
                            {{{PasswordConfirmInput}}}
                            {{{ButtonSignUp}}}
                        </form>
                        {{{ButtonSignIn}}}
                </div>
            </div>
        `)
    }
}
