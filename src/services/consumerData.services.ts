import axios from 'axios';
import constants from '../core/constants'
import zlib from 'zlib';
import cron from 'cron';

export default class ConsumerDataService {
    constructor() {
    }

    public async execute() {
    
        return new Promise((res, rej) => {
            const job = new cron.CronJob('0 0 13 * * *', async () => {
              try {
                await this.callProducts();
              } catch (error) {
                console.error(error);
                rej(error)
              }
            });

            job.start();
            console.log('jobb iniciado')
            res('ok');
        });
    }

    private processData(text: string): any[]{
        let _text = text;

        if(_text.length === 0) return [];
        var loop = true;
        let list = [];

        while(loop){
            if(_text.indexOf('{') < _text.indexOf('}')){
                list.push(JSON.parse(_text.substring(_text.indexOf('{'), _text.indexOf('}') + 1)));
                _text = _text.substring(_text.indexOf('}')+1, _text.length);
            }else{
                loop = false;
            }
        }

        return list;
    }

    private async callProducts(): Promise<any> {
        let count = constants.fileProducts.length;
        let allProducts: any[] = [];

        return new Promise((res, rej) => {
            constants.fileProducts.map(async(url) => {
                console.log('1')
                const { data } = await axios.get(`https://challenges.coode.sh/food/data/json/${url}`, {
                    responseType: "arraybuffer",
                    decompress: true,
                });
                console.log('2')
                zlib.gunzip(data, (error, result) => {
                    console.log('error', error);

                    if(error) rej(error)
                    console.log('3')
                    const textPart = result.toString(undefined, 0, 300 * 2000);
                    console.log('textPart')
                    const listProducts = this.processData(textPart);
                    console.log('listProducts')
                    allProducts.push(...listProducts);
                    console.log('allProducts')
                    console.log('count', count);

                    count--;
                    if(count === 0) res(allProducts)
                });
            })
        })
    }
}