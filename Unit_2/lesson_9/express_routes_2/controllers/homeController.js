exports.send_req_param = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
}
