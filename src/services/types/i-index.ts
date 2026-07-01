export type IPaginationRequest = {
    page_size: number;
    page: number;
};

export type IPaginationResponse = {
    page_size: number;
    page: number;
    total: number;
};

export type IDeleteResponse = {
    success: boolean;
}