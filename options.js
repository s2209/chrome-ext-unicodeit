import { replace } from 'unicodeit';

document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('addButton');
  const newStringInput = document.getElementById('newString');
  const stringList = document.getElementById('stringList');

  // Display current stored strings
  chrome.storage.sync.get(['strings'], function (result) {
    const strings = result.strings || [];
    displayStrings(strings);
  });

  // Function to display strings in the list
  function displayStrings(strings) {
    stringList.innerHTML = '';
    strings.forEach((str, index) => {
      const li = document.createElement('li');
      li.textContent = replace(str);

      // Add delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        deleteString(index);
      });

      li.appendChild(deleteButton);
      stringList.appendChild(li);
    });
  }

  // Add new string to the list
  addButton.addEventListener('click', function () {
    const newString = newStringInput.value.trim();
    if (newString) {
      chrome.storage.sync.get(['strings'], function (result) {
        const strings = result.strings || [];
        strings.push(newString);

        chrome.storage.sync.set({ strings: strings }, function () {
          displayStrings(strings); // Update the list display
          newStringInput.value = ''; // Clear input field
        });
      });
    }
  });

  // Delete a string from the list
  function deleteString(index) {
    chrome.storage.sync.get(['strings'], function (result) {
      const strings = result.strings || [];
      strings.splice(index, 1); // Remove the string at the given index

      chrome.storage.sync.set({ strings: strings }, function () {
        displayStrings(strings); // Update the list display
      });
    });
  }
});


document.getElementById('newString').addEventListener('input', function() {
  const inputText = document.getElementById('newString').value;

  // Save the input text to chrome storage
  //chrome.storage.local.set({ 'inputText': inputText });

  // Update the output area in real-time
  document.getElementById('output').textContent = replace(inputText);
});
