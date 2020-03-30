export class Network {
    networkId=0;
    networkName='';
    politicalAlignment='';
    
    constructor (
        networkId?:number,
        networkName?:string,
        politicalAlignment?:string,
    ){
            networkId && (this.networkId = networkId);
            networkName && (this.networkName = networkName);
            politicalAlignment && (this.politicalAlignment=politicalAlignment);
            
    }
}