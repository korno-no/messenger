
import { Button } from "../../components"
import { BlockProps } from "../../core/block";
import { ModalWrapper } from "../../wrappers/modal-wrapper"
import Block from "../../core/block"


 interface ILoginProps extends BlockProps  {
    onClick?: () => void;
    events?: { [key: string]: EventListenerOrEventListenerObject };
}
 
export default class LoginPage extends Block{
   
    constructor(props: ILoginProps) {
        super({
            ...props,
        })
    }
     init(){
        const Modal = new ModalWrapper({
            title: 'test modal',
            settings: {withInternalID: true},

        })
       /*  const ButtonLogin = new Button({
            type: 'primary',
            text: 'login',
            modificator: '',
            settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
                console.log('button click');
            }
        });  */
        this.children = {
            Modal,
            ...this.children,
           // ButtonLogin,
        }
        this.name = 'LoginPage'

    } 

    render(): string {
        return (`
            {{{Modal}}}
         
        `)
        // <div>{{{ButtonLogin}}}</div>
    }
}
