// Then create a Node application called bamazonCustomer.js. 
var mysql = require("mysql");
var inquirer = require("inquirer");
// var console = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Monk3yH8sPa$$word$",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    // run the buyproduct function after the connection is made to prompt the user
    buyProduct();
});
// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// var table = function() {
//     // console.log("test");
//     connection.query("SELECT * FROM products", function(err, res) {
//         console.table(res);        
//         buyproduct(res);
//     })
// };


// console.table(products);
// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function buyProduct() {
    // connection.query("SELECT * FROM bamazon.products", function(err, res) {
    //     if (err) throw err

    connection.query("SELECT * FROM bamazon.products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity); 
        }
        // console.table(res);
        console.log("-----------------------------------")
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to buy?",
            },
            {
                name: "unit",
                type: "input",
                message: "How many units of the product would you like to buy?",
            }
        ])
            .then(function (answer) {
                // get the information of the chosen item
                // console.log(answer);
                // console.log(res);
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].id == answer.id) {
                        // console.log(res[i].id)
                        chosenItem = res[i];
                    }
                    // else {
                    //     console.log("Choose an ID from the list")
                    // }
                }
                // console.log(chosenItem);
                // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
                // if (chosenItem.stock > parseInt(answer.unit)) {
                if (chosenItem.stock_quantity - answer.unit >= 0) {
                    // if ((res[answer.id].stock - answer.unit) > 0)  {      
                    // However, if your store does have enough of the product, you should fulfill the customer's order.
                    // This means updating the SQL database to reflect the remaining quantity.  
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenItem.stock_quantity - answer.unit
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        // Once the update goes through, show the customer the total cost of their purchase.
                        function (error, res) {
                            // console.log(res);
                            console.log("Purchase: " + chosenItem.product_name + ": $" + chosenItem.price);
                            buyProduct();
                        }
                    );
                }
                else {
                    // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
                    console.log("Insufficient quantity");
                    buyProduct();
                }
            });
        // connection.end();
    });
};























