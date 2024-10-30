import Block from "../../core/block";
import { BlockProps } from "../../core/block";


interface IButtonProps extends BlockProps  {
    mode?: "primary" | "link" | "secondary";
    type?: "submit" | "text";
    text?: string;
    modificator?: string;
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
        return (`<button class="button button_{{mode}} button_{{mode}}_{{modificator}}" type="{{type}}">
                    {{#if (eq modificator 'arrow-right')}}
                        <img class="svg" src="./assets/icons/arrow-right.svg" alt="arror right">
                    {{/if}}
                    {{#if (eq modificator 'arrow-left')}}
                        <img class="svg" src="./assets/icons/arrow-left.svg" alt="arror left">
                    {{/if}}
                    {{text}}
                </button>
            `)
    }
};
export default Button;
