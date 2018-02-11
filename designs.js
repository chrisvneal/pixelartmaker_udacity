$(function() {
  // ******** Table of Contents ************
  // 1. Functions
  // 2. #createGridButton functionality
  // 3. Coloring functionality
  // 4. 'Prebuilt' button functionality
  // 5. 'Enter key' button functionality
  // ***************************************

  // Form inputs
  const $inputHeight = $("#inputHeight");
  const $inputWidth = $("#inputWidth");
  const $createGridButton = $("#createGridButton");

  // Main grid/canvas area
  const $canvas = $("#pixelCanvas");

  // Color controls
  const $colorInput = $("#colorPicker");
  let $colorValue = $colorInput.val();
  let mousedown = false;


  // 1. *******************Functions **********************

  // ******************************************************

  // Create a string from the grid values and display it next to canvas header
  function placeGridNumbers(height, width) {

    let gridSizeString = height + " x " + width;

    $('#canvasArea h2').children().remove();

    $('#canvasArea h2').append('<span class="gridSizeString">' + gridSizeString + '</span>');
  } // end of placeGridNumbers()

  // makeGrid() creates a grid/table/canvas based on user values
  function makeGrid(height, width) {

    // Don't allow 0 height; this means no rows!
    if (height < 1) {
      alert("Please select a value greater than 0!");
      return;
    }

    // If either width or height size is higher than 100, alert user and end program
    if ((Number(height)) > 100 || (Number(width)) > 100) {
      alert('Please choose a number from 100 and lower!');
      return;
    }

    // Display selected grid values beside canvas heading
    placeGridNumbers(height, width);

    // Clear any grids from the page
    $canvas.html('');

    // Initiate variable for creating a 'row', create amount of rows requested via 'height' variable
    let $row;

    // forLoop to put columns into row
    for (let i = 0; i < height; i++) {

      // 1. Create a row element (<tr>) until 'height' is met
      $row = $('<tr></tr>');

      // 2. make the necessary amount of columns (<tds>) & append them to each row      
      for (let j = 0; j < width; j++) {
        $row.append('<td></td>');
      }

      // 3. Append those rows (including <td>s) to the canvas
      $canvas.append($row);
    }
  } // end of makeGrid()


  function addRecentColor(recentColor) {

    let $recentColorRow = $('<tr class="recent-color"></td>');

    let $recentColorObject = $('<td class="recent-color-object"></td>').css('background', recentColor);

    $recentColorRow.prepend($recentColorObject);

    $('#recentColors').prepend($recentColorRow);
  }

  // colorElement() function places the color in the element
  function colorElement(element) {

    $(element.target).css("background", $colorValue);
  } // end of colorElement()

  // Reset initial grid values
  function setInitialGridValue() {

    let $initialGridValue = $('#inputWidth').attr('value');

    $('#inputHeight, #inputWidth').val($initialGridValue);
  }

  // resetCanvas() function
  function resetCanvas(e) {
    e.preventDefault();

    // Erase canvas content
    $('#pixelCanvas, #canvasArea h2').children().remove();

    setInitialGridValue();
  }

  // 2. ********** #createGridButton functionality ************

  // **********************************************************

  $createGridButton.click(function(e) {
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

    // When a tile is clicked, that color will become available as a recent color
    addRecentColor($colorValue);

    colorElement(e);
  });

  // If you mouse over a tile when the mouse is still down, continue coloring
  $canvas.on('mouseover', 'td', function(e) {
    if (mousedown) {
      colorElement(e);
    }
  });

  $canvas.on('mouseup', function() {
    mousedown = false;
  });

  // 4. ************ 'Prebuilt' button functionality ***************

  // ***************************************************************
  $('[data-gridscale]').click(function(e) {
    e.preventDefault();

    // scaleByNumber is the scale depicted on the button
    let $scaleByNumber = $(this).attr('data-gridscale');

    // Set both width and height values to scaleBynumber...
    $('#inputHeight, #inputWidth').val($scaleByNumber);

    makeGrid($scaleByNumber, $scaleByNumber);
  });

  // 5. ******* 'Enter key' functionality in grid settings area****

  // ***************************************************************
  $('#inputHeight, #inputWidth').keypress(function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      let $heightValue = $inputHeight.val();
      let $widthValue = $inputWidth.val();

      // Make the input values same as on button
      $inputHeight.val($heightValue);
      $inputWidth.val($widthValue);

      makeGrid($heightValue, $widthValue);
    }
  });

  // If 0 is the first key pressed, alert user about selecting a higher number
  $('input[type=number]').keydown(function(e) {

    if (e.keyCode === 48) {

      if (this.value < 1) {

        alert('Select a higher number!');

        $(this).val('1');
      }
    }
  });

  $('#resetButton').click(resetCanvas);

}); //end of $ (jQuery)