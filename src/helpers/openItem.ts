import { getAllData, isView } from '../API/API';
import { User, Users } from '../interfaces/interfaces';
import { render } from '../views/render';
import { addLoader } from './addLoader';
import { clearContainer } from './clearContainer';
import { params } from './params';
import { main } from './querySelectors';

export const openItem = async (id:string) => {

    const url:Location = window.location;
    const originUrl:string = url.origin;

    const searchParam:URLSearchParams = new URLSearchParams(url.search);
    const pageParam:string|null = searchParam.get('page');

    const pathOpenItem = `${originUrl}/?page=${pageParam}&item=${id}`; 

    history.pushState(null, '', pathOpenItem); 
    clearContainer(main);
    addLoader(main);

    const data:Users|void = await getAllData();

    if(data) {

        clearContainer(main);

        main ? main.style.display = 'block': '';

        const users:User[] = data.record.users;

        const { item:itemParam } = params();

        const filterItem:User[] = users.filter((item: User): boolean => item.id === Number(itemParam));

        isView(id);

        render(main).renderOpenItem(filterItem);

    }






}