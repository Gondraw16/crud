export interface FnVoid {
    ():void
}

export interface Users {
    record:   Record;
    metadata: Metadata;
}

export interface Metadata {
    id:        string;
    private:   boolean;
    createdAt: Date;
}

export interface Record {
    users: User[];
}

export interface Chosen {
    id:string;
}

export interface User {
    id:        number;
    name:      string;
    email:     string;
    message:   string;
    birthdate: string;
    gender:    Gender;
    isOpen:   boolean;
    isDelete: boolean;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
}
