/* eslint-disable prettier/prettier */
import { Frames } from "src/frames/frames.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    category_name: string;

    @OneToMany(()=>Frames, frame=>frame.category)
    frame: Frames[]

    @Column()
    category_image_url: string;
}


