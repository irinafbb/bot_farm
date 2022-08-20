import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('union_names')
export class UnionMember {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    first_name: string;

    @Column({nullable: false})
    last_name: string;

    @Column({nullable: true})
    other_name: string;
}