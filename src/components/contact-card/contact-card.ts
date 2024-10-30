import './contact-card.css';
//import Handlebars from 'handlebars';

import { BlockProps } from "../../core/block";
import Block from "../../core/block"

interface IContactCardProps extends BlockProps {
    name: string,
    message: string,
    sender: number,
    isRead: boolean,
    amount: number,
    date: string,
    active: boolean,
    avatar: string
    settings: {withInternalID: true},
    onClick?: (event: Event) => void;
    events?: { [key: string]: EventListenerOrEventListenerObject };
}

export default class ContactCard extends Block <IContactCardProps>{
    constructor(props: IContactCardProps) {
        super({
            ...props,
            title: "Messenger Page"
        })
    }

    render(): string {
        return (`<div class="contact-card contact-card_{{active}}">
                    <img src={{avatar}} alt="Avatar" class="contact-card_avatar avatar">
                    <div class="contact-card_info">
                        <div class="contact-card_1-line">
                            <div class="contact-card_name">  {{name}}</div>
                            <div class="contact-card_date">{{date}}</div>
                        </div>
                        <div class="contact-card_2-line">

                            <div class="contact-card_message"> 
                                {{#if sender}}
                                    Me:
                                {{/if}}
                                {{message}}
                            </div>
                            {{#if amount}}
                                <div class="contact-card_amount">
                                    <div class="contact-card_amount-back">{{amount}}</div>
                                </div>
                            {{/if}}
                        </div>
                    </div>
                </div>
            `)
    }
  
}

