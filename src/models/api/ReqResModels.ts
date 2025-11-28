// src/models/api/ReqResModels.ts
import { z } from 'zod';

// 1. User Schema & Type
export const UserSchema = z.object({
    id: z.number(),
    email: z.email(),
    first_name: z.string(),
    last_name: z.string(),
    avatar: z.url()
});
export type User = z.infer<typeof UserSchema>;

// 2. Single Response Wrapper
export const SingleUserResponseSchema = z.object({
    data: UserSchema,
    support: z.object({
        url: z.string(),
        text: z.string()
    })
});

// 3. List Response
export const ListUsersSchema = z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
    data: z.array(UserSchema)
});

// 4. Create Response
export const CreateUserResponseSchema = z.object({
    name: z.string(),
    job: z.string(),
    id: z.string(),
    createdAt: z.string()
});

// 5. Register Response
export const RegisterResponseSchema = z.object({
    id: z.number(),
    token: z.string()
});

// 6. Request Interfaces
export interface CreateUserRequest {
    name: string;
    job: string;
}