/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignTasksRequest } from '../models/AssignTasksRequest';
import type { TaskItem } from '../models/TaskItem';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebTaskManagerService {
    /**
     * @returns User Success
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }
    /**
     * @param skip
     * @param take
     * @returns TaskItem Success
     * @throws ApiError
     */
    public static getTasksAvailable(
        skip?: number,
        take: number = 10,
    ): CancelablePromise<Array<TaskItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/available',
            query: {
                'skip': skip,
                'take': take,
            },
        });
    }
    /**
     * @param userId
     * @returns TaskItem Success
     * @throws ApiError
     */
    public static getTasksAssigned(
        userId: string,
    ): CancelablePromise<Array<TaskItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/assigned/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postTasksAssign(
        requestBody: AssignTasksRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/assign',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
