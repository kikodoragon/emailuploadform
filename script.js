document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  var fileInput    = document.getElementById('file');
  var file         = fileInput.files[0];
  var recipient    = document.getElementById('recipient').value;
  var emailSubject = document.getElementById('emailSubject').value;
  var emailMessage = document.getElementById('emailMessage').value;
  
  if (!file) {
    alert("Please select a file.");
    return;
  }
  
  var reader = new FileReader();
  
  reader.onload = function(e) {
    // e.target.result is a Data URL containing the base64-encoded file.
    var fileData = e.target.result;
    
    // Prepare a FormData object with all the required parameters.
    var formData = new FormData();
    formData.append("fileData", fileData);
    formData.append("fileName", file.name);
    formData.append("mimeType", file.type);
    formData.append("recipient", recipient);
    formData.append("emailSubject", emailSubject);
    formData.append("emailMessage", emailMessage);
    
    // Replace with your deployed Google Apps Script web app URL.
    var scriptURL = "https://script.google.com/macros/s/AKfycbwZgQ-A-hF6PZHGtoyCUoPf5gHMjb82WFlnrUWHisH-RnKIlMSHDVLhHRU2goj5Bos-EA/exec";
    
    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      var resultDiv = document.getElementById('result');
      if(data.status === "success") {
        resultDiv.innerHTML = "File uploaded and email sent successfully!<br>File URL: <a href='" + data.fileUrl + "' target='_blank'>" + data.fileUrl + "</a>";
      } else {
        resultDiv.innerHTML = "Upload failed: " + data.message;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').innerText = "Error uploading file.";
    });
  };
  
  reader.readAsDataURL(file);
});

