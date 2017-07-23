let courses =[{title: "Event Driven Cakes", cost: 50}, {title: "Asynchronous Artichoke", cost: 25}, {title: "Object Oriented Orange Juice", cost: 10}];

exports.showCourses = (req, res) => {
  res.render('courses', {title: "Confetti Courses!", offeredCourses:
  courses});
};

exports.showSignUp = (req, res) => {
  res.render('contact');
};
exports.postedSignUpForm = (req, res) => {
  res.send("Sign up submitted");
};

exports.postedContactForm = (req, res) => {
  res.send('Form Submitted');
}
