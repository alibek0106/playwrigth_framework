import { APIRequestContext, APIResponse } from "@playwright/test";
import { CreateUserRequest } from "../models/api/ReqResModels";
import { Routes } from "../constants/Routes";

export class ReqResService {
    constructor(private request: APIRequestContext) { }

    async getSingleUser(id: number): Promise<APIResponse> {
        return await this.request.get(Routes.userById(id));
    }

    async listUsers(page: number): Promise<APIResponse> {
        return await this.request.get(Routes.USERS + `?page=${page}`);
    }

    async createUser(data: CreateUserRequest): Promise<APIResponse> {
        return await this.request.post(Routes.USERS, { data });
    }

    async registerUser(email: string, password?: string): Promise<APIResponse> {
        return await this.request.post(Routes.REGISTER, {
            data: { email, password }
        });
    }
}