const { getMyUscCookiesDuo1 } = require('./duo/getMyUscCookiesDuo1');
const { getMyUscCookiesDuo2 } = require('./duo/getMyUscCookiesDuo2');
const { username, password } = require('../private/usclogin');
const { getValueByDelimiters, VS } = require('./duo/functions/requestFunctions');
const { tryCatchWrapper } = require('./duo/functions/tryCatchWrapper');
const axios = require('axios');
const { genHeaders } = require('./duo/functions/genHeaders');
const qs = require('qs');

(async () => {
    const bundledData = await getMyUscCookiesDuo1(username, password)
    let allCookies = await getMyUscCookiesDuo2(bundledData)



    
    let announceCounter = 0;
    while (true) {
        announceCounter++;

        await sleep(2000);

        


        // const timeWeWant = '11:45 AM - 1 PM'
        // const timeWeWant = '8:30 - 10:30 PM'
        // const timeWeWant = '10:45 - 11:59 PM';
        const timeWeWant = '1:15 - 3:15 PM'


        const month = (new Date).getMonth() + 1;
        const date = (new Date).getDate();

        let BookingResponse = await tryCatchWrapper(() => axios({
            method: 'get',
            url: `https://myrecsports.usc.edu/booking/cd93ade2-af9d-4e5f-84e0-06e10711b5ce/slots/ea698012-7345-411d-800c-af240dff70d3/2022/${month}/${date}`, //'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST',
            headers: genHeaders(allCookies),
            maxRedirects: 0,
            validateStatus:  VS,
        }), "BookingResponseResponse");

        let parseData = BookingResponse.data;

        let blockWeWant = "";

        let it = 1;
        while (parseData.indexOf(`<div class="booking-slot-item" data-slot-number="${it}"`) !== -1) {
            let block = getValueByDelimiters(parseData, `<div class="booking-slot-item" data-slot-number="${it}"`, 'available</span>')


            if (block.includes(timeWeWant)) {
                // console.log(block)

                blockWeWant = block;
            }

            it++;
        }

        if (blockWeWant === "") {
            console.log(parseData)
            console.log("Time doesnt exist")
            return;
        }


        if (blockWeWant.indexOf('No spots') !== -1) {
            if (announceCounter % 15 === 0) {
                console.log(`Reversation is not avaible, sleeping (${Date.now()})`)
            }
            continue;
        }

        let dataAptId = getValueByDelimiters(blockWeWant, 'data-apt-id="', '"')
        let dataTSID = getValueByDelimiters(blockWeWant, 'data-timeslot-id="', '"')
        let dataTSI_ID = getValueByDelimiters(blockWeWant,'data-timeslotinstance-id="', '"')
        let fId = 'ea698012-7345-411d-800c-af240dff70d3';
        let bId = 'cd93ade2-af9d-4e5f-84e0-06e10711b5ce'


        console.log("Attempting to register...")

        let da = {
            bId: bId,
            fId: fId,
            aId: dataAptId,
            tsId: dataTSID,
            tsiId: dataTSI_ID,
            y: (new Date).getFullYear(),
            m: month,
            d: date,
            t: '',
            v: 0
        };
        console.log(da)
        console.log(qs.stringify(da))


        const RESERVE = await tryCatchWrapper(() => axios({
            method: 'post',
            url: `https://myrecsports.usc.edu/booking/reserve`, //'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST',
            headers: genHeaders(allCookies, {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }),
            maxRedirects: 0,
            validateStatus:  VS,
            data: qs.stringify(da)
        }), "RESERVE");

        console.log(RESERVE.data)

        console.log("Success?")
        return;
    }



    

})();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }