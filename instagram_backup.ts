import puppeteer from 'puppeteer';


(async () =>{
    const fs = require('fs');
    const path = require('path');
    const moment = require('moment');

    const keyword = '구글';
    const channel = 'instagram';
    const host: string = `http://www.instagram.com`
    const startDate = '2019-08-01';
    const endDate = '2019-08-31';
    const filename = `${keyword}_${channel}_${startDate}_${endDate}.txt`;
    const fields = ['date', 'title', 'user', 'content', 'click', 'link'];
    const logs = fs.createWriteStream(path.join(__dirname, filename));

    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(host, {waitUntil: 'networkidle2'});



    await page.focus('#react-root > section > main > article > div.rgFsT > div:nth-child(1) > div > form > div:nth-child(2) > div > label > input')
    page.keyboard.type('01076507082');
    await page.waitFor(2000)
    await page.focus('#react-root > section > main > article > div.rgFsT > div:nth-child(1) > div > form > div:nth-child(3) > div > label > input')
    page.keyboard.type('fpahsk98!');
    await page.waitFor(2000)
    await page.click('#react-root > section > main > article > div.rgFsT > div:nth-child(1) > div > form > div:nth-child(4)');
    await page.waitForNavigation();

    await page.click('#react-root > section > main > div > div > div > div > button');
    await page.waitFor(2000);
    await page.click('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm');
    await page.click('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.LWmhU._0aCwM > input');
    await page.waitFor(5000);
    //로그인 성공

    // 키워드 검색창 입력
    await page.focus('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.LWmhU._0aCwM > input')
    page.keyboard.type(keyword)

    //url 들 모으기
    await page.waitFor(5000);
    const url_list = await page.evaluate(() =>
        Array.from(document.querySelectorAll('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.LWmhU._0aCwM > div:nth-child(4) > div.drKGC > div > a'),
                a=>'https://www.instagram.com'+a.getAttribute('href')))

    for (const j of url_list) {
        page.goto(j,  {waitUntil: 'networkidle2'});

        // 페이지 스크롤 다운
        const pageDown = async page => {
            const scrollHeight = 'document.body.scrollHeight';
            let previousHeight = await page.evaluate(scrollHeight);
            await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
            await page.waitForFunction(`${scrollHeight} > ${previousHeight}`, {
                timeout: 30000
            });
        };
        await page.waitFor(5000);

        // 각 포스트별 url 재수집
        const hrefs1 = await page.evaluate(
            () => Array.from (
                document.querySelectorAll('#react-root > section > main > article > div:nth-child(3) > div > div > div > a'),
                a => 'https://www.instagram.com'+a.getAttribute('href')
            )
        );

        // 태그 결과들을 가져오기
        const pageResult:{tags:string|null}[] =[];
        for (const j of hrefs1) {

            await page.goto(j, {waitUntil: 'networkidle2'});

            const content = await page.evaluate(() => {
                return document.querySelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK > span').textContent            });

            pageResult.push(content);

        }
        console.log(pageResult);
    }














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
})();


