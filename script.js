// Initialize EmailJS with your user ID (replace 'YOUR_USER_ID' with your actual EmailJS user ID)
(function(){
  emailjs.init("YOUR_USER_ID");
})();

document.getElementById('emailForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Gather form data
  var toEmail = document.getElementById('to_email').value;
  var subject = document.getElementById('subject').value;
  var message = document.getElementById('message').value;
  var fileInput = document.getElementById('attachment');
  var file = fileInput.files[0];

  // Prepare template parameters
  var templateParams = {
    to_email: toEmail,
    subject: subject,
    message: message
  };

  // Function to send email using EmailJS
  function sendEmail() {
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function(response) {
        alert('Email sent successfully!');
      }, function(error) {
        alert('Failed to send email. Error: ' + JSON.stringify(error));
      });
  }

  // If a file is attached, convert it to base64 and then send the email
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      // The file data is returned as a base64 encoded string
      templateParams.attachment = e.target.result;
      sendEmail();
    };
    reader.readAsDataURL(file);
  } else {
    // No file attached, send email immediately
    sendEmail();
  }
});
