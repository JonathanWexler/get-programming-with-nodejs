// Giving access to the subscriber model
const Subscriber = require('../models/subscriber');

// Setting up callback for subscribers index page
exports.index = (req, res) => {
  Subscriber.find({})
  .then(subscribers => {
    if (req.query.format === 'json') {
      res.json(subscribers)
    } else {
      res.render('subscribers/index', {subscribers: subscribers})
    }
  })
  .catch( error =>{
    console.log(`Error fetching subscribers: ${error.message}`)
    res.redirect('/');
  });
}

// Create action
exports.new = (req, res) => {
  res.render('subscribers/new');
}
exports.create = (req, res) => {
  var subscriberParams = getSubscriberParams(req.body);
  Subscriber.create(subscriberParams)
  .then(subscriber => {
    res.redirect('/subscribers');
  })
  .catch(error => {
    console.log(`Error fetching subscribers: ${error.message}`)
    res.redirect('/');
  })
}

// Read action
exports.show = (req, res) => {
  var subscriberId = req.params.id;
  Subscriber.findById(subscriberId)
  .then(subscriber => {
    res.render('subscribers/show', {subscriber: subscriber});
  })
  .catch(error => {
    console.log(`Error fetching subscriber by ID: ${error.message}`)
    res.redirect('/');
  })
}

// Update action
exports.edit = (req, res) => {
  var subscriberId = req.params.id;
  Subscriber.findById(subscriberId)
  .then(subscriber => {
    res.render('subscribers/edit', {subscriber: subscriber});
  })
  .catch(error => {
    console.log(`Error fetching subscriber by ID: ${error.message}`)
    res.redirect('/');
  })
}

exports.update = (req, res) => {
  var subscriberId = req.params.id;
  var subscriberParams = getSubscriberParams(req.body);
  console.log(subscriberParams);
  Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams })
  .then(subscriber => {
    res.redirect(`/subscribers/${subscriberId}`);
  })
  .catch(error => {
    console.log(`Error updating subscriber by ID: ${error.message}`)
    res.redirect('/');
  })
}

// Delete action
exports.delete = (req, res) => {
  var subscriberId = req.params.id;
  Subscriber.findByIdAndRemove(subscriberId)
  .then(subscriber => {
    console.log(subscriber);
    res.redirect('/subscribers');
  })
  .catch(error => {
    console.log(`Error deleting subscriber by ID: ${error.message}`)
    res.redirect('/');
  })
}

function getSubscriberParams(body) {
  console.log(body)
  return {name: body.name, email: body.email, zipCode: parseInt(body.zipCode)};
}
