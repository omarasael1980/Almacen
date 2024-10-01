import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: true,
})
class Product extends Model<Product> {
    @Column({
        type: DataType.STRING(100),
        
    })
   declare name: string;

    @Column({
        type: DataType.FLOAT(6, 2),
        
    })
   declare price: number;

  @Default(true)
   @Column({
    type: DataType.BOOLEAN,
    
})
declare isAvailable: boolean;

 
 

 
}

export default Product;
