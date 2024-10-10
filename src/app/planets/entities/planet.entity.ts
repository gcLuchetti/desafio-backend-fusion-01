import { BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("planets")
export class Planet {
    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    name: string;

    @Column()
    climate: string;

    @Column()
    terrain: string;

    @Column()
    population: number;

    @BeforeInsert()
    nameCapitalize(){
        const splitStr: Array<string> = this.name.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++)
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

        this.name = splitStr.join(' ');
    }}
