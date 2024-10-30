import Block from "../../core/block";
import { BlockProps } from "../../core/block";
import { Button } from "../../components"



interface ICoverScreenProps extends BlockProps  {
    code: 500 | 404;
    text: string;
    background: string;
    events?: { [key: string]: EventListenerOrEventListenerObject };
    onClick?: (event: Event) => void;
}

export default class CoverScreen extends Block<ICoverScreenProps>{
    constructor(props: ICoverScreenProps) {
        super({
            ...props,
            events: {
                click: props.onClick ?? (() => {}) 
            }
        })
       
        
    }
    init(){
       const BackButton = new Button({ mode:"link", text:"back to chat"})
       
       this.children = {
        ...this.children,
        BackButton
    };    
}

    render(): string {
        return (`
            <div>
                <img class="cover-screen_image" src="{{background}}" alt="">
                <div class="cover-screen">
                    <div class="cover-screen_content">
                        <h1>{{code}}</h1>
                        <p>{{text}}</p>
                        <div class="cover-screen_button">
                            {{{BackButton}}}
                        </div>
                    </div>
                </div>
            </div>
            `)
    }
};

