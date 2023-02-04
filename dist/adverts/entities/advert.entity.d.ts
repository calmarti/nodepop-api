import { User } from '../../users/entities/user.entity';
export declare class Advert {
    id: string;
    createdAt: Date;
    name: string;
    sale: boolean;
    price: number;
    tags: string[];
    photo: string;
    user: User;
}
