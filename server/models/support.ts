export class Support{
    supportId=0;
    supportURL='';

    constructor(
        supportId?: number,
        supportURL?: string
    ){
            supportId && (this.supportId=supportId);
            supportURL && (this.supportURL=supportURL);

    }
} 