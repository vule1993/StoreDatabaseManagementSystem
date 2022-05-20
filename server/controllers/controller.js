const mysql = require('mysql');


//create connection pool 
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


//View users:
exports.viewCustomer = (req, res) => {
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //User connection
        connection.query('SELECT * FROM CUSTOMER WHERE STATUS = ?', ['ACTIVE'], (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                console.log('render working');
                res.render('customer', { rows });
            } else {
                console.log(err);
            }
        })
    });
}

//Find user by Search
exports.findCustomer = (req, res) => {
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //grab value from search box
        const searchTerm = req.body.search;

        //User connection
        connection.query('SELECT * FROM CUSTOMER WHERE FIRST_NAME LIKE ? OR LAST_NAME LIKE ? OR PHONE_NUMBER LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                res.render('customer', { rows });
            } else {
                console.log(err);
            }
        })
    });
};

//export the form
exports.formCustomer = (req, res) => {
    res.render('addCustomer');
};
//Add new customer
exports.addCustomer = (req, res) => {

    const { customer_id, first_name, last_name, phone_number } = req.body;
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //User connection
        connection.query('INSERT INTO CUSTOMER SET CUSTOMER_ID = ?, FIRST_NAME = ?, LAST_NAME = ?, PHONE_NUMBER = ?', [customer_id, first_name, last_name, phone_number], (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                res.render('addCustomer', { alert: 'The new customer had been added successfully.' });
            } else {
                console.log(err);
            }
        })
    });
};

//edit Customers:

exports.editCustomer = (req, res) => {
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //User connection
        connection.query('SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = ?', [req.params.CUSTOMER_ID], (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                res.render('editCustomer', { rows });
            } else {
                console.log(err);
            }
        })
    });
};

exports.updateCustomer = (req, res) => {
    const { first_name, last_name, phone_number } = req.body;
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //User connection
        connection.query('UPDATE CUSTOMER SET FIRST_NAME = ?, LAST_NAME = ?, PHONE_NUMBER =? WHERE CUSTOMER_ID= ?', [first_name, last_name, phone_number, req.params.CUSTOMER_ID], (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected!
                    console.log('Connected as ID ' + connection.threadId);

                    //User connection
                    connection.query('SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = ?', [req.params.CUSTOMER_ID], (err, rows) => {
                        //when done with connection, release it
                        connection.release();
                        if (!err) {
                            res.render('editCustomer', { rows, alert: 'The customer information had been edited successfully.' });
                        } else {
                            console.log(err);
                        }
                    })
                })
            } else {
                console.log(err);
            }
            console.log('the user from customer table: \n', rows);
        })
    });
};





//Function create, find, update, delete for products

exports.productView = (req, res) => {
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //connection
        connection.query('SELECT * FROM PRODUCT WHERE STATUS = ?', ['ACTIVE'], (err, products) => {
            connection.release();
            if (!err) {
                console.log('render working');
                res.render('product', { products });
            } else {
                console.log(err);
            }
        })
    })
};

exports.formProduct = (req, res) => {
    res.render('addProduct');
}

exports.addProduct = (req, res) => {
    const { product_name, product_id, quantity, reorder_quantity, description, expiration_date, category_id, cost, price, vendor_id } = req.body;
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //User connection
        connection.query('INSERT INTO PRODUCT SET PRODUCT_NAME = ?, PRODUCT_ID = ?, QUANTITY = ?, REORDER_QUANTITY = ?, DESCRIPTION = ?, EXPIRATION_DATE = ?, CATEGORY_ID = ?, COST = ?, PRICE = ?, VENDOR_ID =?', [product_name, product_id, quantity, reorder_quantity, description, expiration_date, category_id, cost, price, vendor_id], (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                res.render('addProduct', { alert: 'The new product had been added successfully.' });
            } else {
                console.log(err);
            }
        })
    });
};

//edit product

exports.editProduct = (req, res) => {
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //User connection
        connection.query('SELECT * FROM PRODUCT WHERE PRODUCT_ID = ?', [req.params.PRODUCT_ID], (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                res.render('editProduct', { rows });
            } else {
                console.log(err);
            }
        })
    });
};

exports.updateProduct = (req, res) => {
    const { product_name, quantity, reorder_quantity, description, expiration_date, category_id, cost, price, vendor_id } = req.body;
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //User connection
        connection.query('UPDATE PRODUCT SET PRODUCT_NAME = ?, QUANTITY = ?, REORDER_QUANTITY = ?, DESCRIPTION = ?, EXPIRATION_DATE = ?, CATEGORY_ID = ?, COST = ?, PRICE = ?, VENDOR_ID =? WHERE PRODUCT_ID = ?', [product_name, quantity, reorder_quantity, description, expiration_date, category_id, cost, price, vendor_id, req.params.PRODUCT_ID], (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected!
                    console.log('Connected as ID ' + connection.threadId);

                    //User connection
                    connection.query('SELECT * FROM PRODUCT WHERE PRODUCT_ID = ?', [req.params.PRODUCT_ID], (err, rows) => {
                        //when done with connection, release it
                        connection.release();
                        if (!err) {
                            res.render('editProduct', { rows, alert: 'The product information had been edited successfully.' });
                        } else {
                            console.log(err);
                        }
                    })
                })
            } else {
                console.log(err);
            }
        })
    });
};


//render Homepage

exports.renderHome = (req, res) => {
    res.render('home');
};

exports.saleReportDaily = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);
        const currentDate = new Date().toISOString().slice(0, 10);

        console.log(currentDate);
        //User connection
        connection.query('SELECT SUM (PRICE) AS TOTAL_SALE FROM SALE_INVOICE, SALE_INVOICE_ITEM WHERE SALE_INVOICE.INVOICE_ID = SALE_INVOICE_ITEM.INVOICE_ID AND SALE_INVOICE.SALE_DATE = ? ', [currentDate], (err, price) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                console.log(price);
                res.render('saleReportDaily', { currentDate ,sale: price});
            } else {
                console.log(err);
            }
        })
    });
};

exports.saleReportWeekly = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);
        let currentDate = new Date().toISOString().slice(0, 10);
        let startDate = date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);; 

        //User connection
        connection.query('SELECT SUM (PRICE) AS TOTAL_SALE FROM SALE_INVOICE, SALE_INVOICE_ITEM WHERE SALE_INVOICE.INVOICE_ID = SALE_INVOICE_ITEM.INVOICE_ID AND SALE_INVOICE.SALE_DATE BETWEEN ? AND ? ', [startDate, currentDate], (err, price) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                console.log(price);
                res.render('saleReportWeekly', { startDate, currentDate ,sale: price});
            } else {
                console.log(err);
            }
        })
    });
};


exports.deleteCustomer = (req, res) => {
    //doing query database
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('Connected as ID ' + connection.threadId);

        //User connection
        connection.query('UPDATE CUSTOMER SET STATUS = ? WHERE CUSTOMER_ID = ?', ['DISABLE', req.params.CUSTOMER_ID], (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                res.redirect('/');
            } else {
                console.log(err);
            }
        })
    });
};


// exports.deleteProduct = (req, res) => {
//     //doing query database
//     pool.getConnection((err, connection) => {
//         if (err) throw err; //not connected!
//         console.log('Connected as ID ' + connection.threadId);

//         //User connection
//         connection.query('UPDATE PRODUCT SET STATUS = ? WHERE PRODUCT_ID = ?', ['DISABLE', req.params.PRODUCT_ID], (err, rows) => {
//             //when done with connection, release it
//             connection.release();
//             if (!err) {
//                 res.redirect('/');
//             } else {
//                 console.log(err);
//             }
//         })
//     });
// };