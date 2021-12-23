//const crypto = require('crypto');

import sha1 from 'crypto-js/sha1';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Hex from 'crypto-js/enc-hex';
import fetch from 'node-fetch';

export async function checkRequest(id){
    let request = await fetch(`http://opeapi.ws.pho.to/getresult?request_id=${id}`);
    let response = await request.text();
    return response;
    
}

export async function createRequest(cmd){

    let command = cmd;

    //command = command.replace(/\s+/g,"");

    let signed = Hex.stringify(hmacSHA1(command, "ce2dd7e5b91f8b53e3f32dd62f6e2a79"));


    let request = await fetch(`http://opeapi.ws.pho.to/addtask/`,{
        method:"POST",
        headers:{
            "content-type":"application/x-www-form-urlencoded"
        },
        body:new URLSearchParams({
            app_id:"8be1e9814d91fccccb6f31773e5e2413",
            KEY:"ce2dd7e5b91f8b53e3f32dd62f6e2a79",
            sign_data:signed,
            data:command
        }).toString()
    });
    let response = await request.text();

    let status = response.match(/<status>([^<]+)<\/status>/)[1];
    let requestid = response.match(/<request_id>([^<]+)<\/request_id>/)[1]

    return {
        status,
        request_id:requestid
    };

    // 4699b37dbe4de52e526b8e8357e0a2f9923a0f71
    // 4699b37dbe4de52e526b8e8357e0a2f9923a0f71
}


