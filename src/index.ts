import './styles/styles.css';
import '../public/icons/style.css';
import { getUsers } from './helpers/getUsers';
import { addEventListener } from './helpers/eventListeners';

document.addEventListener('DOMContentLoaded', ():void => {
    getUsers();
    addEventListener();
});