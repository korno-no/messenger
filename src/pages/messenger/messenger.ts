
import { Button } from "../../components"
import { Input } from "../../components"
import { InputWrapper } from "../../components"
import { ContactCard} from "../../components";
import { Message} from "../../components";
import { BlockProps } from "../../core/block";
import Block from "../../core/block"
import Validation from "../../utils/validation";



import ava1 from '../../assets/images/ava1.jpeg'
import ava2 from '../../assets/images/ava2.jpeg'
import ava3 from '../../assets/images/ava3.jpeg'
import ava4 from '../../assets/images/ava4.jpeg'
import ava5 from '../../assets/images/ava5.jpg'
import ava6 from '../../assets/images/ava6.jpeg'
import ava7 from '../../assets/images/ava7.jpeg'
import ava8 from '../../assets/images/ava8.jpeg'



interface IMessengerProps extends BlockProps  {
    title: string;
    contactCards: ContactCard[];
    settings: {withInternalID: true},
    onClick?: (event: Event) => void;
    events?: { [key: string]: EventListenerOrEventListenerObject };
}
 
export default class MessengerPage extends Block <IMessengerProps>{
    constructor(props: IMessengerProps) {
        super({
            ...props,
            title: "Messenger Page"
        })
    }
    init(){

        const ProfileButton = new Button({type:"text",text: 'profile >', modificator:"pull-right", settings: {withInternalID: true},
            onClick: (e: Event) => {
                e.preventDefault();
                console.log("ProfileButton have been pressed");
            }
        });

        const SearchInput= new InputWrapper({
            type:'search', 
            name: "search", 
            label: "search", 
            error: false, 
            settings: {withInternalID: true},
            Input: new Input({
                type:'search', 
                name: "search", 
                label: "search", 
                id: 'SearchInput',
                settings: {withInternalID: true},
                
            }),
        });

        const ContactCards = [
            new ContactCard({name: 'Aaron', message:'Image',sender: 0, isRead:false, amount:2, date: '10:49', active: false, avatar: ava1,settings: {withInternalID: true}}),
            new ContactCard({name: 'מועדון קולנוע',message: 'stiker',sender: 1,isRead: true,amount: 0,date: '12:00',active: false,avatar: ava8,settings: { withInternalID: true }}),
            new ContactCard({name: 'Eliezer',message: 'Friends, I have a special news release for you! Tomorrow we f...',sender: 0,isRead: true,amount: 4,date: '15:12',active: false,avatar: ava2,settings: { withInternalID: true }}),
            new ContactCard({name: 'Vadim',message: 'coll!',sender: 1,isRead: false,amount: 0,date: '15:12',active: true,avatar: ava3,settings: { withInternalID: true }}),
            new ContactCard({name: 'Shhhhhh',message: 'Human Interface Guidelines and Material Design my recommendation...',sender: 0,isRead: true,amount: 0,date: 'We',active: false,avatar: ava4,settings: { withInternalID: true }}),
            new ContactCard({name: '1, 2, 3',message: 'Millions of Russians spend dozens of hours every day...',sender: 0,isRead: true,amount: 0,date: 'Mn',active: false,avatar: ava5,settings: { withInternalID: true }}),
            new ContactCard({name: 'Design Destroyer',message: 'In 2008, artist Jon Rafman began collecting unique elements...',sender: 0,isRead: true,amount: 0,date: '1 July 2024',active: false,avatar: ava6,settings: { withInternalID: true }}),
            new ContactCard({ name: 'Stas Ragozin', message: 'Можно или сегодня или завтра вечером.', sender: 0, isRead: true, amount: 0, date: '12 May 2024', active: false, avatar: ava7, settings: { withInternalID: true }}) 
        ]

        const Messages = [
            new Message({type:"text", direction:"incoming", time:"11:35", text:`shalom,
                question: i you could be any character from Futurama who would you pick?
                For me, I'dtotally choose Fry. I mean, waking up in the future and discovering all the crazy stuff that’s happened, plus all the wild adventures with Bender and Leela? That’d be epic! Plus, Fry’s got that laid-back vibe and gets to experience the future firsthand. 🍕🚀`}),
            new Message({type:"image", direction:"incoming", time:"11:36", text:"./assets/images/message.jpg"}),
            new Message({type:"text", direction:"outgoing", time:"12:00", text:"Futurama?!?!"}),
            new Message({type:"text", direction:"outgoing", time:"12:00", text:"dude"}),
            new Message({type:"text", direction:"outgoing", time:"12:00", text:"I'm an X-Men fan"})
        ]

        const MessageInput = new Input({type:"message", name: 'message', label: '',modificator:'bottom',
        })
        const SendButton = new Button({ text:"", mode:"secondary", modificator: "arrow-right", 
            onClick: (e: Event) => {
                e.preventDefault();
                console.log("Send mesage button have been pressed");
        
                let messageInput = document.querySelector('.input_field_message') as HTMLInputElement;
                if(messageInput){
                    const error = !Validation.validate(messageInput.value, "message");
                    if(error) console.log('ooops, input is empty, we cant send empty message')
                    else{
                        console.log({messageInput:messageInput.value} );
                    }    
                }
                // MessageInput.setProps({ error });
            }
        })

        this.children = {
            ...this.children,
            ProfileButton,
            SearchInput,
            MessageInput,
            SendButton
        };
        
        this.lists = {
            ...this.lists,
            ContactCards,
            Messages
        }
    }
    
    render(): string {
        return (`
            <div class="messenger">
                <aside class="messenger_asside asside">
                    <div class="asside_header">
                        {{{ProfileButton}}}
                        {{{SearchInput}}}
                    </div>
                    <div class="asside_list list">
                        {{{ContactCards}}}
                    </div>
                </aside>
                <main class="messenger_main conversation">
                    <div class="conversation_contact ">
                        <img src="./assets/images/ava3.jpeg" alt="" class="conversation_avatar avatar">
                        Vadim
                        <img src="./assets/icons/add-info.svg"/ alt="additional information" class="conversation_add-info svg">
                    </div>

                    <div class="conversation_chat chat">
                    <div class="chat_date">19 June</div>
                        {{{Messages}}}
                    </div>

                    <div class="conversation_bottom bottom">
                        <img class="bottom_clip svg" alt="clip" src="./assets/icons/clip.svg"/ >
                        {{{MessageInput}}}
                        {{{SendButton}}}
                        
                    </div>

                </main>
            </div>
        `)
    }
}

