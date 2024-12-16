
export interface Params {
    ():{
        page:string|null,
        item:string|null
    }
}

export const params:Params = ():{ page:string|null, item:string|null } => {

    const url:URL = new URL(window.location.href); 

    const page:string|null = url.searchParams.get('page'); 
    const item:string|null = url.searchParams.get('item');

    return {
        page,
        item
    };
}