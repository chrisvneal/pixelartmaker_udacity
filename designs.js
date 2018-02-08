// ******** Table of Contents ************
// 1. Functions
// 2. #submitButton functionality
// 3. Coloring functionality
// ***************************************

$(function() {

  // Form inputs
  const $inputHeight = $("#inputHeight");
  const $inputWidth = $("#inputWidth");
  const $submitButton = $("#submitButton");

  // Main grid/canvas area
  const $canvas = $("#pixelCanvas");

  // Color controls
  const $colorInput = $("#colorPicker");
  let $colorValue = $colorInput.val();
  let mousedown = false;

  
  // 1. *******************Functions **********************

  // ******************************************************

  // makeGrid() creates a grid/table based on user provided values
  function makeGrid(height, width) {

    // TODO: Put a condition in there that if height === 0, don't run the program!

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

  function colorElement(element) {
    $(element.target).css("background", $colorValue);
  } // end of colorElement()

  // 2. ********** #submitButton functionality ************

  // ******************************************************

  $submitButton.click(function(e) {
    e.preventDefault();

    let $heightValue = $inputHeight.val();
    let $widthValue = $inputWidth.val();

    makeGrid($heightValue, $widthValue);
  });

  // 3. ************ Coloring functionality ***************

  // ******************************************************

  // Change value of color variable when new color is selected
  $colorInput.on('change', function() {
    $colorValue = $colorInput.val();
  });

  // When you mouse down on a tile, apply chosen color
  $canvas.on('mousedown', 'td', function(e) {
    mousedown = true;
    colorElement(e);
  });

  
  $canvas.on('mouseup', function() {
    mousedown = false;
  });

  // If you mouse over a tile when the mouse is still down, color that tile
  $canvas.on('mouseover', 'td', function(e) {
    if (mousedown) {
      colorElement(e);
    }
  });

  // A single 'click' on a tile will color it
  $canvas.on('click', 'td', function(e) {
    colorElement(e);
  });

  // TODO: Try to work on recent styles functionality in the 'recent_styles' branch
}); //end of $ (jQuery)