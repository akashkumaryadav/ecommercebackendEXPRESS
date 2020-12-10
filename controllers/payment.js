const braintree = require('braintree')
const e = require('express')

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.B_MERCHANT_ID,
  publicKey: process.env.B_PUBLIC_KEY,
  privateKey: process.env.B_PRIVATE_KEY,
})

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    // pass clientToken to your front-end
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.send(response)
    }
  })
}

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce
  let amountFromTheClient = req.body.amount
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        return res.status(500).send(err)
      } else {
        return res.status(200).send(result)
      }
    }
  )
}
