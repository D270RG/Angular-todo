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
 interface todoCreateForm{
    name:string,
    link:string,
    comment:string,
    tags:string[]
};
interface todoUpdateForm{
    name:string,
    link:string,
    comment:string, 
    createdDate:string,
    updatedDate:string,
    tags:string[]
};

 export {todoListElement,todoListContent,todoListError,todoCreateForm,todoUpdateForm}