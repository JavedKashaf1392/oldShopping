import { isConstructorDeclaration } from "typescript";

export class User {
    id        : number;
    email     : string;
    password  : string;
    firstName : string;
    lastName  : string;
    photos    : string;
    enabled   :boolean;
    roles     :{};
    checked?     : any;

}




