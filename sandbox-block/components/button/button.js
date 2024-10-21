import Block from "../../core/block";
import Handlebars from "handlebars";


class Button extends Block {
    constructor(props) {
        //wraper for DOM
        super("button", props);
    }

    render() {
        const { text } = this.props;
        const source = "<div>{{text}}</div>";
        const template = Handlebars.compile(source);
        return template({ text });
    }
}

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const button = new Button({
    text: 'Click me',
    settings: { withInternalID: true },
    events: {
        // Name like addEventListener: click, mouseEnter, ...
        click: event => {
            console.log(event);
        },
    }
});

// app — это class дива в корне DOM
render(".app", button);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    button.setProps({
        text: 'Click me, please',
        events: {
            click: event => {
                console.log('!!!! new click event !!!!');
            },
        }

    });
}, 10000);

export default Button;