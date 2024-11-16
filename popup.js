//var unicodeit = require('unicodeit');
import { replace } from 'unicodeit';

// When the DOM is loaded (popup opens)
document.addEventListener('DOMContentLoaded', function () {
  // Get the saved input text from chrome storage
  chrome.storage.local.get('inputText', function (data) {
    // If there's saved input text, set it to the input field and output
    if (data.inputText) {
      document.getElementById('inputField').value = data.inputText;
      document.getElementById('output').textContent = replace(data.inputText);
    }
  });
});

// When the input field value changes
document.getElementById('inputField').addEventListener('input', function() {
  const inputText = document.getElementById('inputField').value;

  // Save the input text to chrome storage
  chrome.storage.local.set({ 'inputText': inputText });

  // Update the output area in real-time
  document.getElementById('output').textContent = replace(inputText);
});

// When the output area is clicked, copy its content to the clipboard
document.getElementById('output').addEventListener('click', function() {
  const textToCopy = document.getElementById('output').textContent;

  // Copy to clipboard
  navigator.clipboard.writeText(textToCopy).then(function() {
    // Show success message in the notification area
    showNotification("Content copied to clipboard!");
  }).catch(function(err) {
    // Show failure message in the notification area
    showNotification("Failed to copy to clipboard: " + err);
  });
});

// Function to show the notification with a message
function showNotification(message) {
  const notificationElement = document.getElementById('notification');
  notificationElement.textContent = message;
  notificationElement.style.display = 'block';  // Show the notification

  // Hide the notification after 2 seconds
  setTimeout(function() {
    notificationElement.style.display = 'none';
  }, 2000);  // Hide after 2 seconds
}

//

document.addEventListener('DOMContentLoaded', function () {
  const stringList = document.getElementById('stringList');

  // Get stored strings from chrome.storage
  chrome.storage.sync.get(['strings'], function (result) {
    const strings = result.strings || [];
    displayStrings(strings);
  });

  // Function to display the strings in the popup
  function displayStrings(strings) {
    stringList.innerHTML = ''; // Clear the list
    strings.forEach((str) => {
      const li = document.createElement('li');
      li.textContent = replace(str);

      // Add click event to copy the string to clipboard
      li.addEventListener('click', function () {
        copyToClipboard(replace(str));
      });

      stringList.appendChild(li);
    });
  }

  // Function to copy the string to clipboard
  function copyToClipboard(text) {
    /*navigator.clipboard.writeText(text)
      .then(function() {
        alert('Text copied to clipboard: ' + text);
      })
      .catch(function(err) {
        console.error('Failed to copy text: ', err);
      });*/

  // Copy to clipboard
    navigator.clipboard.writeText(text).then(function() {
      // Show success message in the notification area
      showNotification("Content copied to clipboard!");
    }).catch(function(err) {
      // Show failure message in the notification area
      showNotification("Failed to copy to clipboard: " + err);
    });


  }
});

