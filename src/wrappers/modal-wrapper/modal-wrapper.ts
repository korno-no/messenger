import Block from "../../core/block";
import { BlockProps } from "../../core/block";
class ModalWrapper extends Block{
    constructor(props: BlockProps) {
        super({
            ...props
        });
        this.name = 'ModalWrapper'
    }
    render(): string {
        return (`<div class="wrapper">
                    <div class="modal">
                        <h1 class="wrapper_title">{{title}}</h1>
                        aaaa
                    </div>
                </div>
            `)
    }
};
export default ModalWrapper;

