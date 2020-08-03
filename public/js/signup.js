$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var userNameInput = $("input#username-input");
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      username: userNameInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.username) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.username);
    emailInput.val("");
    passwordInput.val("");
    userNameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the homepage page
  // Otherwise we log any errors
  function signUpUser(email, password, username) {
    $.post("/api/signup", {
      email: email,
      password: password,
      username: username
    })
      .then(function() {
        window.location.replace("/homepage");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err);
    $("#alert .msg").text("Email already exists. Please Login.");
    $("#alert").fadeIn(500);
  }
});
