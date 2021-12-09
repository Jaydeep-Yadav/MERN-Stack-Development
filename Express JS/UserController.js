const registerUser =  (req, resp) => {
    // resp.send(`<h1>DONE Mr. ${req.body.name}</h1> <h2>Your emal is ${req.body.email}</h2>`)
    // console.log('Form response received');
  
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
  
    resp.json({
      success: true,
    });
  };

  module.exports = registerUser;