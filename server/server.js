const express = require("express")
const mysql = require('mysql');
const path = require('path');
const cors = require('cors')
const app = express();
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'orderdb'
  });
const fs = require('fs');

con.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
      }
    
      console.log('Connected to the MySQL server.');
});
app.use(
    cors({
        origin: '*',
    })
);
app.get('/orders',(req,res)=>{
  let query = `select * from orderdb.orders`;
  const { sort, direction } = req.query;
  const columnMappings = {
    orderId: 'ID',
    orderCategory:'Category', 
    orderSubCategory:'SubCategory', 
    orderSegment:'Segment',
    orderProdutName:'ProductName', 
    orderDate:'OrderDate',
    orderRegion:'Region',
    orderProfit:'Profit', 
    orderSales:'Sales',
  };

  if(sort && direction && columnMappings[sort]){
      const sortMatchColumnName = columnMappings[sort];
      query +=` ORDER BY ${sortMatchColumnName} ${direction}`
    }
  console.log(`[Orders API] ${query}`)
     con.query(query,(err,ordersResult)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:'Failed to fetch order table data'})
        return;
        }
        con.query('select * from orderlineitem', (err, lineItemsResult) => {
            if (err) {
              console.log(err);
              res.status(500).json({ error: 'Failed to fetch order line items data' });
              return;
            }
            const ordersWithLineItems = ordersResult.map((order) => {
                const lineItems = lineItemsResult.filter((item) => item.OrderID === order.ID);
                // check if the image exists for a lineitem and convert the image to base64
                // .map((item) => ({ ...item, Image: item.Image ? convertImageToBase64(item.Image) : null }));
                return { ...order, lineItems };
              });
        /*Convert the image data to base64
         function convertImageToBase64(image) {
         const imageData = fs.readFileSync(image);
         const base64Image = Buffer.from(imageData).toString('base64');
         return base64Image;
       } */
              res.json(ordersWithLineItems);
        });
    });
});

app.listen(5000,()=> {
    console.log("server started port 5000")
})


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});