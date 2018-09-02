export class User {
    id: string;
    name: string;
    lastname: string;
    age: number;
    email: string;
}

export class Bill {
    id: string;
    userId: string;
    paidDate: Date;
    comment: string;
    amount: number;
    categoryId: string;
    category: Category;
}

export class Category {
    id: number;
    description: string;
}

export class UserInfo {
    total = 0;
    totalBills = 0;
}

export class UserRequest {
    requestDate: Date;
    constructor() {
        this.requestDate = new Date();
    }
}

export enum Months {
    'Ιανουάριο' = 0,
    'Φεβρουάριο' = 1,
    'Μάρτιο' = 2,
    'Απρίλιο' = 3,
    'Μάιο' = 4,
    'Ιούνιο' = 5,
    'Ιούλιο' = 6,
    'Άυγουστο' = 7,
    'Σεπτέμβριο' = 8,
    'Οκτώβριο' = 9,
    'Νοέμβριο' = 10,
    'Δεκέμβριο' = 11
}

