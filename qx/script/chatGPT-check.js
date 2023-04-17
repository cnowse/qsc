const BASE_URL_GPT = 'https://chat.openai.com/'
const Region_URL_GPT = 'https://chat.openai.com/cdn-cgi/trace'

var opts1 = {
    policy: $environment.params,
    redirection: false
};

support_countryCodes=["T1","XX","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BD","BB","BE","BZ","BJ","BT","BA","BW","BR","BG","BF","CV","CA","CL","CO","KM","CR","HR","CY","DK","DJ","DM","DO","EC","SV","EE","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KW","KG","LV","LB","LS","LR","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PE","PH","PL","PT","QA","RO","RW","KN","LC","VC","WS","SM","ST","SN","RS","SC","SL","SG","SK","SI","SB","ZA","ES","LK","SR","SE","CH","TH","TG","TO","TT","TN","TR","TV","UG","AE","US","UY","VU","ZM","BO","BN","CG","CZ","VA","FM","MD","PS","KR","TW","TZ","TL","GB"]

function testChatGPT() {
    return new Promise((resolve, reject) => {
        let option = {
            url: BASE_URL_GPT,
            opts: opts1,
            timeout: 2800,
        }
        $task.fetch(option).then(response => {
            let resp = JSON.stringify(response)
            console.log("ChatGPT Main Test")
            let jdg = resp.indexOf("text/plain")
            if (jdg == -1) {
                let option1 = {
                    url: Region_URL_GPT,
                    opts: opts1,
                    timeout: 2800,
                }
                $task.fetch(option1).then(response => {
                    console.log("ChatGPT Region Test")
                    let region = response.body.split("loc=")[1].split("\n")[0]
                    console.log("ChatGPT Region: " + region)
                    let res = support_countryCodes.indexOf(region)
                    if (res != -1) {
                        result["ChatGPT"] = "<b>ChatGPT: </b>支持 " + arrow + "⟦" + flags.get(region.toUpperCase()) + "⟧ 🎉"
                        console.log("支持 ChatGPT")
                        resolve("支持 ChatGPT")
                        return
                    } else {
                        result["ChatGPT"] = "<b>ChatGPT: </b>未支持 🚫"
                        console.log("不支持 ChatGPT")
                        resolve("不支持 ChatGPT")
                        return
                    }
                }, reason => {
                    console.log("Check-Error" + reason)
                    resolve("ChatGPT failed")
                })
            } else {
                result["ChatGPT"] = "<b>ChatGPT: </b>未支持 🚫"
                console.log("不支持 ChatGPT")
                resolve("不支持 ChatGPT")
            }
        }, reason => {
            console.log("ChatGPT-Error" + reason)
            resolve("ChatGPT failed")
        })
    })
}