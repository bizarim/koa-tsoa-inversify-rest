
export type Test = {
    id: number;
    email: string;
    name: Name;
};

export type Name = {
    first: string;
    last?: string;
};

export class TestRequest {
    name: string;
}
