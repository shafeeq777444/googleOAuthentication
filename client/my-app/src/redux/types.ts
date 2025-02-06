// store/types.ts
export interface User {
    id?: string | null; 
    email: string | null;
    firstName:string | null
    lastName: string | null;
    token?: string | null;
  }
  export interface UserData {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    password: string | null;
    userProfession: string | null;
  }
  
  