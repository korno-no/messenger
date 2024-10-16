
import { Button } from "../../components"
import { BlockProps } from "../../core/block";
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
        
        const ButtonLogin = new Button({
            type: 'primary',
            text: 'login',
            modificator: '',
            onClick: (e: Event) => {
                e.preventDefault();
                console.log('button click');
            }
        }); 
        this.children = {
            ...this.children,
            ButtonLogin,
        }
        this.name = 'LoginPage'

    } 

    render(): string {
        return (`
          <div>{{{ButtonLogin}}}</div>
        `)
    }
}
