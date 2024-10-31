
import { Button } from "../../components"
import { Input } from "../../components"
import { InputWrapper } from "../../components"
import { BlockProps } from "../../core/block";
import Block from "../../core/block"
import Validation from "../../utils/validation";

 interface ILoginProps extends BlockProps  {
    title: string;
    settings: {withInternalID: true},
    onClick?: (event: Event) => void;
    events?: { [key: string]: EventListenerOrEventListenerObject };
}
 
export default class LoginPage extends Block <ILoginProps>{
    constructor(props: ILoginProps) {
        super({
            ...props,
            title: "Login Page"
        })
    }
    init(){
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
        const ButtonSignIn= new Button({mode: 'primary',text: 'Sign in', type:'submit' ,settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
                this.onSignIn()
            }
        });
        const ButtonSignUp = new Button({mode: 'link',text: 'Sign up', settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
                this.onSignUp()
            }
        });
        this.children = {
            ...this.children,
            LoginInput,
            PasswordInput,
            ButtonSignIn,
            ButtonSignUp
        };
    }

    onSignIn() {
        console.log("we clicked onSignIn")
        let inputsCollection = document.querySelectorAll('input');
        let filledValues: {[key: string]: string} = {};
        inputsCollection.forEach( input => {
            filledValues[input.id] = input.value
            if (input.id && input.id !== '/') {
                const error = !Validation.validate(input.value, input.name);
                //TODO: add check if error have been changed
                this.children[input.id].setProps({ error });
            }
        })
        console.log(filledValues)

    }
    onSignUp(){
        console.log("we clicked onSignUp")
    }
    
    render(): string {
        return (`
            <div class="wrapper">
                    <div class="modal">
                        <h1 class="wrapper_title">{{title}}</h1>
                        <form class="login_form">
                            {{{LoginInput}}}
                            {{{PasswordInput}}}
                            {{{ButtonSignIn}}}
                        </form>
                        {{{ButtonSignUp}}}
                </div>
            </div>
        `)
    }
}
