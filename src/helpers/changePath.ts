import { getUsers } from './getUsers';
import { selectAll } from './querySelectors';
import { existBtn } from './removeItem';

interface Change {
    (e:Event):void;
}

export const changePage:Change = (e:Event):void => {

    e.preventDefault();

    const { existingRemoveButton, existingRestoreButton} = existBtn();

    existingRemoveButton ? existingRemoveButton.remove() : existingRestoreButton ? existingRestoreButton.remove() : null;

    if(selectAll) selectAll.checked = false;

    const target:HTMLAnchorElement = e.target as HTMLAnchorElement;
    const navUrl = target.href.split("/");

    const urlOrigin = window.location.origin;
    const path = `${urlOrigin}/?page=${navUrl[3]}`;

    history.pushState(null, '', path);

    getUsers();

}