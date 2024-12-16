import { FnVoid } from '../interfaces/interfaces';
import { likeButton } from '../views/button';
import { Item } from './removeItem';

interface UpdateButton {
    (removeId:string, addId:string, type:'add'|'remove'):void;
}

export const verifyChosenButton:FnVoid = ():void => {
    const likes: Item[] = JSON.parse(localStorage.getItem('likes') || '[]');
    const allGrids: NodeListOf<HTMLDivElement> = document.querySelectorAll('.item-container-grid');

    allGrids.forEach((grid: HTMLDivElement):void => {

        const container:HTMLDivElement|null = grid.querySelector('.options-container-grid');
        const gridDataSet:string|undefined = grid.dataset.id;

        if (!gridDataSet || !container) return; 

        const isTrue:boolean = likes.some((item:Item):boolean => item.id === gridDataSet);

        const updateButton:UpdateButton = (removeId:string, addId:string, type:'add'|'remove'):void => {
            if (container.querySelector(`#${type}-button`)) return;

            container.querySelector(`#${removeId}`)?.remove();

            const button:HTMLButtonElement|HTMLParagraphElement = likeButton(type);
            if (button) container.appendChild(button);
        };

        if (isTrue) {
            updateButton('add-button', 'remove-button', 'remove');
        } else {
            updateButton('remove-button', 'add-button', 'add');
        }

    });
};