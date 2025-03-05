document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  var fileInput = document.getElementById('file');
  var file = fileInput.files[0];
  
  if (!file) {
    alert("Please select a file.");
    return;
  }
  
  var reader = new FileReader();
  
  reader.onload = function(e) {
    // e.target.result is a Data URL containing the base64-encoded file.
    var fileData = e.target.result;
    
    // Prepare form data to send to the Apps Script web app
    var formData = new FormData();
    formData.append("fileData", fileData);
    formData.append("fileName", file.name);
    formData.append("mimeType", file.type);
    
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
        resultDiv.innerHTML = "File uploaded successfully! File URL: <a href='" + data.fileUrl + "' target='_blank'>" + data.fileUrl + "</a>";
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
