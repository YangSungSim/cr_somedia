var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from 'puppeteer';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const fs = require('fs');
    const path = require('path');
    const moment = require('moment');
    const keyword = '공구';
    const channel = 'instagram';
    const host = `https://www.instagram.com/yjs7082/channel/`;
    const startDate = '2022-05-23';
    const endDate = '2022-05-24';
    const filename = `${keyword}_${channel}_${startDate}_${endDate}.txt`;
    const fields = ['date', 'title', 'user', 'content', 'click', 'link'];
    const logs = fs.createWriteStream(path.join(__dirname, filename));
    //const puppeteer = require('puppeteer');
    const browser = yield puppeteer.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto(host, { waitUntil: 'networkidle2' });
    // 키워드 검색창 입력
    yield page.focus('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.QY4Ed.P0xOK > input');
    page.keyboard.type(keyword);
    //url 들 모으기
    yield page.waitFor(5000);
    const url_list = yield page.evaluate(() => Array.from(document.querySelectorAll('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.QY4Ed.P0xOK > div.yPP5B > div > div._01UL2 > div > div > a'), a => 'https://www.instagram.com' + a.getAttribute('href')));
    console.log("url_list: >>>>>>>>>>.");
    console.log(url_list);
    // for (const j of url_list) {
    //     page.goto(j,  {waitUntil: 'networkidle2'});
    //     // 페이지 스크롤 다운
    //     const pageDown = async page => {
    //         const scrollHeight = 'document.body.scrollHeight';
    //         let previousHeight = await page.evaluate(scrollHeight);
    //         await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
    //         await page.waitForFunction(`${scrollHeight} > ${previousHeight}`, {
    //             timeout: 30000
    //         });
    //     };
    //     await page.waitFor(5000);
    //     // 각 포스트별 url 재수집
    //     const hrefs1 = await page.evaluate(
    //         () => Array.from (
    //             document.querySelectorAll('#react-root > section > main > article > div:nth-child(3) > div > div > div > a'),
    //             a => 'https://www.instagram.com'+a.getAttribute('href')
    //         )
    //     );
    //     // 태그 결과들을 가져오기
    //     const pageResult:{tags:string|null}[] =[];
    //     for (const j of hrefs1) {
    //         await page.goto(j, {waitUntil: 'networkidle2'});
    //         const content = await page.evaluate(() => {
    //             return document.querySelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK > span').textContent            });
    //         pageResult.push(content);
    //     }
    //     console.log(pageResult);
    // }
    /* await page.goto(`https://www.instagram.com/explore/tags/${keyword}/`, {waitUntil: 'networkidle2'});
 
     const pageDown = async page => {
         const scrollHeight = 'document.body.scrollHeight';
         let previousHeight = await page.evaluate(scrollHeight);
         await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
         await page.waitForFunction(`${scrollHeight} > ${previousHeight}`, {
             timeout: 30000
         });
     };
     await page.waitFor(5000);
 
     const hrefs1 = await page.evaluate(
         () => Array.from (
             document.querySelectorAll('#react-root > section > main > article > div:nth-child(3) > div > div > div > a'),
             a => 'https://www.instagram.com'+a.getAttribute('href')
         )
     );
 
     const pageResult:{tags:string|null}[] =[];
     for (const j of hrefs1) {
 
         await page.goto(j, {waitUntil: 'networkidle2'});
 
         const tags = await page.evaluate(() => {
             return Array.from(document.querySelectorAll('a.xil3i')).map(dom=>{return dom.textContent})
         });
 
         pageResult.push(tags);
 
     }
     console.log(pageResult);*/
}))();
