import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User extends BaseEntity {
    // 고유 랜덤 키
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 20, unique: true })
    email: string;
    @Column({ length: 10 })
    username: string;
    @Column({ length: 15 })
    password: string;
    @Column()
    salt: string;

    // 가입일자
    @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    registeredAt: Date;

    // 관계 생성 ( 1:M )
    // 참조할 DB 객체정보, 내 정보를 저장할 상대편 변수명
    @OneToMany(type => Post, post => post.writer)
    posts: Post[]; // 사용자는 다수의 게시글 작성
}