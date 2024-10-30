
import { Button } from "../../components"
import { Input } from "../../components"
import { InputWrapper } from "../../components"
import { BlockProps } from "../../core/block";
import Block from "../../core/block"
import Validation from "../../utils/validation";

 interface IProfileProps extends BlockProps  {
    title: string;
    settings: {withInternalID: true},
    onClick?: (event: Event) => void;
    events?: { [key: string]: EventListenerOrEventListenerObject };
}
 
export default class ProfilePage extends Block <IProfileProps>{
    constructor(props: IProfileProps) {
        super({
            ...props,
            title: "Profile Page"
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
                modificator: "wide",
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
                modificator: "wide",
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
                modificator: "wide",
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
                id:'SecondNameInput',
                modificator: "wide",
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    SecondNameInput.setProps({ error: !Validation.validate(value, 'second_name') });      
                }
            }),
        });
        const NicknameInput= new InputWrapper({
            type:'text', 
            name: "display_name", 
            label: "nickname", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'text', 
                name: "display_name", 
                label: "nickname", 
                modificator: "wide",
                settings: {withInternalID: true},
                id:'NicknameInput',
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    NicknameInput.setProps({ error: !Validation.validate(value, 'display_name') });      
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
                modificator: "wide",
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
                modificator: "wide",
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    PasswordInput.setProps({ error: !Validation.validate(value, 'password') });       
                }
            }),
        });
        
        const ChangeDataButton = new Button({mode: 'link',text: "change data", modificator:"wide", settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
                this.OnChangeData()
            }
        });
        const ChangePasswordButton = new Button({mode: 'link',text: "change password", modificator:"wide", settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
            }
        });


        const OldPasswordInput = new InputWrapper({
            type:'password', 
            name: "password", 
            label: "password", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'password', 
                name: "password", 
                label: "password", 
                id: "OldPasswordInput",
                modificator: "wide",
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    OldPasswordInput.setProps({ error: !Validation.validate(value, 'password') });       
                }
            }),
        });
        const NewPasswordInput = new InputWrapper({
            type:'password', 
            name: "password", 
            label: "password", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'password', 
                name: "password", 
                label: "password", 
                id: "NewPasswordInput",
                modificator: "wide",
                settings: {withInternalID: true},
                onBlur: (e: Event) =>{
                    const value = (e.target as HTMLInputElement).value;
                    NewPasswordInput.setProps({ error: !Validation.validate(value, 'password') });       
                }
            }),
        });

        const ExitButton= new Button({mode: "link",text:"exit", modificator: "dangerous", settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
            }
        });
        const BackButton = new Button({mode:"secondary", modificator:"arrow-left" ,settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
            }
        });
        this.children = {
            ...this.children,
            EmailInput,
            LoginInput,
            FirstNameInput,
            SecondNameInput,
            NicknameInput,
            PhoneInput,
            PasswordInput,
            ChangeDataButton,
            ChangePasswordButton,
            OldPasswordInput,
            NewPasswordInput,
            ExitButton,
            BackButton
        };
    }

    OnChangeData() {
        console.log("we clicked OnChangeData")
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

    
    render(): string {
        return (`
            <div class="profile">
            <aside class="profile_asside asside">
                 {{{BackButton}}}
            </aside>
            <main class="profile_main">
                <img class="profile_avatar avatar" alt="my avatar" src="./assets/images/profile.jpg"></img>
                <form class="profile_form">

                    {{{EmailInput}}}
                    {{{LoginInput}}}
                    {{{FirstNameInput}}}
                    {{{SecondNameInput}}}
                    {{{NicknameInput}}}
                    {{{PhoneInput}}}
                    {{{PasswordInput}}}

                    {{{ChangeDataButton}}}
                    {{{ChangePasswordButton}}}

                    {{{OldPasswordInput}}}
                    {{{NewPasswordInput}}}

                    {{{ExitButton}}}
                </form>
            </main>
        </div>

        `)
    }
}
