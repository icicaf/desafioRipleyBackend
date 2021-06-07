const Transfer = function (transfer) {
  this.transfer_nameDestinatary = transfer.transfer_nameDestinatary;
  this.transfer_rutDestinatary = transfer.transfer_rutDestinatary;
  this.transfer_bankDestinatary = transfer.transfer_bankDestinatary;
  this.transfer_typeAccountDestinatary = transfer.transfer_typeAccountDestinatary;
  this.transfer_totalAmountDestinatary = transfer.transfer_totalAmountDestinatary;
};

module.exports = Transfer;
