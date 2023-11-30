const keyword_extractor = require("keyword-extractor");
var fs = require("fs");

var file = [];
var total = 1023; //number of files
for(var i = 0 ;i<total ; i++)
{
    file.push(`./problems/problem${i+1}.txt`);
}

var container  = new Set();
var arr = [] ;
var word_count = [] ; 
var len = [] ;
var words = [] ; 

for(var i = 0 ;i<total;i++)
{
    var text = fs.readFileSync(file[i] , 'utf8');
    text = text.toString();
    
    var keyword = keyword_extractor.extract(text,{
        language:"english",
        remove_digits: false,
        return_changed_case:true,
        remove_duplicates: false
    
    });

    arr.push(keyword);

    for(var j = 0 ; j< keyword.length ; j++)
    {
        container.add(keyword[j]);
    }
    
    // tracking the word count in each document

    var cnt = new Map();
    for(var j = 0 ; j<keyword.length ; j++)
    {
        if(cnt.has(keyword[j]) == false){
            cnt.set(keyword[j] , 1);
        }    
        else{
            cnt.set(keyword[j] , cnt.get(keyword[j])+1);
        }
    }
    word_count.push(cnt);
    len.push(keyword.length);
}

var unique = [] ;

for(var element of container)
{
    unique.push(element);
}

unique.sort();

// const writeStream = fs.createWriteStream('keyword.txt');
// const pathName = writeStream.path;
 
// unique.forEach(value => writeStream.write(`${value}\n`));

// writeStream.on('finish', () => {
//    console.log(`wrote all the array data to file ${pathName}`);
// });

// writeStream.on('error', (err) => {
//     console.error(`There is an error writing the file ${pathName} => ${err}`)
// });

// writeStream.end();


// idf calculation

var idf_value = [] ;

for(var i = 0 ; i<unique.length ; i++)
{
    var cur = unique[i];
    var cnt = 0;
    
    for(var j = 0 ; j<total ; j++)
    {
        if(arr[j].indexOf(cur) != -1)
            cnt = cnt + 1;        
    }

    var idf_raw = (1+total)/(1+cnt);
    var idf = Math.log10(idf_raw) + 1;
    idf_value.push(idf);
}


// const writeStream = fs.createWriteStream('idf.txt');
// const pathName = writeStream.path;
 
// idf_value.forEach(value => writeStream.write(`${value}\n`));

// writeStream.on('finish', () => {
//    console.log(`wrote all the array data to file ${pathName}`);
// });

// writeStream.on('error', (err) => {
//     console.error(`There is an error writing the file ${pathName} => ${err}`)
// });

// writeStream.end();


// tf-idf calculation

var tf_idf_value = [];
var tf_idf_frosaving = [] ;
var bigstr = "";
var mod_value = [];

for(var i = 0 ; i<total ; i++)
{
    var mod = 0;
    for(var j =0 ; j<unique.length ; j++)
    {
        var cur = unique[j];
        var check = arr[i].indexOf(cur);
        if( check != -1)
        {
            var tf = word_count[i].get(unique[j])/len[i];
            var tf_val = parseFloat(tf);
            var str = `${i} ${j} ${tf}`;
            bigstr = `${bigstr}\n${str}`;

            mod = mod + (tf*tf);            
        }
    }
    mod = Math.sqrt(mod);
    mod_value.push(mod);
}

fs.writeFileSync("tf-idf.txt", bigstr , (err) => {
              if (err) throw err;
            });


const writeStream = fs.createWriteStream('mod.txt');
const pathName = writeStream.path;
    
mod_value.forEach(value => writeStream.write(`${value}\n`));

writeStream.on('finish', () => {
   console.log(`wrote all the array data to file ${pathName}`);
});

writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
});

writeStream.end();

