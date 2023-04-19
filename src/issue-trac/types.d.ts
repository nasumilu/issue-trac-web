

export type Issue = {
    title: string,
    description: string,
    shape: {
        type: string,
        coordinates: [number, number],
        srid: number
    },
    subject: string,
    geoid: string,
    disposition: 'NEW' | 'RECEIVED' | 'REVIEWING' | 'ASSIGNED' | 'COMPLETED' | 'CLOSED'
};

export type Links = { [rel: string]: { href: string } };

export type Page = {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
};

export type IssueResponse = {
    _embedded: {issues: Issue[] },
    _links: Links,
    page: Page
};




