import { Column } from "typeorm";

export class Address{
    @Column ({nullable: true, length: 50})
    pais: string;

    @Column ({nullable: true, length: 50})
    ciudad: string;

    @Column ({nullable: true, length: 50})
    provincia: string;

    @Column ({nullable: true, length: 50})
    calle: string;

    @Column ({nullable: true, length: 3})
    numero: string;

    @Column ({nullable: true, length: 6, name: 'Codigo_postal'})
    cpostal: string;
}