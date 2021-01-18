import BaseRepository from "./BaseRepository";
import UserModel from "../../database/models/UserModel";

interface UserRepository extends BaseRepository<UserModel> {

    findByEmail(email: string): Promise<UserModel>;

    findByRefreshToken(refreshToken: string): Promise<UserModel>;

    insert(email: string, name: string, password: string, refreshToken: string): Promise<UserModel>;
    
}

export default UserRepository;