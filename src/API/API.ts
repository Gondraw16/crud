import { Item as ItemSelect } from '../helpers/removeItem';
import { User, Users } from '../interfaces/interfaces';

const url:string = 'https://api.jsonbin.io/v3/b';

interface UpdateData {
    users:User[]
}

interface GetData {
    ():Promise<Users|void>
}

interface IsDelete {
    (items: ItemSelect[]|[], opt:boolean):Promise<boolean|undefined>
}

interface Update {
    (newData: UpdateData):Promise<boolean|undefined>
}

interface IsView {
    (id:string):Promise<boolean|undefined>
}

export const getAllData:GetData = async ():Promise<Users|void> => {

    try {

        const response:Response = await fetch(`${url}/6757bba2acd3cb34a8b6fc2d`, {
            method: 'GET',
            headers: {
                'X-Master-Key': '$2a$10$OpUK1U2wimA6mSIEe9rNZ.KJi4.BubGSYADDUrHb5yT8iRr1bxxQS',
                'X-Access-Key': '$2a$10$nv0k20rNv7TFqrA0rgWJ6exhbMcud.5AwGkfSTgB9Epdaa.lAsRe.', 
                },
            });

        const result:Users = await response.json();

        return result;

    } catch (error) {
        console.log(error)
    }

}

export const isDelete:IsDelete = async(items:ItemSelect[]|[], opt:boolean):Promise<boolean|undefined> => {

    const result:void|Users = await getAllData();

    if(result) {

        const data:User[] = result.record.users;

        const newData:User[] = data.map( (item:User):User => {
            items.forEach( (i:ItemSelect):void => {
                if(i.id === `${item.id}`) {
                    item.isDelete = opt;
                }
            });
            return item;
        });

        return await updateJsonData({users: newData});

    }
}

export const isView:IsView = async(id:string):Promise<boolean|undefined> => {
    const result:void|Users = await getAllData();

    if(result) {

        const data:User[] = result.record.users;

        const newData:User[] = data.map( (item:User):User => {
            if(item.id === Number(id)) {
                item.isOpen = true;
            }
            return item;
        });

        return await updateJsonData({users: newData});

    }

}

const updateJsonData:Update = async (newData:UpdateData):Promise<boolean|undefined> => {

    try {
        
        const response:Response = await fetch(`${url}/6757bba2acd3cb34a8b6fc2d`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2a$10$OpUK1U2wimA6mSIEe9rNZ.KJi4.BubGSYADDUrHb5yT8iRr1bxxQS',
                'X-Access-Key': '$2a$10$nv0k20rNv7TFqrA0rgWJ6exhbMcud.5AwGkfSTgB9Epdaa.lAsRe.', 
                },
            body: JSON.stringify(newData)
        });
        
        return response.ok;

    } catch (error) {
        console.log(error);
    }

}