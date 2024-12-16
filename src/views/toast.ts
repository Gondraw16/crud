import { mainContainer } from '../helpers/querySelectors';

interface Toast {
    (message:string, color?:string):void
}

export const toast:Toast = (message:string, color?:string):void => {

    const existingToast:HTMLDivElement|null|undefined = mainContainer?.querySelector('.toast');
    existingToast?.remove();

    const toast:HTMLDivElement = document.createElement('div');
    toast.classList.add('toast', 'show', `${color ? color: ''}`);
    toast.textContent = message.trim();

    mainContainer?.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);

}