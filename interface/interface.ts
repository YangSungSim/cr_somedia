export interface IDataInsert {
    idx: number,
    IdList: string[],
    ContentList: string[],
    UploadTimeList: string[],
    LikeCount: string,
    follwerCount: string,
    inputDate: Date,
    category?:string
}