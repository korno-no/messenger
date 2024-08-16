import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';


const pages = {
  'login': [ Pages.LoginPage ],
  'nav': [ Pages.NavigatePage ],
  'registration': [ Pages.RegistrationPage ],
  'messenger': [ Pages.MessengerPage ],
  'profile': [ Pages.ProfilePage ],
  '404': [ Pages.ErrorPage ],
  '500': [ Pages.ErrorFixingPage ],
  'modals': [ Pages.ModalsPage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
}); 

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});



Handlebars.registerHelper('eq', function(arg1, arg2) {
  return arg1 === arg2;
});