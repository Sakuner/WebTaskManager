/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TaskDetails } from './TaskDetails';
import type { TaskStatus } from './TaskStatus';
import type { TaskType } from './TaskType';
export type TaskItem = {
    id?: string | null;
    title?: string | null;
    difficulty?: number;
    type?: TaskType;
    status?: TaskStatus;
    assignedTo?: string | null;
    details?: TaskDetails;
};

