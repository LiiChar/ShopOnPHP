export interface GetIProducts {
    num: number;
    products: IProducts[];
}

export interface IProducts {
        id: number;
        name: string;
        sale: number;
        manufacturer: string;
        categories: string;
        image: string;
        created?: string;
        updated?: string;
        description: string;
        rate: number;
}

