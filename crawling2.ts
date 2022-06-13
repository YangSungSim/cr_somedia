import puppeteer from 'puppeteer';
import {TimeoutError} from "puppeteer/Errors";
import {IDataInsert} from "./interface/interface"
import {DB} from './db/db'

//아산시청
/*
(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `https://www.asan.go.kr/main/cms/?m_mode=list&tb_nm=freeboard&category=&PageNo=${pageid}&no=202`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll("#sub_page_area > div.page_content.pageContent > div.customContents > form > table > tbody > tr > td.title.alignLeft > a"),
                a => 'https://www.asan.go.kr/main/cms/'+a.getAttribute('href')
            )
        );

        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];
        for (const j of hrefs1) {

            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('#sub_page_area > div.page_content.pageContent > div.customContents > div.ct_tc14 > div.field.field-name-body.field-type-text-with-summary.field-label-hidden > div > div').textContent.replace(/\s/g,'').replace(`(function(){varb=!1,c="//www.mediacategory.com/servlet/adBanner?from="+escape(document.referrer)+"&s=133129&iwh=300_250&igb=74&cntad=1&cntsr=1",d=function(){b=!0;document.getElementById("mobonDivBanner_133129").innerHTML="<iframename=\'ifrad\'width=\'300\'height=\'250\'id=\'mobonIframe_133129\'src=\'"+c+"\'frameBorder=\'0\'marginWidth=\'0\'marginHeight=\'0\'scrolling=\'no\'></iframe>"};try{document.write("<d"+"ivid=\'mobonDivBanner_133129\'></d"+"iv>");vare=setTimeout(d,1E3),f=document.getElementsByTagName("head").item(0),a=document.createElement("script");a.src="//cdn.megadata.co.kr/js/media/1.1/MBSHandler.js";a.type="text/javascript";a.async?a.async=!0:a.defer=!0;a.onload=function(){!0!==b&&(clearTimeout(e),enlipleMBSHandler(enlipleMBSHandler.getProductTypeCode("banner"),enlipleMBSHandler.getWebCode(),133129).createBanner(c,"300","250"))};f.appendChild(a)}catch(g){d()}})();`,'')
            });

            const headTitle = await page.evaluate(() => {
                return document.querySelector('#sub_page_area > div.page_content.pageContent > div.customContents > dl > dt').textContent
            });


            const regDate = await page.evaluate(() => {
                return document.querySelector('#sub_page_area > div.page_content.pageContent > div.customContents > dl > dd > b:nth-child(4)').textContent
            });

            const pageUrl = j;

            const idx =j.split('no=')[1].split('&')[0]

            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult

    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=2;i<542;i++) {
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        try {
            result.push(...await getHTML(i));
            for (let k of result) {

                const insertData: IDataInsert = {
                    idx:parseInt(k.idx),
                    webSiteName: "아산시청",
                    title: k.headTitle,
                    contents: k.content,
                    url: k.pageUrl,
                    regDate: new Date(),
                    inputDate:  new Date(k.regDate),
                    category:'시민의견'
                }
                console.log(insertData)
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                /!*if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                    const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                } else {
                    break
                    page.close();
                }*!/
            }
        } catch(e) {
            continue
        }

    }
})();
*/


//계룡시청
/*(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `https://www.gyeryong.go.kr/_prog/_board/?code=m4_04&site_dvs_cd=kr&menu_dvs_cd=0407&skey=&sval=&GotoPage=${pageid}`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll("#txt > div.board_listWrap > div > div > table > tbody > tr > td.title > a"),
                a => 'https://www.gyeryong.go.kr/_prog/_board'+a.getAttribute('href').slice(1,-1)
            ));

        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];
        let count = 0;
        for (const j of hrefs1) {

            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('#txt > div.board_viewDetail').textContent.replace(/\s/g,'')
            });

            const headTitle = await page.evaluate(() => {
                return document.querySelector('#txt > div.board_viewTit > h4').textContent.replace('제　목','')
            });

            const regDate = await page.evaluate(() => {
                return document.querySelector('#txt > ul > li.date').textContent.replace('작성일','')
            });


            const pageUrl = j;
            count ++;
            let idx = "";

            idx = String(10 * (pageid-1) + count)

            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult

    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=1;i<1723;i++) {
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        try {
            result.push(...await getHTML(i));
            for (let k of result) {

                const insertData: IDataInsert = {
                    idx:parseInt(k.idx),
                    webSiteName: "계룡시청",
                    title: k.headTitle,
                    contents: k.content,
                    url: k.pageUrl,
                    regDate: new Date(),
                    inputDate:  new Date(k.regDate),
                    category:'시민의견'
                }
                console.log(insertData)
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                /!*if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                    const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                } else {
                    break
                    page.close();
                }*!/
            }
        } catch(e) {
            continue
        }

    }
})();*/

//금산군청
/*(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `http://www.geumsan.go.kr/_prog/_board/?code=sub03_030504&site_dvs_cd=kr&menu_dvs_cd=03&skey=&sval=&site_dvs=&&GotoPage=${pageid}`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll("#txt > div.board_list > table > tbody > tr > td.title > a"),
                a => 'http://www.geumsan.go.kr/_prog/_board'+a.getAttribute('href').slice(1,-1)
            ));

        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];
        let count = 0;
        for (const j of hrefs1) {

            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('#txt > article > div.board_view_content > div').textContent.replace(/\s/g,'')
            });

            const headTitle = await page.evaluate(() => {
                return document.querySelector('#txt > article > div.board_view_header > h2 > span').textContent.replace('제　목','')
            });

            const regDate = await page.evaluate(() => {
                return document.querySelector('#txt > article > div.board_view_header > ul > li.date').textContent.replace('등록일','')
            });

            const pageUrl = j;
            count ++;
            let idx = "";
            idx = String(10 * (pageid-1) + count)

            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult

    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=1;i<1217;i++) { //1217
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        try {
            result.push(...await getHTML(i));
            for (let k of result) {

                const insertData: IDataInsert = {
                    idx:parseInt(k.idx),
                    webSiteName: "금산군청",
                    title: k.headTitle,
                    contents: k.content,
                    url: k.pageUrl,
                    regDate: new Date(),
                    inputDate:  new Date(k.regDate),
                    category:'시민의견'
                }
                console.log(insertData)
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                /!*if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                    const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                } else {
                    break
                    page.close();
                }*!/
            }
        } catch(e) {
            continue
        }

    }
})();*/


//예산군청
(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `http://www.yesan.go.kr/cop/bbs/BBSMSTR_000000000076/selectBoardList.do?bbsId=BBSMSTR_000000000076&pageIndex=${pageid}&kind=&searchCnd=&searchWrd=`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll("#txt > table > tbody > tr > td.left > div > span > a"),
                a => 'http://www.yesan.go.kr'+a.getAttribute('href')
            ));

        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];
        let count = 0;
        for (const j of hrefs1) {

            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('#txt > div > table > tbody > tr:nth-child(4) > td').textContent.replace(/\s/g,'')
            });


            const headTitle = await page.evaluate(() => {
                return document.querySelector('#txt > div > table > tbody > tr:nth-child(1) > td').textContent.replace(/\s/g,'')
            });


            const regDate = await page.evaluate(() => {
                return document.querySelector('#txt > div > table > tbody > tr.problem > td:nth-child(4)').textContent.replace(/\s/g,'')
            });


            const pageUrl = j;

            count ++;
            let idx = "";
            idx = String(10 * (pageid-1) + count)

            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult

    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=1;i<163;i++) {
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        try {
            result.push(...await getHTML(i));
            for (let k of result) {

                const insertData: IDataInsert = {
                    idx:parseInt(k.idx),
                    webSiteName: "예산군청",
                    title: k.headTitle,
                    contents: k.content,
                    url: k.pageUrl,
                    regDate: new Date(),
                    inputDate:  new Date(k.regDate),
                    category:'시민의견'
                }
                console.log(insertData)
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                /*if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                    const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                } else {
                    break
                    page.close();
                }*/
            }
        } catch(e) {
            continue
        }

    }
})();


//태안군청
(async () =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    async function getHTML (pageid: number = 1): Promise<{ headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null }[]> {
        const url2: string = `https://www.taean.go.kr/cop/bbs/BBSMSTR_000000000048/selectBoardList.do?bbsId=BBSMSTR_000000000048&pageIndex=${pageid}&kind=&searchCnd=&searchWrd=`
        await page.goto(url2, {waitUntil: 'networkidle2'}) ;

        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll("#txt > div.prog_content > table > tbody > tr > td.left > div > div > a"),
                a => 'https://www.taean.go.kr'+a.getAttribute('href')
            ));


        const pageResult:{headTitle:string|null,regDate:string|null,pageUrl:string|null,content:string|null,idx:string|null}[] =[];
        let count = 0;
        for (const j of hrefs1) {

            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('#txt > div:nth-child(1) > form > table > tbody > tr:nth-child(4) > td > div').textContent.replace(/\s/g,'')
            });


            const headTitle = await page.evaluate(() => {
                return document.querySelector('#txt > div:nth-child(1) > form > table > tbody > tr:nth-child(1) > td').textContent.replace(/\s/g,'')
            });


            const regDate = await page.evaluate(() => {
                return document.querySelector('#txt > div:nth-child(1) > form > table > tbody > tr:nth-child(2) > td:nth-child(4)').textContent.replace(/\s/g,'')
            });


            const pageUrl = j;

            const idx = pageUrl.split('nttId=')[1].split('&')[0]


            pageResult.push({headTitle,regDate,pageUrl,content,idx});
        }
        return pageResult

    }

    const db = DB.MongoConn.getInstance;
    const client = await db.connect();

    for(let i=1;i<347;i++) {
        const result:{headTitle:string,regDate:string,pageUrl:string,content:string,idx:string}[] = [];
        try {
            result.push(...await getHTML(i));
            for (let k of result) {

                const insertData: IDataInsert = {
                    idx:parseInt(k.idx),
                    webSiteName: "태안군청",
                    title: k.headTitle,
                    contents: k.content,
                    url: k.pageUrl,
                    regDate: new Date(),
                    inputDate:  new Date(k.regDate),
                    category:'시민의견'
                }
                console.log(insertData)
                const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                /*if (insertData['regDate'].toDateString() === insertData['inputDate'].toDateString()) {   //today articles
                    const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.RAW_DATA).insertOne(insertData)
                } else {
                    break
                    page.close();
                }*/
            }
        } catch(e) {
            continue
        }

    }
})();