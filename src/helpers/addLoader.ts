
interface Loader  {
    (container:HTMLElement|HTMLDivElement|null):void
}

export const addLoader:Loader = (container:HTMLElement|HTMLDivElement|null):void => {

    const loader:HTMLDivElement = document.createElement('div');
    loader.classList.add('lds-roller');
    loader.innerHTML = `<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`;

    if(container) {
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center'; 

        container.appendChild(loader);
    }

}