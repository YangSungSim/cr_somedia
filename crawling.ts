import puppeteer from 'puppeteer';
import {TimeoutError} from "puppeteer/Errors";
import {IDataInsert} from "./interface/interface"
import {DB} from './db/db'

//천안아산신문
/*(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `http://www.canews.kr/news/articleList.html?page=${pageid}&total=3062&sc_section_code=S1N1&sc_sub_section_code=&sc_serial_code=&sc_area=&sc_level=&sc_article_type=&sc_view_level=&sc_sdate=&sc_edate=&sc_serial_number=&sc_word=&sc_word2=&sc_andor=&sc_order_by=E&view_type=sm`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll('#user-container > div.float-center.max-width-1080 > div.user-content > section > article > div.article-list > section > div > div.list-titles > a'),
                a =>'http://www.canews.kr'+ a.getAttribute('href')
            )
        );

        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];

        for (const j of hrefs1) {
            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = (await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#article-view-content-div > p')).map(dom => {
                    return dom.textContent.replace(/\s/g,'')
            })})).toString();


            const headTitle = await page.evaluate(() => {
                return document.querySelector('#user-container > div.float-center.max-width-1080 > header > header > div').textContent
            });


            const regDate = await page.evaluate(() => {
                return document.querySelector('#user-container > div.float-center.max-width-1080 > header > section > div > ul > li:nth-child(2)').textContent.replace('승인 ', '')
            });


            const pageUrl = j;
            const idx = j.split('no=')[1]
            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult
    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=1;i<5;i++) {
        const result:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] = [];
        result.push(...await getHTML(i));
        for (let k of result) {
            const insertData:IDataInsert = {
                "idx":parseInt(k.idx),
                "webSiteName":"천안아산신문",
                "title": k.headTitle,
                "contents": k.content,
                "url": k.pageUrl,
                "regDate": new Date(),
                "inputDate": new Date(k.regDate)
            }
            if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
            } else {
                break
                page.close();
            }
        }
    }

})();




//충남매일신문
(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{title:string, result: string, date: string, url: string }[]> {


        return await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.article_view_sec')).map(dom => {
                const title = dom.querySelector('h2.subject > a').textContent
                const texts = Array.from(dom.querySelectorAll('.view_con_wrap')).map(texts => {
                    return texts.textContent
                })

                const url = dom.querySelector('h2.subject > a').getAttribute('href')
                const date = dom.querySelector('.date').textContent.replace('기사입력 :','').trim()
                const result = String(texts).replace(/\s+/g, ' ').trim()
                return {
                    title,
                    result,
                    date,
                    url:'http://www.cnpress.kr'+url
                }
            });
        });

    }
    const results:{title:string, result: string, date: string, url: string}[] = [];

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for (let i = 1;i<30;i++) {
        const url2: string = `http://www.cnpress.kr/news/view.php?no=${i}`
        await page.goto(url2, {waitUntil: 'networkidle2'});

        results.push(...await getHTML(i));

        const insertData: IDataInsert = {
            idx:i,
            webSiteName: "충남매일신문사",
            title: results[results.length-1].title,
            contents: results[results.length-1].result,
            url: results[results.length-1].url,
            regDate: new Date(),
            inputDate:new Date(results[results.length-1].date)
        }
        if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
            const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
        } else {
            break
            page.close();
        }
    }

})();


//충남일보
(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[]> {
        const url2: string = `https://www.chungnamilbo.com/news/articleList.html?page=${pageid}&total=19450&sc_section_code=&sc_sub_section_code=S2N3&sc_serial_code=&sc_area=&sc_level=&sc_article_type=&sc_view_level=&sc_sdate=&sc_edate=&sc_serial_number=&sc_word=&sc_word2=&sc_andor=&sc_order_by=E&view_type=sm`
        await page.goto(url2, {waitUntil: 'networkidle2'});

        const hrefs1 = await page.evaluate(
            () => Array.from(
                document.querySelectorAll('a[class^=line]'),
                a => 'https://www.chungnamilbo.com'+a.getAttribute('href')
            )
        );

        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] = [];

        for (const j of hrefs1) {
            await page.goto(j, {waitUntil: 'networkidle2'});

            const headTitle = await page.evaluate(() => {
                return document.querySelector('div.article-head-title').textContent
            });

            const regDate = await page.evaluate(()=> {
                return document.querySelector('#user-container > div.float-center.max-width-1080 > header > section > div > ul > li:nth-child(2)').textContent.replace('승인','')
            });

            const contentss =  await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div#article-view-content-div')).map(dom => {
                    let text = dom.textContent
                    let result = String(text).replace(/\s+/g, ' ').trim().replace('@media all and (min-width: 1px) and (max-width: 450px) { .dable_placeholder{ width: 100% !important; padding: 10px 0 !important; }}','')
                    return {
                        result

                    }
                });
            });
            const content = contentss[0]['result']
            const pageUrl = j;
            const idx = j.split('idxno=')[1]


            pageResult.push({headTitle,regDate,pageUrl,content,idx})
        }

        return pageResult
    }



    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=1;i<3;i++) {
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        result.push(...await getHTML(i));
        for (let k of result) {
            const insertData: IDataInsert = {
                idx:parseInt(k.idx),
                webSiteName: "충남일보",
                title: k.headTitle,
                contents: k.content,
                url: k.pageUrl,
                regDate: new Date(),
                inputDate: new Date(k.regDate)
            }

           if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
            } else {
                break
                page.close();
            }
        }
    }

})();



//중도일보
(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `http://www.joongdo.co.kr/web/section.php?ncid=N01_02&all=&sword=&page=${pageid}`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll('body > div.width_size > div.container > div.content3 > div.left_content > section > article > h2 > a'),
                a => 'http://www.joongdo.co.kr/web/'+a.getAttribute('href')
            )
        );


        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];

        for (const j of hrefs1) {

            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('div#font').textContent.replace(/\s/g,'');
            });

            const headTitle = await page.evaluate(() => {
                return document.querySelector('p.v-title1').textContent
            });

            const regDate = await page.evaluate(() => {
                return document.querySelector('ul[class=view-term] > li').textContent.replace('승인 ', '')
            });
            const pageUrl = j;
            const idx = j.split('key=')[1]
            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult

    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=1;i<3;i++) {
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        result.push(...await getHTML(i));
        for (let k of result) {
            const insertData: IDataInsert = {
                idx:parseInt(k.idx),
                webSiteName: "중도일보",
                title: k.headTitle,
                contents: k.content,
                url: k.pageUrl,
                regDate: new Date(),
                inputDate: new Date(k.regDate)
            }
           if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
            } else {
                break
                page.close();
            }
        }
    }
})();

//천안신문
(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `http://www.icj.kr/news/index.php?code=netfu_44711_17340&page_rows=10&page=${pageid}#bottom_list`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll('#news_data > div > div.newslist_title02 > h2 > a'),
                a => a.getAttribute('href')
            )
        );


        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];
        for (const j of hrefs1) {
            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('div#view_content').textContent.replace(/\s/g,'').replace('[천안신문]','')
            });


            const headTitle = await page.evaluate(() => {
                return document.querySelector('#contents > article > div > div.news_title01 > h2').textContent
            });


            const regDate = await page.evaluate(() => {
                return document.querySelector('div.view01_date').textContent.replace('기사입력 ', '')
            });

            const pageUrl = j;
            const idx = j.split('no=')[1]
            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult

    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=1;i<3;i++) {
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        result.push(...await getHTML(i));
        for (let k of result) {
            const insertData: IDataInsert = {
                idx:parseInt(k.idx),
                webSiteName: "천안신문",
                title: k.headTitle,
                contents: k.content,
                url: k.pageUrl,
                regDate: new Date(),
                inputDate:  new Date(k.regDate)
            }
            if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
            } else {
                break
                page.close();
            }
        }
    }
})();*/

//조선일보 충청
/*(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `http://news.chosun.com/svc/list_in/list.html?catid=72&pn=${pageid}`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll("#list_body_id > div.list_content > dl > dt > a"),
                a => 'http:'+a.getAttribute('href')
            )
        );


        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];
        for (const j of hrefs1) {

            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('#news_body_id > div.par').textContent.replace(/\s/g,'').replace(`varrurl=document.referrer;document.write('<iframesrc="//adex.ednplus.com/xc/h/Fz55As4F?rurl='+rurl+'"width="250"height="250"frameborder="0"scrolling="no"topmargin="0"leftmargin="0"marginwidth="0"marginheight="0"><\\/iframe>');`,'')
            });


            const headTitle = await page.evaluate(() => {
                return document.querySelector('#news_title_text_id').textContent
            });


            const regDate = await page.evaluate(() => {
                return document.querySelector('#news_body_id > div.news_date').textContent.replace('입력 ', '').split('|')[0]
            });

            const pageUrl = j;

            const idxex = j.split('/')
            const idx = idxex[idxex.length-1].split('.')[0]

            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult

    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=281;i<1093;i++) {
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        result.push(...await getHTML(i));
        for (let k of result) {
            const insertData: IDataInsert = {
                idx:parseInt(k.idx),
                webSiteName: "조선일보 충청",
                title: k.headTitle,
                contents: k.content,
                url: k.pageUrl,
                regDate: new Date(),
                inputDate:  new Date(k.regDate)
            }
            console.log(i)
            const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
            /!*if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
            } else {
                break
                page.close();
            }*!/
        }
    }
})();*/


//충청신문
(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `http://www.dailycc.net/news/articleList.html?page=${pageid}&total=115587&sc_section_code=S1N3&sc_sub_section_code=&sc_serial_code=&sc_area=&sc_level=&sc_article_type=&sc_view_level=&sc_sdate=&sc_edate=&sc_serial_number=&sc_word=&sc_word2=&sc_andor=&sc_order_by=D&view_type=sm`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll("#user-container > div.float-center.max-width-1080 > div.user-content > section > article > div.article-list > section > div> div.list-titles > a"),
                a => 'http://www.dailycc.net'+a.getAttribute('href')
            )
        );


        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];
        for (const j of hrefs1) {

            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('#article-view-content-div').textContent.replace(/\s/g,'').replace(`(function(){varb=!1,c="//www.mediacategory.com/servlet/adBanner?from="+escape(document.referrer)+"&s=133129&iwh=300_250&igb=74&cntad=1&cntsr=1",d=function(){b=!0;document.getElementById("mobonDivBanner_133129").innerHTML="<iframename=\'ifrad\'width=\'300\'height=\'250\'id=\'mobonIframe_133129\'src=\'"+c+"\'frameBorder=\'0\'marginWidth=\'0\'marginHeight=\'0\'scrolling=\'no\'></iframe>"};try{document.write("<d"+"ivid=\'mobonDivBanner_133129\'></d"+"iv>");vare=setTimeout(d,1E3),f=document.getElementsByTagName("head").item(0),a=document.createElement("script");a.src="//cdn.megadata.co.kr/js/media/1.1/MBSHandler.js";a.type="text/javascript";a.async?a.async=!0:a.defer=!0;a.onload=function(){!0!==b&&(clearTimeout(e),enlipleMBSHandler(enlipleMBSHandler.getProductTypeCode("banner"),enlipleMBSHandler.getWebCode(),133129).createBanner(c,"300","250"))};f.appendChild(a)}catch(g){d()}})();`,'')
            });


            const headTitle = await page.evaluate(() => {
                return document.querySelector('#user-container > div.float-center.max-width-1080 > header > div > div').textContent
            });


            const regDate = await page.evaluate(() => {
                return document.querySelector('#user-container > div.float-center.max-width-1080 > header > section > div > ul > li:nth-child(2)').textContent.replace('승인 ', '')
            });

            const pageUrl = j;

            const idx =j.split('idxno=')[1]

            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult

    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=1;i<3;i++) {
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        result.push(...await getHTML(i));
        for (let k of result) {

            const insertData: IDataInsert = {
                idx:parseInt(k.idx),
                webSiteName: "충청신문",
                title: k.headTitle,
                contents: k.content,
                url: k.pageUrl,
                regDate: new Date(),
                inputDate:  new Date(k.regDate)
            }
            //console.log(i)
            //const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
            if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
            } else {
                break
                page.close();
            }
        }
    }
})();