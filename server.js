const express = require('express')
const app = express()
const cors = require("cors");
app.use(cors());
var fs = require("fs");
// var natural = require("natural");
// var tokenizer = new natural.WordTokenizer();


app.get("/api" , (req , res) =>{
    console.log(req.query)
    //console.log(req)

    var question = req.query.q.toString();
    //console.log(question);
    var qs = question.split(" ");
    for(var i = 0 ; i<qs.length ; i++)
    {
        qs[i] = qs[i].toLocaleLowerCase();
    }
    console.log(qs);


    var total = 1023;

    var unique = fs.readFileSync("./keyword.txt", "utf8");
    unique = unique.toString();
    unique = unique.split("\n");

    var idf = fs.readFileSync("./idf.txt", "utf8");
    idf = idf.toString();
    idf = idf.split("\n");


    var tfidf = fs.readFileSync("./tf-idf.txt", "utf8");
    tfidf = tfidf.toString();
    tfidf = tfidf.split("\n");

    var mod = fs.readFileSync("./mod.txt", "utf8");
    mod = mod.toString();
    mod = mod.split("\n");

    var title_name = fs.readFileSync("./problem_titles.txt", "utf8");
    title_name = title_name.toString();
    title_name = title_name.split("\n");

    var url_link = fs.readFileSync("./problem_urls.txt", "utf8");
    url_link = url_link.toString();
    url_link = url_link.split("\n");

    var arr = new Array(1100); // create an empty array of length 2000
    for (var i = 0; i < 2000; i++) {
    arr[i] = new Array(10000); // make each element an array
    }

    for(var doc=0;doc<tfidf.length;doc++)
    {
        var curr=tfidf[doc].split(" ");
        var i=parseInt(curr[0]);
        var j=parseInt(curr[1]);
        var val=parseFloat(curr[2]);
        arr[i][j]=val;
    }


    var words = new Map;
    var word_ind = new Map;
    var qarr = [10000];
    var len = 0;
    for(var i = 0 ; i<qs.length ; i++)
    {
        var ind = unique.indexOf(qs[i]);
        if(ind != -1)
        {
            if(words.has(qs[i]) == false)
            {
                words.set(qs[i] , 1);
                qarr[ind] = 1;
                word_ind.set(qs[i] , ind);
            }
            else{
                words.set(qs[i] , words.get(qs[i])+1);
                qarr[ind] = qarr[ind] + 1;
            }
        }
        len = len + 1;
    }
    console.log(len);
    

    for (var i = 0; i < qs.length; i++) {
        var curr = qs[i];
        var idx = unique.indexOf(curr);
        if (idx != -1 && word_ind.get(curr)!=-1) {
          var idf_val = parseFloat(idf[idx]);
          qarr[idx]=qarr[idx]/len;
          word_ind.set(curr,-1);
        }
    }

    var final= new Map();
    for(var i=0;i<total;i++)
    {
        var dp=0;
        var mod_val=parseFloat(mod[i]); // mod to float
        var qm=0;
        for(var j=0;j<qs.length;j++)
        {
            var curr=qs[j];
            var idx=unique.indexOf(curr);
            if((idx!=-1) && (arr[i][idx]!=undefined))
            {
                dp=dp+(arr[i][idx]*qarr[idx]);
                qm=qm+(qarr[idx]*qarr[idx]);
            }
        }
        qm=Math.sqrt(qm);
        var ans;
        if(qm!=0 && mod_val!=0)
        {
            ans=dp/(mod_val*qm);
        }
        if(ans!=undefined && ans != 0)
        {
            final.set(i+1 , ans);
        }
    }

    const newMap = Array.from(final).sort((a, b) => b[1] - a[1])
    const final_new = new Map(newMap);
    
    var final_result = [];
    var flag=0;
    // let my_object = {
    //     title: "",
    //     url: "",
    //     body: "",
    //     index: 0,
    //   };
    for (const [key, value] of final_new.entries()) {
      var idx = key;
      var bd = fs.readFileSync(`./problems/problem${idx}.txt`, "utf8");
      bd = "" + bd.toString();
      if (flag < 5 && value != 0) {
        let my_object = {
          title: title_name[key-1],
          url: url_link[key-1],
          body: bd,
          index: idx,
        };
        // my_object.title = title_name[key-1];
        // my_object.url = url_link[key-1];
        // my_object.bd = bd;
        // my_object.index = idx;
        console.log(my_object);

        flag += 1;
        final_result.push(my_object);
      } else {
        break;
      }
    }
    console.log(final_result);
    res.json(final_result);

    

    // res.json({"name":["aa","bb","cc"]})
})

app.listen(5000, () => {console.log("server started on port 5000")})