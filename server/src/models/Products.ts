import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: true,
})
class Product extends Model<Product> {
    @Column({
        type: DataType.STRING(100),
        
    })
    name: string;

    @Column({
        type: DataType.FLOAT(6, 2),
        
    })
    price: number;

  
 
 

 
}

export default Product;
