import Block from "../../core/block";
import { BlockProps } from "../../core/block";


interface IInputProps extends BlockProps  {
    label: string;
    name: string;
    type: string;
    modificator?:  string;
    onBlur?: (e: Event) => void;
    events?: { [key: string]: EventListenerOrEventListenerObject };
    id?: string,
}

class Input extends Block<IInputProps>{
    constructor(props: IInputProps) {
        super({
            ...props,
            events: {
                blur: props.onBlur ?? (() => {}) 
            }
        })
    }
    

    render(): string {
        return (`
                <input
                    class="input_field input_field_{{name}} input_field_{{modificator}}"
                    placeholder=""
                    name = {{name}}
                    type = {{type}}
                    id = {{id}}
                />
            `)
    }
};

export default Input;
