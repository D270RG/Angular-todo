type todoListContent = {
    id:string,
    name:string,
    createdDate:string,
    updatedDate:string,
    link:string,
    comment:string,
 }[];
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
 export {todoListContent,todoListError,todoPostForm}