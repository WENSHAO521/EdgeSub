import getParsedSubData from "../internal/getParsedSubData.js";
import { ShareLinkDumper } from "../internal/Dumpers/share-link.js";



export async function onRequest (context) {
    const { request } = context;

    // do convert
    const Proxies = await getParsedSubData(new URL(request.url).searchParams.get("url"), request.headers);
    let Dumper = new ShareLinkDumper();
    let ShareLinkArray = [];
    for (let i of Proxies) {
        if (Dumper[i.__Type]) {
            ShareLinkArray.push(Dumper[i.__Type](i))
        }
    }
    
    // generate final response
    let ShareLinkResponse = ShareLinkArray.join("\n");

    return new Response(ShareLinkResponse, {
        status: 200,
        headers: {
            "Content-Type": "text/plain, charset=utf-8",
        }
    })
}
