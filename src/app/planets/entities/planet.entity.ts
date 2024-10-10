import { BeforeInsert, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("planets")
export class Planet {
    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    climate: string;

    @Column({ nullable: false })
    terrain: string;

    @Column({ nullable: false })
    population: number;

    @CreateDateColumn({name: 'created_at', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: false })
    updatedAt: Date;

    @BeforeInsert()
    nameCapitalize(){
        const splitStr: Array<string> = this.name.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++)
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

        this.name = splitStr.join(' ');
    }}
