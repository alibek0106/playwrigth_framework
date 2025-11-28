import { APIRequestContext, APIResponse } from "@playwright/test";
import { CreateUserRequest } from "../models/api/ReqResModels";

export class ReqResService {
    constructor(private request: APIRequestContext) { }

    async getSingleUser(id: number): Promise<APIResponse> {
        return await this.request.get(`/api/users/${id}`);
    }

    async listUsers(page: number): Promise<APIResponse> {
        return await this.request.get(`/api/users?page=${page}`);
    }

    async createUser(data: CreateUserRequest): Promise<APIResponse> {
        return await this.request.post('/api/users', { data });
    }

    async registerUser(email: string, password?: string): Promise<APIResponse> {
        return await this.request.post('/api/register', {
            data: { email, password }
        });
    }
}