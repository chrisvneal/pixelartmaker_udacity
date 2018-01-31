$(function() {

  // Form inputs
  const $inputHeight = $("#inputHeight");
  const $inputWidth = $("#inputWidth");

  const $submitButton = $("#submitButton");

  const $canvas = $("#pixelCanvas");



  // makeGrid() creates a grid/table based on user provided values
  function makeGrid(height, width) {

    // Clear any grids from the page
    $canvas.html('');

    let $row;

    // Create amount of rows requested via 'height' variable

    for (var i = 0; i < height; i++) {

      // 1. Create a row element (<tr>) until 'height' is met
      $row = $('<tr></tr>');

      // 2. make the necessary amount of columns (<tds>) & append them to each row      
      for (var j = 0; j < width; j++) {
        $row.append('<td></td>');
      }

      // 3. Append those rows (including <td>s) to the canvas
      $canvas.append($row);
    }
  } // end of makeGrid()


  // Call makeGrid() via submitButton;
  $submitButton.click(function(e) {
    e.preventDefault();

    let $heightValue = $inputHeight.val();
    let $widthValue = $inputWidth.val();

    makeGrid($heightValue, $widthValue);
  });



  // Color controls

  const $colorInput = $("#colorPicker");
  let $colorValue = $colorInput.val();
  let mousedown = false;

  $colorInput.on('change', function() {
    $colorValue = $colorInput.val();
  });

  $canvas.on('mousedown', 'td', function() {
    mousedown = true;
    $(this).css("background", $colorValue);
  });

  $canvas.on('mouseup', function() {
    mousedown = false;
  });

  $canvas.on('mouseover', 'td', function() {
    if (mousedown) {
      $(this).css("background", $colorValue);
    }
  });

  $canvas.on('click', 'td', function() {
    $(this).css("background", $colorValue);
  });



function colorElement() {
  $(this).css("background", $colorValue);  
}

























}); //end of $ (jQuery)