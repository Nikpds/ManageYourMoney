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
    catId: string;
    category: string;
    constructor() {
    }
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
}
