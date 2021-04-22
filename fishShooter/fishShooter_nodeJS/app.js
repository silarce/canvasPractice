let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000);

app.use( express.static( "public" ) );




app.get("/", function (req, res) {

    let mysql = require('mysql')
    let conn = mysql.createConnection({
        user: "root",
        password: "",
        host: '127.0.0.1',
        port: 3306,
        database: 'fishshooter'
    });

    // connect()是做什麼用的?
    // connect()用來連接資料庫，
    // 不使用這個method仍會連上資料庫可能是因為套件偵測到漏掉這個步驟而自動補上
    conn.connect(function (err) {
        if (err) {
            res.send("連線錯誤")
            console.log("連線錯誤");
        }
    })

    conn.query(
        "select * from betrecord",
        function (err, result) {
            res.send(JSON.stringify(result));
            // res.send(result[0]);
            // console.log(result);
        }
    )
})

app.get("/test", function (req, res) {

    let mysql = require('mysql')
    let conn = mysql.createConnection({
        user: "root",
        password: "",
        host: '127.0.0.1',
        port: 3306,
        database: 'fishshooter'
    });

    conn.connect();

    let sql = 
    `insert into betrecord
    values(
        0002, "測試帳號", "2021/04/21 14:42:33",
        "捕魚機 標準砲彈", 3, 996, 2, -1, 995,
        "fish01,fish01,fish02", "fish01,fish01",
        "2021/04/21 14:45:23"
    )`

    conn.query(
        sql,
        function(err,result){
            res.send("INSERT~~~")
            // console.log(sql);
        }
    )
})

app.post("/ajaxtest", function(req,res){


    console.log(req.body);
    
})










