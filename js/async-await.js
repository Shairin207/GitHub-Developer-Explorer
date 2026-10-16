function getData(){


return new Promise(
(resolve,reject)=>{


let success=true;



if(success){

resolve(
"Promise completed successfully"
);

}

else{

reject(
"Promise failed"
);

}


});


}




async function run(){


try{


let result =
await getData();



console.log(result);



}


catch(error){


console.log(error);


}


}



run();