
interface Clear {
    (container:HTMLElement|HTMLDivElement|null):void;
}

export const clearContainer:Clear = (container:HTMLElement|HTMLDivElement|null):void => {

    if(container) while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
}