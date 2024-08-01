//คำสั่ง import express
const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000

//Database(mysql2) configulation
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "1234",
        database: "shopee"
    }
)
db.connect() //คอนเนค

// แปลงข้อมูลจาก client ที่เป็นรูปแบบ json ให้เป็น object
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// เก็บข้อมูล login username , password เอาไว้เชคใน database
app.post('/api/login', function (req, res) {
    const { username, password } = req.body
    const sql = "SELECT * FROM customer WHERE username = ? AND password = ?"

    db.query(sql, [username, password], function (err, result) {
        if(err) throw err
        if(result.length > 0){
            let customer = result[0]
            customer['massage'] = "เข้าสู่ระบบสำเร็จ"
            customer['status'] = true

            res.send(customer)

        }else{
            res.send({"message":"กรุณาระบุรหัสผู่ใช้และรหัสผ่านให้ถูกต้อง","status":false})
        }
    })

})

app.listen(port, function() {
    console.log(`Example app listening on port ${port}`)
})

