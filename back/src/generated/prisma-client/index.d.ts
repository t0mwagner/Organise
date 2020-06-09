// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  project: (where?: ProjectWhereInput) => Promise<boolean>;
  task: (where?: TaskWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  project: (where: ProjectWhereUniqueInput) => ProjectNullablePromise;
  projects: (args?: {
    where?: ProjectWhereInput;
    orderBy?: ProjectOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Project>;
  projectsConnection: (args?: {
    where?: ProjectWhereInput;
    orderBy?: ProjectOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => ProjectConnectionPromise;
  task: (where: TaskWhereUniqueInput) => TaskNullablePromise;
  tasks: (args?: {
    where?: TaskWhereInput;
    orderBy?: TaskOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Task>;
  tasksConnection: (args?: {
    where?: TaskWhereInput;
    orderBy?: TaskOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => TaskConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createProject: (data: ProjectCreateInput) => ProjectPromise;
  updateProject: (args: {
    data: ProjectUpdateInput;
    where: ProjectWhereUniqueInput;
  }) => ProjectPromise;
  updateManyProjects: (args: {
    data: ProjectUpdateManyMutationInput;
    where?: ProjectWhereInput;
  }) => BatchPayloadPromise;
  upsertProject: (args: {
    where: ProjectWhereUniqueInput;
    create: ProjectCreateInput;
    update: ProjectUpdateInput;
  }) => ProjectPromise;
  deleteProject: (where: ProjectWhereUniqueInput) => ProjectPromise;
  deleteManyProjects: (where?: ProjectWhereInput) => BatchPayloadPromise;
  createTask: (data: TaskCreateInput) => TaskPromise;
  updateTask: (args: {
    data: TaskUpdateInput;
    where: TaskWhereUniqueInput;
  }) => TaskPromise;
  updateManyTasks: (args: {
    data: TaskUpdateManyMutationInput;
    where?: TaskWhereInput;
  }) => BatchPayloadPromise;
  upsertTask: (args: {
    where: TaskWhereUniqueInput;
    create: TaskCreateInput;
    update: TaskUpdateInput;
  }) => TaskPromise;
  deleteTask: (where: TaskWhereUniqueInput) => TaskPromise;
  deleteManyTasks: (where?: TaskWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  project: (
    where?: ProjectSubscriptionWhereInput
  ) => ProjectSubscriptionPayloadSubscription;
  task: (
    where?: TaskSubscriptionWhereInput
  ) => TaskSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type ProjectOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "description_ASC"
  | "description_DESC"
  | "color_ASC"
  | "color_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type TaskOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "description_ASC"
  | "description_DESC"
  | "categoryId_ASC"
  | "categoryId_DESC"
  | "done_ASC"
  | "done_DESC"
  | "doneDate_ASC"
  | "doneDate_DESC"
  | "dueDate_ASC"
  | "dueDate_DESC";

export interface TaskCreateInput {
  id?: Maybe<ID_Input>;
  name: String;
  description?: Maybe<String>;
  categoryId: ID_Input;
  done: Boolean;
  doneDate?: Maybe<DateTimeInput>;
  dueDate: DateTimeInput;
}

export interface ProjectUpdateInput {
  name?: Maybe<String>;
  description?: Maybe<String>;
  color?: Maybe<String>;
}

export type ProjectWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface ProjectWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  description?: Maybe<String>;
  description_not?: Maybe<String>;
  description_in?: Maybe<String[] | String>;
  description_not_in?: Maybe<String[] | String>;
  description_lt?: Maybe<String>;
  description_lte?: Maybe<String>;
  description_gt?: Maybe<String>;
  description_gte?: Maybe<String>;
  description_contains?: Maybe<String>;
  description_not_contains?: Maybe<String>;
  description_starts_with?: Maybe<String>;
  description_not_starts_with?: Maybe<String>;
  description_ends_with?: Maybe<String>;
  description_not_ends_with?: Maybe<String>;
  color?: Maybe<String>;
  color_not?: Maybe<String>;
  color_in?: Maybe<String[] | String>;
  color_not_in?: Maybe<String[] | String>;
  color_lt?: Maybe<String>;
  color_lte?: Maybe<String>;
  color_gt?: Maybe<String>;
  color_gte?: Maybe<String>;
  color_contains?: Maybe<String>;
  color_not_contains?: Maybe<String>;
  color_starts_with?: Maybe<String>;
  color_not_starts_with?: Maybe<String>;
  color_ends_with?: Maybe<String>;
  color_not_ends_with?: Maybe<String>;
  AND?: Maybe<ProjectWhereInput[] | ProjectWhereInput>;
  OR?: Maybe<ProjectWhereInput[] | ProjectWhereInput>;
  NOT?: Maybe<ProjectWhereInput[] | ProjectWhereInput>;
}

export interface TaskWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  description?: Maybe<String>;
  description_not?: Maybe<String>;
  description_in?: Maybe<String[] | String>;
  description_not_in?: Maybe<String[] | String>;
  description_lt?: Maybe<String>;
  description_lte?: Maybe<String>;
  description_gt?: Maybe<String>;
  description_gte?: Maybe<String>;
  description_contains?: Maybe<String>;
  description_not_contains?: Maybe<String>;
  description_starts_with?: Maybe<String>;
  description_not_starts_with?: Maybe<String>;
  description_ends_with?: Maybe<String>;
  description_not_ends_with?: Maybe<String>;
  categoryId?: Maybe<ID_Input>;
  categoryId_not?: Maybe<ID_Input>;
  categoryId_in?: Maybe<ID_Input[] | ID_Input>;
  categoryId_not_in?: Maybe<ID_Input[] | ID_Input>;
  categoryId_lt?: Maybe<ID_Input>;
  categoryId_lte?: Maybe<ID_Input>;
  categoryId_gt?: Maybe<ID_Input>;
  categoryId_gte?: Maybe<ID_Input>;
  categoryId_contains?: Maybe<ID_Input>;
  categoryId_not_contains?: Maybe<ID_Input>;
  categoryId_starts_with?: Maybe<ID_Input>;
  categoryId_not_starts_with?: Maybe<ID_Input>;
  categoryId_ends_with?: Maybe<ID_Input>;
  categoryId_not_ends_with?: Maybe<ID_Input>;
  done?: Maybe<Boolean>;
  done_not?: Maybe<Boolean>;
  doneDate?: Maybe<DateTimeInput>;
  doneDate_not?: Maybe<DateTimeInput>;
  doneDate_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  doneDate_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  doneDate_lt?: Maybe<DateTimeInput>;
  doneDate_lte?: Maybe<DateTimeInput>;
  doneDate_gt?: Maybe<DateTimeInput>;
  doneDate_gte?: Maybe<DateTimeInput>;
  dueDate?: Maybe<DateTimeInput>;
  dueDate_not?: Maybe<DateTimeInput>;
  dueDate_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  dueDate_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  dueDate_lt?: Maybe<DateTimeInput>;
  dueDate_lte?: Maybe<DateTimeInput>;
  dueDate_gt?: Maybe<DateTimeInput>;
  dueDate_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<TaskWhereInput[] | TaskWhereInput>;
  OR?: Maybe<TaskWhereInput[] | TaskWhereInput>;
  NOT?: Maybe<TaskWhereInput[] | TaskWhereInput>;
}

export interface ProjectCreateInput {
  id?: Maybe<ID_Input>;
  name: String;
  description?: Maybe<String>;
  color: String;
}

export type TaskWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface ProjectSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<ProjectWhereInput>;
  AND?: Maybe<ProjectSubscriptionWhereInput[] | ProjectSubscriptionWhereInput>;
  OR?: Maybe<ProjectSubscriptionWhereInput[] | ProjectSubscriptionWhereInput>;
  NOT?: Maybe<ProjectSubscriptionWhereInput[] | ProjectSubscriptionWhereInput>;
}

export interface ProjectUpdateManyMutationInput {
  name?: Maybe<String>;
  description?: Maybe<String>;
  color?: Maybe<String>;
}

export interface TaskSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<TaskWhereInput>;
  AND?: Maybe<TaskSubscriptionWhereInput[] | TaskSubscriptionWhereInput>;
  OR?: Maybe<TaskSubscriptionWhereInput[] | TaskSubscriptionWhereInput>;
  NOT?: Maybe<TaskSubscriptionWhereInput[] | TaskSubscriptionWhereInput>;
}

export interface TaskUpdateInput {
  name?: Maybe<String>;
  description?: Maybe<String>;
  categoryId?: Maybe<ID_Input>;
  done?: Maybe<Boolean>;
  doneDate?: Maybe<DateTimeInput>;
  dueDate?: Maybe<DateTimeInput>;
}

export interface TaskUpdateManyMutationInput {
  name?: Maybe<String>;
  description?: Maybe<String>;
  categoryId?: Maybe<ID_Input>;
  done?: Maybe<Boolean>;
  doneDate?: Maybe<DateTimeInput>;
  dueDate?: Maybe<DateTimeInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface TaskEdge {
  node: Task;
  cursor: String;
}

export interface TaskEdgePromise extends Promise<TaskEdge>, Fragmentable {
  node: <T = TaskPromise>() => T;
  cursor: () => Promise<String>;
}

export interface TaskEdgeSubscription
  extends Promise<AsyncIterator<TaskEdge>>,
    Fragmentable {
  node: <T = TaskSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface TaskPreviousValues {
  id: ID_Output;
  name: String;
  description?: String;
  categoryId: ID_Output;
  done: Boolean;
  doneDate?: DateTimeOutput;
  dueDate: DateTimeOutput;
}

export interface TaskPreviousValuesPromise
  extends Promise<TaskPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  description: () => Promise<String>;
  categoryId: () => Promise<ID_Output>;
  done: () => Promise<Boolean>;
  doneDate: () => Promise<DateTimeOutput>;
  dueDate: () => Promise<DateTimeOutput>;
}

export interface TaskPreviousValuesSubscription
  extends Promise<AsyncIterator<TaskPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
  categoryId: () => Promise<AsyncIterator<ID_Output>>;
  done: () => Promise<AsyncIterator<Boolean>>;
  doneDate: () => Promise<AsyncIterator<DateTimeOutput>>;
  dueDate: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface TaskConnection {
  pageInfo: PageInfo;
  edges: TaskEdge[];
}

export interface TaskConnectionPromise
  extends Promise<TaskConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<TaskEdge>>() => T;
  aggregate: <T = AggregateTaskPromise>() => T;
}

export interface TaskConnectionSubscription
  extends Promise<AsyncIterator<TaskConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<TaskEdgeSubscription>>>() => T;
  aggregate: <T = AggregateTaskSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateTask {
  count: Int;
}

export interface AggregateTaskPromise
  extends Promise<AggregateTask>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateTaskSubscription
  extends Promise<AsyncIterator<AggregateTask>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface ProjectConnection {
  pageInfo: PageInfo;
  edges: ProjectEdge[];
}

export interface ProjectConnectionPromise
  extends Promise<ProjectConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<ProjectEdge>>() => T;
  aggregate: <T = AggregateProjectPromise>() => T;
}

export interface ProjectConnectionSubscription
  extends Promise<AsyncIterator<ProjectConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<ProjectEdgeSubscription>>>() => T;
  aggregate: <T = AggregateProjectSubscription>() => T;
}

export interface Task {
  id: ID_Output;
  name: String;
  description?: String;
  categoryId: ID_Output;
  done: Boolean;
  doneDate?: DateTimeOutput;
  dueDate: DateTimeOutput;
}

export interface TaskPromise extends Promise<Task>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  description: () => Promise<String>;
  categoryId: () => Promise<ID_Output>;
  done: () => Promise<Boolean>;
  doneDate: () => Promise<DateTimeOutput>;
  dueDate: () => Promise<DateTimeOutput>;
}

export interface TaskSubscription
  extends Promise<AsyncIterator<Task>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
  categoryId: () => Promise<AsyncIterator<ID_Output>>;
  done: () => Promise<AsyncIterator<Boolean>>;
  doneDate: () => Promise<AsyncIterator<DateTimeOutput>>;
  dueDate: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface TaskNullablePromise
  extends Promise<Task | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  description: () => Promise<String>;
  categoryId: () => Promise<ID_Output>;
  done: () => Promise<Boolean>;
  doneDate: () => Promise<DateTimeOutput>;
  dueDate: () => Promise<DateTimeOutput>;
}

export interface ProjectSubscriptionPayload {
  mutation: MutationType;
  node: Project;
  updatedFields: String[];
  previousValues: ProjectPreviousValues;
}

export interface ProjectSubscriptionPayloadPromise
  extends Promise<ProjectSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = ProjectPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = ProjectPreviousValuesPromise>() => T;
}

export interface ProjectSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<ProjectSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = ProjectSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = ProjectPreviousValuesSubscription>() => T;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface AggregateProject {
  count: Int;
}

export interface AggregateProjectPromise
  extends Promise<AggregateProject>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateProjectSubscription
  extends Promise<AsyncIterator<AggregateProject>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface ProjectPreviousValues {
  id: ID_Output;
  name: String;
  description?: String;
  color: String;
}

export interface ProjectPreviousValuesPromise
  extends Promise<ProjectPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  description: () => Promise<String>;
  color: () => Promise<String>;
}

export interface ProjectPreviousValuesSubscription
  extends Promise<AsyncIterator<ProjectPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
  color: () => Promise<AsyncIterator<String>>;
}

export interface Project {
  id: ID_Output;
  name: String;
  description?: String;
  color: String;
}

export interface ProjectPromise extends Promise<Project>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  description: () => Promise<String>;
  color: () => Promise<String>;
}

export interface ProjectSubscription
  extends Promise<AsyncIterator<Project>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
  color: () => Promise<AsyncIterator<String>>;
}

export interface ProjectNullablePromise
  extends Promise<Project | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  description: () => Promise<String>;
  color: () => Promise<String>;
}

export interface TaskSubscriptionPayload {
  mutation: MutationType;
  node: Task;
  updatedFields: String[];
  previousValues: TaskPreviousValues;
}

export interface TaskSubscriptionPayloadPromise
  extends Promise<TaskSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = TaskPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = TaskPreviousValuesPromise>() => T;
}

export interface TaskSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<TaskSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = TaskSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = TaskPreviousValuesSubscription>() => T;
}

export interface ProjectEdge {
  node: Project;
  cursor: String;
}

export interface ProjectEdgePromise extends Promise<ProjectEdge>, Fragmentable {
  node: <T = ProjectPromise>() => T;
  cursor: () => Promise<String>;
}

export interface ProjectEdgeSubscription
  extends Promise<AsyncIterator<ProjectEdge>>,
    Fragmentable {
  node: <T = ProjectSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Task",
    embedded: false
  },
  {
    name: "Project",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
