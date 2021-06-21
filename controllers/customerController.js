const poolDatabase = require('../config/db')
const ErrorResponse = require('../helper/errorResponse')
const Customer = require('../models/CustomerModel')
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        poolDatabase.query("SELECT customer_id, customer_rut, customer_name, customer_mail FROM customer WHERE customer_rut=? AND customer_password=?", [
            req.body.customer_rut,
            md5(req.body.customer_password)], function (error, results, fields) {
                if (error) {
                    next(new ErrorResponse("Error",500));
                } else {
                    if(results.length > 0) {
                        const customer = new Customer(results[0]);
                        const token = jwt.sign({customer_id: customer.customer_id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
                        res.status(200).json({"status":200, "login":true, "data": customer, "token": token });
                    } else {
                        res.status(200).json({"status":200, "login":false, "data": {}});
                    }
                }
            });
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

const getCustomer = async (req, res, next) => {
    try {
        console.log("params",req.params.id);
        poolDatabase.query("SELECT customer_id, customer_rut, customer_name, customer_mail, token FROM customer WHERE customer_id=?", [
            req.params.id], function (error, results, fields) {
               
                if (error) {
                    next(new ErrorResponse("Error",500));
                } else {
                    if(results.length > 0) {
                        const customer = new Customer(results[0]);
                        const token = jwt.sign({customer_id: customer.customer_id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
                        res.status(200).json({"status":200, "login":true, "data": customer, "token": token });
                    } else {
                        res.status(200).json({"status":200, "login":false, "data": {}});
                    }
                }
            });
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

const register = async (req, res, next) => {
    try {
        poolDatabase.query("INSERT INTO `dbdesafioripley`.`customer` (`customer_rut`, `customer_password`, `customer_name`, `customer_mail`) VALUES (?, ?, ?, ?)",[
            req.body.customer_rut,
            md5(req.body.customer_password),
            req.body.customer_name,
            req.body.customer_mail], function (error, results, fields) {
                if (error) {
                    next(new ErrorResponse("Error",500));
                } else {
                    if(results.insertId) {
                        res.status(200).json({"status":200, "register":true});
                    } else {
                        res.status(200).json({"status":200, "register":false});
                    }
                }
            });
    } catch (error) {
        next(new ErrorResponse('Error',500));
    }
}

module.exports = {
    login,
    register,
    getCustomer
};