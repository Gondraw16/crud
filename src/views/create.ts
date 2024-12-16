import { Gender, User } from '../interfaces/interfaces';

export interface Item {
    id:number,
    grid: HTMLDivElement;
    optContainer: HTMLDivElement;
    checkbox: HTMLInputElement;
    infoContainer: HTMLDivElement;
    username:HTMLParagraphElement;
    msg:HTMLSpanElement;
    isNewItem:HTMLSpanElement|'';
    date:HTMLSpanElement;
    mail:HTMLParagraphElement;
    pGender:HTMLParagraphElement;
    toolsContainer:HTMLDivElement;
    isDelete: boolean;
}

interface Create {
    (users: User[]):Item[] 
}

export const createItems:Create = (users:User[]):Item[] => {

    return users.map( (user:User):Item => {

        const { id, name, message, birthdate, email, gender, isOpen,  isDelete } = user;
         
        const grid:HTMLDivElement = document.createElement('div');
        grid.classList.add('item-container-grid');
        grid.setAttribute('data-id', `${id}`);
    
        const optContainer:HTMLDivElement = document.createElement('div');
        optContainer.classList.add('options-container-grid');
    
        const checkbox:HTMLInputElement = document.createElement('input');
        checkbox.type = 'checkbox';
        
        const infoContainer:HTMLDivElement = document.createElement('div');
        infoContainer.classList.add('information-container-grid');

        const username:HTMLParagraphElement = document.createElement('p');
        username.classList.add('username');
        username.textContent = name.trim();

        const msg:HTMLSpanElement = document.createElement('span');
        msg.classList.add('message');
        msg.innerHTML = `<strong>New registered user</strong> <p class="message-data">${message.trim()}</p>`;
        
        const isNewItem:HTMLSpanElement = document.createElement('span');
        isNewItem.classList.add('message-type', 'green');
        isNewItem.textContent = 'New';

        const date:HTMLSpanElement = document.createElement('span');   
        date.classList.add('message-date');
        date.textContent= `${birthdate}`;

        const mail:HTMLParagraphElement = document.createElement('p');
        mail.classList.add('user-mail');
        mail.textContent = email.trim().toLowerCase();

        const pGender = document.createElement('p');
        pGender.classList.add('user-gender');
        pGender.textContent = gender.trim();

        const toolsContainer:HTMLDivElement = document.createElement('div');
        toolsContainer.classList.add('grid-container-tools');

        return {
            id,
            grid,
            optContainer,
            checkbox,
            infoContainer,
            username,
            msg,
            isNewItem: !isOpen ? isNewItem : '', 
            date,
            mail,
            pGender,
            toolsContainer,
            isDelete
        };
    });

}