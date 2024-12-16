import { FnVoid, User } from '../interfaces/interfaces';
import { paginationArrowsButtons, paginationPagesButtons } from '../views/button';
import { createItems, Item } from '../views/create';
import { render } from '../views/render';
import { clearContainer } from './clearContainer';
import { footer, inputDate, inputSearch, main } from './querySelectors';

interface Pagination {

    (users: User[]): {
        slicedData: SlicedData,
        getPagination: GetPagination,
        getPaginationState: GetPaginationState
    }
}

interface SlicedData {
    (limit:number, initialPage:number):void;
}

interface GetPagination {
    (limit:number|undefined, pages:number, initialPage?: number):void;
}

interface GetPaginationState {
    (a:number, b:number, c:number):void;
}

interface OnPage {
    (key:'previous'|'next'):void;
}

interface FiltersData {
    (data:User[]): { filter:FnVoid }
}

export const pagination:Pagination = (users:User[]):{ slicedData: SlicedData, getPagination: GetPagination,  getPaginationState: GetPaginationState } => {
    
    const allUsers:User[] = users;

    const slicedData:SlicedData = (limit:number, initialPage:number):void => {

        clearContainer(main);        
        clearContainer(footer);

        const totalPages:number = Math.round(allUsers.length / limit);
        
        getPagination(limit, totalPages, initialPage);
        
        const startIndex:number = (initialPage - 1) * limit;
        const endIndex:number = initialPage === totalPages ? allUsers.length : startIndex + limit;
        
        getPaginationState( users.length === 0 ? 0 : startIndex === 0 ? 1: startIndex, 
                           users.length === 0 ? 0 : users.length < limit ? users.length : endIndex, 
                           allUsers.length 
                         );

        const sliceData:User[] = allUsers.slice(startIndex,  endIndex);
        
        const items:Item[] = createItems(sliceData);
        
        const { renderAllUsers } = render(main);

        renderAllUsers(items);

    }

    const getPagination:GetPagination = (limit:number = 15, pages:number, initialPage:number = 1):void => {

        const onPage:OnPage = (key:'previous'|'next'):void => {

            switch (key) {
                case 'previous':
                    if(initialPage === 1) return;
                    initialPage--
                    slicedData(limit, initialPage);
                break;
                
                case 'next':
                    if(initialPage === pages) return;
                    initialPage++
                    slicedData(limit, initialPage);
                break;
            }

        }

        const tablePagination:HTMLDivElement = document.createElement('div');
        tablePagination.classList.add('table-pagination');

        const startButton:HTMLButtonElement|HTMLParagraphElement = paginationArrowsButtons('start'); 
        const leftButton:HTMLButtonElement|HTMLParagraphElement = paginationArrowsButtons('left');
        const rightButton:HTMLButtonElement|HTMLParagraphElement = paginationArrowsButtons('right');
        const endButton:HTMLButtonElement|HTMLParagraphElement = paginationArrowsButtons('end');

        startButton.onclick = ():void => slicedData(limit, 1);
        if(startButton instanceof HTMLButtonElement) startButton.disabled = initialPage === 1 ? true :  false; 

        leftButton.onclick = ():void => onPage('previous');
        if(leftButton instanceof HTMLButtonElement) leftButton.disabled = initialPage === 1 ? true :  false;
    
        tablePagination.appendChild(startButton);
        tablePagination.appendChild(leftButton);

        for (let i = 1; i <= pages; i++) {
            if (i === 1 || i === pages || (i >= initialPage - 2 && i <= initialPage + 2)) {

                const button:HTMLButtonElement|HTMLParagraphElement = paginationPagesButtons(i);
                button.textContent = `${i}`;
                button.onclick = ():void => slicedData(limit, i);
                if(i === initialPage) button.classList.add('show');

                tablePagination.appendChild(button);

            } else if (i === initialPage - 3 || i === initialPage + 3) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                tablePagination.appendChild(ellipsis);
            }
        }

        rightButton.onclick = ():void => onPage('next');
        if(rightButton instanceof HTMLButtonElement) rightButton.disabled = initialPage === pages ? true :  false;

        endButton.onclick = ():void => slicedData(limit, pages);
        if(endButton instanceof HTMLButtonElement) endButton.disabled = initialPage === pages ? true :  false;

        tablePagination.appendChild(rightButton);
        tablePagination.appendChild(endButton);

        footer?.appendChild(tablePagination);

    }

    const getPaginationState:GetPaginationState = (a:number, b:number, c:number):void => {

        const state:HTMLDivElement = document.createElement('div');
        state.classList.add('table-state');
        state.innerHTML = `<span>Showing ${a} to ${b} items out of ${c}</span>`;

        footer?.appendChild(state);

    }

    return  {
        slicedData,
        getPagination,
        getPaginationState
    }

}


export const filtersData:FiltersData = (data:User[]):{ filter:FnVoid } => {

    const originalData:User[] = data;

    if(inputSearch?.value ===  '' && inputDate?.value === '') {
        pagination(originalData).slicedData(15, 1);
    }

    const filter:FnVoid = ():void => {

        const searchValue:string = inputSearch?.value.trim().toLowerCase() || '';
        const dateValue:string = inputDate?.value.trim().toLowerCase() || '';

        if(searchValue !== '') {            

            const searchData:User[] = data.filter((user: User):boolean => 
                Object.values(user).some((item) => String(item).toLowerCase().includes(searchValue))
            )      

            pagination(searchData).slicedData(15, 1);

        } else if(dateValue !== '') {

            const searchData:User[] = data.filter((user: User):boolean => {
                const [dd, mm, aaaa] = user.birthdate.split('/'); 
                const date = `${aaaa}-${mm}-${dd}`;  
                return date === dateValue;  
            });

            pagination(searchData).slicedData(15, 1);

        } 

    }

    return {
        filter
    }

}