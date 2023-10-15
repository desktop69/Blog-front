import { Article } from "./Article.model";

export class Category {
     _id?: string;
     name!: string;
     articles!: Article[];
}