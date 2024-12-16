import { FnVoid } from '../interfaces/interfaces';
import { changePage } from './changePath';
import { getUsers } from './getUsers';
import { homeData, navItems, refresh, selectAll } from './querySelectors';
import { selectAllItems } from './removeItem';

export const addEventListener:FnVoid = ():void => {

    if(refresh) refresh.addEventListener('click', getUsers);
    if(selectAll) selectAll.addEventListener('change', selectAllItems);
    if(navItems) navItems.forEach( (nav:HTMLAnchorElement):void => nav.addEventListener('click', changePage));
    if(homeData) homeData.addEventListener('click', getUsers);
}   