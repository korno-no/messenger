import Block from "../../core/block";
import { BlockProps } from "../../core/block";


interface IButtonProps extends BlockProps  {
    type: "primary" | "link";
    text: string;
    modificator: string;
    onClick?: (e: Event) => void;
    events?: { [key: string]: EventListenerOrEventListenerObject };
}

class Button extends Block<IButtonProps>{
    constructor(props: IButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick ?? (() => {}) 
            }
        })
    }

    render(): string {
        return (`<button class="button button_{{type}} button_{{type}}_{{modificator}}">   
                {{text}}
            </button>
            `)
    }
};
export default Button;
