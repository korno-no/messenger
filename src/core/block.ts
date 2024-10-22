import EventBus from "./event-bus";
import Handlebars from "handlebars";
import { v4 as makeUUID } from 'uuid';

type TEvents = Values<typeof Block.EVENTS>
type PropsWithChildren<T> = T & { [key: string]: any };


type Events = {
    [key in keyof HTMLElementEventMap]?: (
        event: HTMLElementEventMap[key],
    ) => void;
};

export type BlockProps = {
    [key: string]: unknown;
    events?: Events;
};

export default class Block<T extends BlockProps = BlockProps> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement | null = null;
    _meta = null;
    _id: string;
    children;
    name: string;

    //private _eventbus;
    protected props: T;
    private eventBus: () => EventBus<TEvents>;

    constructor(propsWithChildren: PropsWithChildren<T>) {
        const eventBus = new EventBus<TEvents>();//init eventBus
        const { props, children } = this._getChildrenAndProps(propsWithChildren); //pars children and props

        //create a proxy that allows events to be triggered
        this._id = makeUUID();
        this.props = this._makePropsProxy({ ...props, __id: this._id });
        this.children = children;

        this.name = '';
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);//init component
    }



    //live sicle of components 
    _registerEvents(eventBus: EventBus<TEvents>) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this)); // initialization
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this)); // when props have been updeted
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER); // call render method
    }

    // abstract method
    init() { }

    _componentDidMount() {
        //this.componentDidMount();

        Object.values(this.children).forEach((child: any) => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount(oldProps: T) {

    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: T, newProps: T) {
        console.log('CDU')
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: T, newProps: T) {
        return true;
    }

    _getChildrenAndProps(propsAndChildren: PropsWithChildren<T>) {
        const children: Record<string, Block<any>> = {};
        const props: Partial<T> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key as keyof T] = value as T[keyof T];
            }
        });

        return { children, props };
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        console.log('render')
        const templateString: string = this.render();// get template of component as string
        this.compile(templateString, { ...this.props })
        this._removeEvents();
        this._addEvents();
    }

    render(): string {
        return "";
    }

    getContent() {
        // Хак, чтобы вызвать CDM только после добавления в DOM
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this._element;
    }

    _makePropsProxy(props: Partial<T>): T {
        // TODO change it into arrow function
        const self = this;

        return new Proxy(props as T, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: T, prop: string, value) {
                const oldTarget = { ...target };
                (target as any)[prop] = value; // Use type assertion to bypass TypeScript's restriction

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName);
        if (this._id !== null) {
            element.setAttribute('data-id', this._id);
        }
        return element;
    }

    _addEvents() {
        const { events = {} } = this.props;
        (Object.keys(events) as (keyof HTMLElementEventMap)[]).forEach(eventName => {
            this._element!.addEventListener(eventName, events[eventName] as EventListener);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props;
        (Object.keys(events) as (keyof HTMLElementEventMap)[]).forEach((event) => {
            this._element!.removeEventListener(event, events[event] as EventListener);
        });
    }
    compile(templateString: string, props: any) {

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement; // Cast to HTMLTemplateElement
        const propsAndStubs: { [key: string]: any } = { ...props };// copy props 
        const compiledTemplate = Handlebars.compile(templateString);

        fragment.innerHTML = compiledTemplate(propsAndStubs);// looks like insert values

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });

        fragment.innerHTML = Handlebars.compile(templateString)(propsAndStubs);//insert stub
        const newElement = fragment.content.firstElementChild as HTMLElement;

        Object.values(this.children).forEach(child => { //switch stubs back to html element
            const content = child.getContent();
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (content && stub) {
                stub.replaceWith(content);
            }
        });
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}