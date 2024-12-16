import { getAllData } from '../API/API';
import { addLoader } from './addLoader';
import { clearContainer } from './clearContainer';
import { Chosen, User, Users } from '../interfaces/interfaces';
import { filtersData, pagination } from './pagination';
import { inputDate, inputSearch, main } from './querySelectors';
import { params } from './params';
import { openItem } from './openItem';

interface GetUser {
    ():Promise<void>
}

export const getUsers:GetUser = async():Promise<void> => {

    clearContainer(main);
    addLoader(main);

    const data:Users|void = await getAllData();

    if(data) {

        clearContainer(main);
        if(main) main.style.display = 'block';

        const users:User[] = data.record.users;

        const { page, item } = params();
        

        switch (page) {
            
            case 'home':
                
                const home:User[] = users.filter((users:User):boolean => users.isDelete !== true );
                
                if(item) return openItem(item);

                pagination(home).slicedData(15, 1);

            break;

            case 'chosen':


            const chosens:Chosen[]|[] = JSON.parse(localStorage.getItem('likes') || '[]');

            const dataByChosen:User[] = users.filter( (u:User) => {
                return chosens.some( (chosen:Chosen):boolean => u.id.toString() === chosen.id && u.isDelete !== true);
            });

            if(item) return openItem(item);

            pagination(dataByChosen).slicedData(15, 1)

            break;


            case 'duster':

                const chosen:User [] = users.filter((users:User):boolean => users.isDelete === true );
                if(item) return openItem(item);
                pagination(chosen).slicedData(15, 1);

            break;

            default:
                const fault:User [] = users.filter((users:User):boolean => users.isDelete !== true );
                if(item) return openItem(item);
                pagination(fault).slicedData(15, 1);
            break;
        }


        if(inputSearch && inputDate) {  inputDate.value = ''; inputSearch.value = ''; }
        inputSearch?.addEventListener('keyup', ():void => filtersData(users).filter());
        inputDate?.addEventListener('change', ():void => filtersData(users).filter());
    }

}