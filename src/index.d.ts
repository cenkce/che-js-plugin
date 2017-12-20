declare module "*.svg" {
    const content: string;
    export default content;
}

declare function require(string: string): any;

declare module "*.png" {
    const content: any;
    export default content;
}
declare module "*.html" {
    const content: any;
    export default content;
}
