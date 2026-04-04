/* eslint-disable prettier/prettier */
import { Categories } from "src/categories/category.entity";
import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Frames {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Categories, category => category.frame, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'category_id' })
    category: Categories;

    @Column()
    frame_name: string;

    @Column()
    frame_price: string;

    @Column()
    frame_desc: string;

    @Column()
    frame_image: string;

}

