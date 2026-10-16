const redis =
require("redis");



const client = redis.createClient({
    url: "redis://127.0.0.1:6379"
});



async function start(){


await client.connect();



await client.set(
"student",
"ISIT207"
);



let value =
await client.get(
"student"
);



console.log(value);



await client.disconnect();


}



start();