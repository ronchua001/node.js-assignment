const Registration = require("../models/Registration");

exports.postRegistration = async (req, res) => {
  try {
    console.log(req.body);
    let registration = new Registration(req.body.teacher, req.body.students, req.body.subject, req.body.class);
    let registrationFlag = registration.registerUser();
    if (registrationFlag) {
      //successfully returned an object from registration models and return success code to client
      res.status(204).send("Successfully Registered!");
    } else {
      //somewhere failed in registration models - send status 500
      res.status(500).send("Unsuccessful Request!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Unsuccessful Request!");
  }

}
