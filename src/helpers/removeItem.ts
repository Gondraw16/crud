import { mainContainer, selectAll, tableTools } from './querySelectors';
import { getUsers } from './getUsers';
import { isDelete } from '../API/API';
import { addLoader } from './addLoader';
import { confirm } from '../views/confirm';
import { multiplesItemsButton } from '../views/button';
import { FnVoid } from '../interfaces/interfaces';
import { params } from './params';

interface Select {
    (e:Event):void;
}

interface OnRemove {
    (e:Event, opt:boolean):void;
}

export interface Item {
    id:string;
}

interface IsConfirm {
    (confirm:boolean, isDelete:boolean):Promise<void>;
}

interface GetConfirm {
    (opt:boolean):void;
}

interface ExistBtn  {
    (): {
        existingRemoveButton: HTMLButtonElement | null | undefined;
        existingRestoreButton: HTMLButtonElement | null | undefined;
    }
}

let items:Item[]|[] = [];

const isConfirm:IsConfirm = async (confirmed:boolean, opt:boolean):Promise<void> => {
    
    if (confirmed) {

        const modal:HTMLDivElement = document.createElement('div');
        modal.classList.add('modal');
        addLoader(modal);

        mainContainer?.appendChild(modal);
        const result:boolean|undefined = await isDelete(items, opt);

        if(result) {
            mainContainer?.removeChild(modal);
            getUsers();
            tableTools?.removeChild(tableTools.children[2]);
            if(selectAll)selectAll.checked = false;
        };
    } 
}

export const getConfirm:GetConfirm = (opt:boolean):void => {
    confirm(items.length === 1 && opt
            ?'Are you sure you want to delete this item?'
            : items.length === 1 && !opt 
            ? 'Are you sure you want to restore this item?'
            : items.length > 0 && opt 
            ? 'Are you sure you want to delete this items?'
            : items.length > 0 && !opt ? 're you sure you want to restore this items':'', mainContainer)


    .then( (confirmed:boolean):Promise<void> => isConfirm(confirmed, opt))
    .catch((error:Error):void => console.log(error));
}

export const existBtn:ExistBtn = ():{ existingRemoveButton:HTMLButtonElement|null|undefined, existingRestoreButton:HTMLButtonElement|null|undefined } => {
    const existingRemoveButton:HTMLButtonElement|null|undefined = tableTools?.querySelector('#all-remove-btn');
    const existingRestoreButton:HTMLButtonElement|null|undefined = tableTools?.querySelector('#all-restore-btn');
    return { existingRemoveButton, existingRestoreButton };
};

const showBtn: FnVoid = (): void => {

    const page = params().page;

    const { existingRemoveButton, existingRestoreButton } = existBtn(); 

    const remove:HTMLButtonElement|null = multiplesItemsButton('remove');
    const restore:HTMLButtonElement|null = multiplesItemsButton('restore');

    if (tableTools && items.length > 0) {

        if (page === 'home' || page === null || page === 'chosen') {
            existingRestoreButton?.remove();
            if (!existingRemoveButton && remove) {
                remove.onclick = () => getConfirm(true);
                tableTools.appendChild(remove);
            };

        } else if (page === 'duster') {
            existingRemoveButton?.remove(); 
            if (!existingRestoreButton && restore) {
                restore.onclick= () => getConfirm(false);
                tableTools.appendChild(restore);
            };
        }
    } else {
        existingRemoveButton?.remove();
        existingRestoreButton?.remove();
    }
};

export const onRemove:OnRemove = (event:Event, opt:boolean):void => {
    
    items = [];

    const target:HTMLInputElement = event.target as HTMLInputElement;
    const grid:HTMLDivElement = target.parentElement?.parentElement as HTMLDivElement;
    const id:string|undefined = grid.dataset.id;

    if(id) items = [{id}];

    if(items.length > 0) getConfirm(opt);

}

export const selectItem:Select = (event:Event):void => {

    const target:HTMLInputElement = event.target as HTMLInputElement;

    const grid:HTMLDivElement = target.parentElement?.parentElement as HTMLDivElement;
    const id:string|undefined = grid.dataset.id;

    if(!target.checked) {
        items = items.filter( (item:Item):boolean => item.id !== id );
        showBtn();
    } else {
        if(id) items = [...items, { id }];
        showBtn();
    }
    
}

export const selectAllItems:Select = ():void => {

    const allCheckbox:NodeListOf<HTMLInputElement> = document.querySelectorAll('.item-container-grid input[type="checkbox"]');

    allCheckbox.forEach( (input:HTMLInputElement):void => {

        const grid:HTMLDivElement = input.parentElement?.parentElement as HTMLDivElement;
        const id:string|undefined = grid.dataset.id;

        if(selectAll?.checked) {
            input.checked = true;
            if(id) items = [...items,  { id }];
            showBtn();
        } else {
            input.checked = false;
            items = [];
            showBtn();
        }

    });
}
