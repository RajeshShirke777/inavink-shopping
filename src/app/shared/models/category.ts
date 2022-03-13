export interface Category {
    id: number;
    name: string;
    icon: string;
    brief: string;
    color: string;
    priority: string;
    draft: boolean; 
    prodCount?:number;
    shopCount?:number;
  }