import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    image: string;
    price: number;
    category: string;
    tags: string[];
    compareAtPrice?: number;
    description?: string;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    compareAtPrice: { type: Number },
    description: { type: String },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);