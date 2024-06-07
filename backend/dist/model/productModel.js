"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        types: String,
    },
    price: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
}, { timestamps: true });
exports.ProductModel = mongoose_1.default.model('product', ProductSchema);
