import puppeteer from 'puppeteer';
import {IDataInsert} from "./interface/interface"
import {DB} from './db/db'
import {client} from './db/postgresDb'


(async () =>{
    const fs = require('fs');
    const path = require('path');
    const moment = require('moment');

    const keyword = '공구';
    const host: string = `https://www.instagram.com/`

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(host, {waitUntil: 'networkidle2'});

    await page.waitFor(40000);

    let count = 1;

    page.goto('https://www.instagram.com/explore/tags/공구/',  {waitUntil: 'networkidle2'});
    await page.waitFor(10000);

    // 페이지 무한 스크롤 다운

    let scrollHeight = 50000;
    let previousHeight = null;
    /*while ( scrollHeight > previousHeight) {
        await page.evaluate(`window.scrollTo(0,${scrollHeight})`);
        previousHeight = await page.evaluate('document.body.scrollHeight');

        await page.waitFor(1000);

        console.log(previousHeight);
        console.log(scrollHeight);
    }*/
    
    await page.click('#react-root > section > main > article > div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1) > a > div.eLAPa > div._9AhH0')

    await page.waitFor(4000);

    const postCnt = await page.evaluate(() => {
        return document.querySelectorAll('div:nth-child(3) > div > div > div > a > div.eLAPa > div._9AhH0').length
    });

    const row = Number(postCnt) / 3 

    //가장 마지막 post 내 href 클릭
    const lastPosthref = await page.evaluate((row) => {
        return document.querySelector('div:nth-child(3) > div > div:nth-child('+String(row)+') > div:nth-child(3) > a').getAttribute('href')
    }, row);
    

    console.log(lastPosthref);

    //document.querySelectorAll('div:nth-child(3) > div > div:nth-child(1) > div:nth-child(2) > a > div.eLAPa > div._9AhH0');
    page.mainFrame().hover('div:nth-child(3) > div > div > div > a > div.eLAPa > div._9AhH0');

    await page.waitFor(4000);

    //div class qn-0x
    //mousehover로 like 이랑 comment count  세기
    let likeCount = null;
    likeCount  = await page.evaluate(() => {
        if (document.querySelector('div.qn-0x > ul > li > div._7UhW9 > span') == null){
            return null
        } else {
            return document.querySelector('div.qn-0x > ul > li > div._7UhW9 > span').textContent
        }
    });

    let commentCount = null;
    commentCount  = await page.evaluate(() => {
        if (document.querySelector('div.qn-0x > ul > li > div._1P1TY > span') == null){
            return null
        } else {
            return document.querySelector('div.qn-0x > ul > li > div._1P1TY > span').textContent
        }
    });

    //각 포스트별 url 재수집
    const hrefs1 = await page.evaluate(
        () => Array.from (
            document.querySelectorAll('#react-root > section > main > article > div:nth-child(3) > div > div > div > a'),
            a => 'https://www.instagram.com'+a.getAttribute('href')
        )
    );

    await page.waitFor(4000);

    //태그 결과들을 가져오기
    //for (const j of hrefs1) {
        //게시글을 클릭해서 팝업창을 띄움

        //await page.goto(j, {waitUntil: 'networkidle2'});
        //await page.waitFor(5000);

        // 프로필가서 팔로워수, 게시일 데이터 수집

        // let followerCount = null;
        // followerCount  = await page.evaluate(() => {
        //     if (document.querySelector('#react-root > section > main > div > ul > li:nth-child(2) > a > div > span') == null){
        //         return null
        //     } else {
        //         return document.querySelector('#react-root > section > main > div > ul > li:nth-child(2) > a > div > span').textContent
        //     }
        // });

        //게시글 올린이 아이디들 
        // const IdList = await page.evaluate(
        //     () => Array.from (
        //         document.querySelectorAll('a.sqdOP'),
        //         a => a.textContent
        //     )
        // );

        //const comcnt = IdList.filter(id => id != IdList[0]);

        // console.log("IdList:>>>>>>>>>>>");
        // console.log(IdList);

        //게시글 올린이 게시글들
        // const ContentList = await page.evaluate(
        //     () => Array.from (
        //         document.querySelectorAll('span._7UhW9'),
        //         span => span.textContent
        //     )
        // );

        // console.log("ContentList:>>>>>>>>>>>");
        // console.log(ContentList);

        //게시글 올린 시각들
        // const UploadTimeList = await page.evaluate(
        //     () => Array.from (
        //         document.querySelectorAll('time.FH9sR'),
        //         time => time.getAttribute("datetime")
        //     )
        // );

        //console.log("UploadTimeList:>>>>>>>>>>>");
        //console.log(UploadTimeList);
        
        // let LikeCount = null;
        // LikeCount = await page.evaluate(() => {
        //     if (document.querySelector('a > div._7UhW9 > span') == null) {
        //         return null
        //     } else{
        //         return document.querySelector('a > div._7UhW9 > span').textContent
        //     }
        // });

        //console.log("LikeCount:>>>>>>>>>>>");
        //console.log(LikeCount);

        // if (UploadTimeList[0] < '202022-05-26T00:00:00') {
        //     break;
        // }

    //DB insert
    // const results:{count: number, usrid:string, likecnt: string, uploaddate: string, comcnt: string, followcnt: string, inputdate: string}[] = [];


    // client.connect(err => {
    //     if (err) console.log(err);
    //     else {
    //         console.log("success");
    //     }
    // });

    // results.push({count, usrid:IdList[0], likecnt: LikeCount, uploaddate:UploadTimeList[0],comcnt: String(IdList.length -1) , followcnt:String(followerCount), inputdate: String( new Date())});

    // count = count +1;

    // console.log("result: >>>>>>>")
    // console.log(results);
    //const insert = await client.db(DB.NAME).collection(DB.COLLECTIONS.GONG_GU).insertOne(insertData);
    //const sql = 'INSERT INTO gonggu (seq, usrid, likecnt, uploaddate, comcnt, followcnt, inputdate) VALUES ($1, $2, $3, $4, $5, $6, $7)'

    // client.query(sql, results, (err, res) => {
    //     console.log(err, res)
    //     client.end()
    // });

    // }

})();


