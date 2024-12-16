

interface Confirm {
    (message:string|undefined, container:HTMLDivElement|null):Promise<boolean>;
}

export const confirm:Confirm = (message: string = 'You definitely want to delete this item', container:HTMLDivElement|null): Promise<boolean> => {
    return new Promise((resolve) => {
      const modal: HTMLDivElement = document.createElement('div');
      modal.classList.add('modal');
  
      const popup: HTMLDivElement = document.createElement('div');
      popup.classList.add('popup');
  
      const header: HTMLDivElement = document.createElement('div');
      header.classList.add('header-popup');
  
      const body: HTMLDivElement = document.createElement('div');
      body.classList.add('body-popup');
  
      const msg: HTMLParagraphElement = document.createElement('p');
      msg.textContent = message.trim();
  
      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('btn-container');
  
      const yes: HTMLButtonElement = document.createElement('button');
      yes.type = 'button';
      yes.classList.add('btn-primary');
      yes.innerHTML = `Yes &nbsp; <i class="icon-check"></i>`;
      
      yes.onclick = (): void => {
        resolve(true);
        container?.removeChild(modal);
      };
  
      const abort: HTMLButtonElement = document.createElement('button');
      abort.type = 'button';
      abort.classList.add('btn-danger');
      abort.innerHTML = `Cancel &nbsp; <i class="icon-cross"></i>`;
  
      abort.onclick = (): void => {
        resolve(false);
        container?.removeChild(modal);
      };
  
      buttonsContainer.appendChild(yes);
      buttonsContainer.appendChild(abort);
  
      body.appendChild(msg);
      body.appendChild(buttonsContainer);
  
      popup.appendChild(header);
      popup.appendChild(body);
  
      modal.appendChild(popup);
  
      if(container) container.appendChild(modal);      
      
    });
};
  