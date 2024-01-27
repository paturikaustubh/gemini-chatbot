const preTags = document.querySelectorAll("pre");

// Loop through each `<pre>` tag
preTags.forEach((preTag) => {
  // Create a button element
  const button = document.createElement("button");

  // Set the button's text
  button.textContent = "Copy";

  // Add a class to the button
  button.classList.add("copy-button");

  // Position the button in the top right corner of the `<pre>` tag
  button.style.position = "absolute";
  button.style.top = "0";
  button.style.right = "0";

  // Add the button to the `<pre>` tag
  preTag.appendChild(button);

  // Add an event listener for the button's click event
  button.addEventListener("click", () => {
    // Select the text inside the `<pre>` tag
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(preTag);
    selection?.removeAllRanges();
    selection?.addRange(range);

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Deselect the text
    selection?.removeAllRanges();

    // Alert the user that the text has been copied
    alert("Text copied to clipboard!");
  });
});
