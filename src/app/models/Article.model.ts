import { Category } from "./Category.model";

export class Article {
     _id?: string;
     title!: string;
     content!: string;
     category!: Category;
     CreatedAt!: Date;
}