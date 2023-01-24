type indexable = {[key:string]:any};
interface todoListElement extends indexable{
    id:string,
    name:string,
    createdDate:string,
    updatedDate:string,
    link:string,
    comment:string,
    tags:string[]
 }
 type todoListContent = todoListElement[];

 type todoListError = {
    message:string,
    code:string,
    issues:{
        message:string
    }[]
 }
 interface todoPostForm{
    name:string,
    link:string,
    comment:string,
    tags:string[]
};

 export {todoListElement,todoListContent,todoListError,todoPostForm}