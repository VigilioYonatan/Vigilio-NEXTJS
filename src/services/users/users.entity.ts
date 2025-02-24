import { Table, Column, Model, DataType } from "sequelize-typescript";
import { UsersSchema } from "./users.schema";

@Table({ tableName: "users" })
export class UsersEntity extends Model implements Omit<UsersSchema, "id"> {
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    email: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    age: number;

    @Column({ type: DataType.ENUM("admin", "client"), allowNull: false })
    role: "admin" | "client";

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    enabled: boolean;

    @Column({ type: DataType.JSON, allowNull: false })
    hobbies: UsersSchema["hobbies"];

    @Column({ type: DataType.JSON })
    address: UsersSchema["address"];

    @Column({ type: DataType.JSON })
    photo: UsersSchema["photo"];
}
