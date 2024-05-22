// product variant 
export type Variant = {
    type: string;
    value: string;
};

// product inventory 
export type Inventory = {
    quantity: number;
    inStock: boolean;
};

// product interface
export type Product = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: Variant[];
    inventory: Inventory;
};