import { toast } from '../views/toast';
import { Item } from './removeItem';

let likes:Item[]|[] = JSON.parse(localStorage.getItem('likes') || '[]');

interface Chosen {
    (event:Event, key:'add'|'remove'):void;
}

export const chosen:Chosen = (event:Event, key:'add'|'remove'):void => {

    const target:HTMLButtonElement = event.target as HTMLButtonElement;
    const grid:HTMLElement|HTMLDivElement|null|undefined = target.parentElement?.parentElement;

    const id:string|undefined = grid?.dataset.id;
    
    const verify:boolean = likes.some( (item:Item):boolean => item.id === id );

    switch (key) {

        case 'add':
        
            if(id) {

                if(verify) return;
                likes = [...likes, { id }];
                localStorage.setItem('likes', JSON.stringify(likes));
                toast('User added to chosen', 'black');
            }            

        break;
    

        case 'remove':

            likes = likes.filter((item:Item):boolean => item.id !== id);
            localStorage.setItem('likes', JSON.stringify(likes));
            toast('User removed from chosen', 'red');

        break;
    }
}