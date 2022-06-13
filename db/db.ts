import mongodb, {MongoClient} from "mongodb";
export namespace DB {
    export const NAME:string = 'GongGu';
    export enum COLLECTIONS {
        GONG_GU = 'gonggu'
    } 
    export class MongoConn {
        private connection: string = process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/config' : 'mongodb://localhost:27017/config';
        private static instance: MongoConn;
        private db?: MongoClient;

        async connect (): Promise<MongoClient> {
            try {
                if(this.db) return this.db;
                this.db = new MongoClient(this.connection, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                return await this.db.connect();
            }catch (e) {
                throw new Error(e);
            }
        }

        static get getInstance () {
            if(!MongoConn.instance) MongoConn.instance = new MongoConn();
            return MongoConn.instance;
        }


    }

}