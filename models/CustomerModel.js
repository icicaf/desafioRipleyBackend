const Customer = function (customer) {
  this.customer_id = customer.customer_id;
  this.customer_rut = customer.customer_rut;
  this.customer_password = customer.customer_password;
  this.customer_name = customer.customer_name;
  this.customer_mail = customer.customer_mail;
};

module.exports = Customer;
