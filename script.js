// Initialize EmailJS with your public key (replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key)
(function(){
  emailjs.init("YNkv87i4kDxrrglFV");
})();

document.getElementById('emailForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Capture the user input
  var fromName = document.getElementById('from_name').value; // User's name
  var toEmail = document.getElementById('to_email').value;
  var subject = document.getElementById('subject').value;
  var message = document.getElementById('message').value;
  var fileInput = document.getElementById('attachment');
  var file = fileInput.files[0];

  // Set up the parameters for the email template.
  // Make sure the key here (from_name) matches the placeholder in your EmailJS template.
  var templateParams = {
    from_name: fromName,
    to_email: toEmail,
    subject: subject,
    message: message
  };

  // Function to send email using EmailJS
  function sendEmail() {
    emailjs.send('testfileattachmentemail', 'template_xt8jkoi', templateParams)
      .then(function(response) {
        alert('Email sent successfully!');
      }, function(error) {
        alert('Failed to send email. Error: ' + JSON.stringify(error));
      });
  }

  // If a file is attached, convert it to base64 and add it to templateParams
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      templateParams.attachment = e.target.result;
      sendEmail();
    };
    reader.readAsDataURL(file);
  } else {
    sendEmail();
  }
});

