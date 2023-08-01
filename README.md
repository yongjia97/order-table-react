# Getting Started with Order Table App

### prerequisities
1. Install node.js

### installation
1. Clone the repository to your local machine from my git repo:
# https://github.com/yongjia97/order-table-react.git
### Run frontend in local
once cloned to your local machine:
1. Change to the project directory
   # cd order-table-react/order-ui
2. Install dependencies
   #  npm install
3. Start the development server
   #  npm start

### Configure mysql connection
   
  a. Open the server.js file in the server folder.
  b. Update the MySQL connection configuration with your database credentials (host, user, password, and database name).

### Create table in your database 

CREATE TABLE Orders (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Category VARCHAR(50),
  SubCategory VARCHAR(50),
  Segment VARCHAR(50),
  ProductName VARCHAR(255),
  OrderDate DATE,
  Region VARCHAR(50),
  Profit DECIMAL(10,2),
  Sales DECIMAL(10,2),
  Image BLOB
);

INSERT INTO Orders (Category, SubCategory, Segment, ProductName, OrderDate, Region, Profit, Sales, Image)
VALUES
('Furniture', 'Tables', 'Corporate', 'Bevis Round Conference Table Top & Single Column Base', '2019-07-13', 'West', 4.00, 351.00, 'orderid-1.jpeg'),
('Furniture', 'Furnishings', 'Home Office', 'Deflect-o Glass Clear Studded Chair Mats', '2020-09-01', 'East', 27.00, 124.00, NULL),
('Furniture', 'Chairs', 'Home Office', 'Global Value Steno Chair, Gray', '2020-09-01', 'East', 15.00, 61.00, NULL),
('Furniture', 'Furnishings', 'Corporate', 'GE General Purpose, ExtrImageordersa Long Life, Showcase & Floodlight Incandescent Bulbs', '2021-12-23', 'Central', -1.00, 2.00, NULL),
('Furniture', 'Tables', 'Corporate', 'Bretford CR4500 Series Slim Rectangular Table', '2021-12-13', 'West', 42.00, 1114.00, NULL),
('Furniture', 'Furnishings', 'Consumer', 'Eldon ClusterMat Chair Mat with Cordless Antistatic Protection', '2020-07-09', 'East', 20.00, 182.00, NULL);

CREATE TABLE OrderLineItem (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  OrderID INT,
  Item VARCHAR(100),
  Profit DECIMAL(10,2),
  Sales DECIMAL(10,2),
  FOREIGN KEY (OrderID) REFERENCES Orders (ID)
);

INSERT INTO OrderLineItem (OrderID, Item, Profit, Sales)
VALUES
(1, 'Table A', 3.00, 100.00),
(1, 'Table B', 1.00, 151.00);

### Run backend in local
1. Change to the project directory 
  # cd order-table-react/server
2. Install dependencies
  #  npm start
