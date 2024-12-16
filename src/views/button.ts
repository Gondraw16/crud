import { chosen } from "../helpers/chosen";
import { pagination } from "../helpers/pagination";
import { getConfirm, onRemove } from "../helpers/removeItem";
import { verifyChosenButton } from "../helpers/verifyChosenButton";


interface LikeButton {
    (type:'add'|'remove'):HTMLButtonElement|HTMLParagraphElement;
}

interface ToolsButton {
    (type:'edit'|'remove'|'restore'):HTMLButtonElement|HTMLParagraphElement;
}

interface MultiplesItemsButton {
    (type:'remove'|'restore'):HTMLButtonElement|null;
}

interface PaginationArrowButton {
    (type:'left'|'right'|'start'|'end'):HTMLButtonElement|HTMLParagraphElement;
}

interface PaginationPagesButtons {
    (page:number):HTMLButtonElement|HTMLParagraphElement;
}

const errorMsg:HTMLParagraphElement = document.createElement('p');
errorMsg.classList.add('error-msg');
errorMsg.textContent = 'Invalid button type';

export const likeButton:LikeButton = (type:('add' | 'remove')):HTMLButtonElement|HTMLParagraphElement => {


    const isAdded = document.createElement('button');
    isAdded.classList.add('btn', 'btn-rounded');
    isAdded.innerHTML = `<i class="icon-star-full"></i>`
    isAdded.id = 'remove-button';

    isAdded.onclick = (e:Event):void => {
        chosen(e, 'remove');
        verifyChosenButton();
    }

    const notAdded = document.createElement('button');
    notAdded.classList.add('btn', 'btn-rounded');
    notAdded.innerHTML = `<i class="icon-star-empty"></i>`;
    notAdded.id = 'add-button';

    notAdded.onclick = (e:Event):void => {
        chosen(e, 'add');
        verifyChosenButton();
    };

        
    if(type === 'add') {
        return notAdded
    } else if(type = 'remove') {
        return isAdded
    } else {    
        return errorMsg;
    }

}

export const multiplesItemsButton:MultiplesItemsButton = (type:'remove'|'restore'):HTMLButtonElement|null => {

    const removeSelects = document.createElement('button');
    removeSelects.classList.add('btn', 'btn-rounded');
    removeSelects.innerHTML = `<i class="icon-bin2"></i>`;
    removeSelects.id = 'all-remove-btn';

    const restoreSelects  = document.createElement('button');
    restoreSelects.classList.add('btn', 'btn-rounded');
    restoreSelects.innerHTML = `<i class="icon-rotate-cw"></i>`;
    restoreSelects.id = 'all-restore-btn';

    if(type === 'remove') {
        return removeSelects;
    } else if(type === 'restore') {
        return restoreSelects;
    } else {
        return null
    }

}  

export const toolsButton:ToolsButton = (type:'edit'|'remove'|'restore'):HTMLButtonElement|HTMLParagraphElement => {
    
    const edit:HTMLButtonElement = document.createElement('button');
    edit.classList.add('btn', 'btn-rounded');
    edit.innerHTML = `<i class="icon-edit"></i>`;

    const bin:HTMLButtonElement = document.createElement('button');
    bin.classList.add('btn', 'btn-rounded');
    bin.innerHTML = `<i class="icon-bin"></i>`;

    const restore:HTMLButtonElement = document.createElement('button');
    restore.classList.add('btn', 'btn-rounded');
    restore.innerHTML = `<i class="icon-rotate-cw"></i>`;

    bin.onclick = (e:Event) => {
        onRemove(e, true);
    }

    restore.onclick = (e:Event) => {
        onRemove(e, false);
    }

    switch (type) {
        case 'edit':
        return edit;    
        
        case 'restore':
        return restore;

        case 'remove':
        return bin;

        default:    
        return errorMsg;
    }


}

export const paginationArrowsButtons:PaginationArrowButton = (type:'left'|'right'|'start'|'end'):HTMLButtonElement|HTMLParagraphElement =>  {
    
    const left:HTMLButtonElement = document.createElement('button');
    left.classList.add('btn', 'btn-rounded');
    left.id = 'pagination-previous-page';
    left.innerHTML = `<i class="icon-chevron-left"></i>`;

    const right:HTMLButtonElement = document.createElement('button');
    right.classList.add('btn', 'btn-rounded');
    right.id = 'pagination-next-page';
    right.innerHTML = `<i class="icon-chevron-right"></i>`;

    const start:HTMLButtonElement = document.createElement('button');
    start.classList.add('btn', 'btn-rounded');
    start.id = 'pagination-start-page';
    start.innerHTML  = `<i class="icon-chevrons-left"></i>`;

    const end:HTMLButtonElement = document.createElement('button');
    end.classList.add('btn', 'btn-rounded');
    end.id = 'pagination-end-page';
    end.innerHTML  = `<i class="icon-chevrons-right"></i>`;

    if(type === 'left') {
        return left;
    } else if(type === 'right') {
        return right;
    } else if(type === 'start') {
        return start;
    } else if(type === 'end') {
        return end;
    } else {
        return errorMsg;
    }

}

export const paginationPagesButtons:PaginationPagesButtons = (page:number):HTMLButtonElement|HTMLParagraphElement => {

    const button:HTMLButtonElement = document.createElement('button');
    button.classList.add('btn', 'btn-rounded', 'pagination');
    button.textContent = `${page}`;

    if(page) {
        return button;
    } else {
        return errorMsg;
    }

}