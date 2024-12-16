import { addLoader } from '../helpers/addLoader';
import { openItem } from '../helpers/openItem';
import { selectItem } from '../helpers/removeItem';
import { verifyChosenButton } from '../helpers/verifyChosenButton';
import { User } from '../interfaces/interfaces';
import { toolsButton } from './button';
import { Item } from './create';
         
interface Render {
    (container: HTMLElement | HTMLDivElement | null): {
        renderAllUsers: RenderAllUser;
        renderOpenItem: RenderOpenItem;
    }
}

interface RenderAllUser {
    (items: Item[]): void;
}

interface RenderOpenItem {
    (items:User[]):void;
}

export const render:Render = (container:HTMLElement|HTMLDivElement|null):{renderAllUsers: RenderAllUser, renderOpenItem:  RenderOpenItem} => {

    const renderAllUsers:RenderAllUser = (items:Item[]):void => {

        items.forEach( (item:Item):void => {

            const { grid, optContainer, infoContainer, toolsContainer, date, ...res } = item;

            res.checkbox.onchange = (e:Event):void => selectItem(e);

            infoContainer.onclick = ():Promise<void> => openItem(`${res.id}`);

            optContainer.appendChild(res.checkbox);

            infoContainer.appendChild(res.username);
            infoContainer.appendChild(res.msg);
            if(res.isNewItem !== '') infoContainer.appendChild(res.isNewItem);
            
            if(!res.isDelete){
                toolsContainer.appendChild(toolsButton('edit'));
                toolsContainer.appendChild(toolsButton('remove'));
            } else {
                toolsContainer.appendChild(toolsButton('restore'))
            }

            grid.appendChild(optContainer);
            grid.appendChild(infoContainer);
            grid.appendChild(date);
            grid.appendChild(toolsContainer);
            
            if(container) {
                container.appendChild(grid);
                verifyChosenButton();
            }

        });
        
    }

    const renderOpenItem = (user:User[]):void => {

        const { name, email, gender, message, ...res} = user[0];


        if(container){
            container.innerHTML = `
                <div class="data-container">
                    <h1 class="username">${name}</h1>
                    <h2>${email}</h2>
                    <h2>${gender}</h2>
                    <h3>${message}</h3>
                    <h3>${res.birthdate}</h3>
                </div>
            
            `;
        }

    
    }

    return {
        renderAllUsers,
        renderOpenItem
    }

}
