export class FileUpload {
    constructor(
        public originalname: string,
        public buffer: number[],
        public filename: string) {}
}