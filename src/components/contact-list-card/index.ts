import './contact-list-card.css';
import Handlebars from 'handlebars';
import ava1 from '../../assets/images/ava1.jpeg'
import ava2 from '../../assets/images/ava2.jpeg'
import ava3 from '../../assets/images/ava3.jpeg'
import ava4 from '../../assets/images/ava4.jpeg'
import ava5 from '../../assets/images/ava5.jpg'
import ava6 from '../../assets/images/ava6.jpeg'
import ava7 from '../../assets/images/ava7.jpeg'
import ava8 from '../../assets/images/ava8.jpeg'


export { default as ContactListCard } from './contact-list-card.hbs?raw';

class ContactCard{
    
    constructor(   
        public name: string,
        public message: string,
        public sender: number,
        public isRead: boolean,
        public amount: number,
        public date: string,
        public active: boolean,
        public avatar: string
        
    ){}
}

//new ContactCard('name', 'message', sender 0/1, isRead, amount, 'date', 'time',active)
Handlebars.registerHelper('contacts', () => {
    return [
        new ContactCard('Aaron', 'Image', 0, false,2, '10:49', false, ava1),
        new ContactCard('מועדון קולנוע', 'stiker', 1, true, 0, '12:00', false, ava8),
        new ContactCard('Eliezer', 'Friends, I have a special news release for you! Tommorow we f...', 0, true, 4, '15:12', false, ava2),
        new ContactCard('Vadim', 'coll!', 1, false, 0, '15:12', true, ava3),
        new ContactCard('Shhhhhh', 'Human Interface Guidelines and Material Design my recome...', 0, true, 0, 'We', false, ava4),
        new ContactCard('1, 2, 3', 'Millions of Russians spend dozens of hours every day...', 0, true, 0, 'Mn', false, ava5),
        new ContactCard('Design Destroyer', 'In 2008, artist Jon Rafman began collecting unique elements...', 0, true, 0, '1 July 2024', false, ava6),
        new ContactCard('Stas Ragozin', 'Можно или сегодня или завтра вечером.', 0, true, 0, '12 May 2024', false, ava7),

       
    ]
})
