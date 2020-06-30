module.exports.pullArrayOfErrors = (errors) => {
  // iterating through the list of errors and pulling the msg body of each error ocurred
  return errors.map((err) => err.msg)
}
