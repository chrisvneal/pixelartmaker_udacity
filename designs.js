"use strict";

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
  const $canvasBottomRow = $('.canvas-bottom-row');

  // Main grid/canvas area
  const $canvas = $("#pixelCanvas");
  const $innerCircleButton = $('#innerCircleButton');
  

  // Color controls
  const $colorInput = $("#colorPicker");
  let $colorValue = $colorInput.val();
  let mousedown = false;
  let $lastRecentColor;
  let $recentColorLength;

  let $currentHeight;
  let $currentWidth;
// console.log($currentHeight);
// console.log();
//   console.log("this is corretct");

//   console.log('The current height is ' + $currentHeight + ' and the curent width is ' + $currentWidth);

  // 1. *******************Functions **********************

  // ******************************************************

  // Create a string from the grid values and display it next to canvas header
  function placeGridNumbers(height, width) {

    let gridSizeString = height + " x " + width;

    $('#canvasArea h2').children().remove();

    $('#canvasArea h2').append('<span class="gridSizeString">' + gridSizeString + '</span>');
  } // end of placeGridNumbers()


  
  // Sets the current height/width values on data-currentheight/width and adds those values to inputs
  function setCurrentHeightAndWidth(newGridHeight, newGridWidth) {
    $inputHeight.data('currentheight', newGridHeight);
    $inputWidth.data('currentwidth', newGridWidth);

    $inputHeight.val(newGridHeight);
    $inputWidth.val(newGridWidth);
    // $inputWidth.val(newGridWidth);

    $currentHeight = $inputHeight.data('currentheight');
    $currentWidth = $inputWidth.data('currentwidth');
  }





  // makeGrid() creates a grid/table/canvas based on user values
  function makeGrid(height, width) {

    setCurrentHeightAndWidth(height, width);
      

    // Don't allow 0 height; this means no rows!
    if (height < 1 || width < 1) {
      alert('Please select a value greater than 0!');
      return;
    }

    // If either width or height size is higher than 100, alert user and end program
    if ((Number(height)) > 100 || (Number(width)) > 100) {
      alert('100 is the max size!');
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

  

// Reveal the bottom of the canvas that was hidden on window load
$canvasBottomRow.removeClass('away');
  } // end of makeGrid()


  // Place currently selected color in a 'Recent Colors" div
  function addRecentColor(recentColor) {
    

    // let $recentColorRow = $('<tr class="recent-color"></td>');

    let $recentColorObject = $('<div class="recent-color-object"></div>').css('background', recentColor);

    $('#recentColors').prepend($recentColorObject);

    


    
    
    
    
   
    








    // monitor recent colors length
    $recentColorLength = $('#recentColors').children().length;

    /* if ($recentColorLength > 1) {
        $('.recent-color-object:first-child').css({
                                                    "width": '60px',
                                                    "height": '60px'
                                                            });

        $('.recent-color-object:first-child').nextAll().css({
            "width": '40px',
            "height": '40px'
                    });
                                                            
                                                            
    } */

    // $('.recent-color-object:first-child').delay(800).addClass('first-recent-color');

// console.log($recentColorLength);










if ($recentColorLength > 0 && $recentColorLength <= 18) {
    if ($recentColorLength == 1) {
$('#recentColorArea h2').html('<span class="recent-colors-length">' + $recentColorLength +  '</span> Recent Color');


    } else {

        $('#recentColorArea h2').html('<span class="recent-colors-length">' + $recentColorLength +  '</span> Recent Colors');

        // $('.recent-colors-length').text($recentColorLength);
    }

} else {
    // what happens when it tries to exceed 20? Cut off end?
    // console.log('you have exceeded the length');

    $('#recentColors .recent-color-object:last-child').remove();
}

    // $('#recentColors').prepend($recentColorRow);
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

  // convert rgb to hex
  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

 


  // Initialize a grid on start up based on default grid size values
  

  makeGrid($inputHeight.val(), $inputWidth.val());
  

  

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

    // make the paint icon the same color as color value
    $('#colorPickArea .show-at-min, #colorPickArea .hide-at-min i').css('color', $colorValue);
  });











  // When you mouse down on a tile, apply chosen color
  $canvas.on('mousedown', 'td', function(e) {
    mousedown = true;



    // The most recent color is the color of the first color in the #recentColors section
    $lastRecentColor = $('#recentColors').children().first().css('backgroundColor');




    // If there are no recent colors...
    if (!$lastRecentColor) {

        // The most recent color color will be the color selected in the color input
      $lastRecentColor = $colorValue;

      // ...draw the color on the canvas..
      colorElement(e);


      // ,..add that color to the #recentColors  div

      addRecentColor($colorValue);

    } else {

        // If there is a recent color, convert that rgb code to a hex value

      $lastRecentColor = rgb2hex($lastRecentColor);


      // If the color selected matches the mnost recent color, still color tile, no need to add to #recentColors area
      if ($colorValue === $lastRecentColor) {
        colorElement(e);
      } else {
        colorElement(e);
        addRecentColor($colorValue);

      }
    }
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

  // when the mouse leaves the canvas, pick the mouse up
  $canvas.mouseleave(function() {
    //   alert('you left');
    // e.preventDefault();
    mousedown = false;
  });

  // 4. ************ 'Prebuilt' button functionality ***************

  // ***************************************************************
  $('[data-gridscale]').click(function(e) {
    e.preventDefault();

    // scaleByNumber is the scale depicted on the button
    let $scaleByNumber = $(this).data('gridscale');

    // Set both width and height values to scaleBynumber...
    // $('#inputHeight, #inputWidth').val($scaleByNumber);
    $inputHeight.val($scaleByNumber);
    $inputWidth.val($scaleByNumber);

    // console.log($scaleByNumber);


// Set current width and height of data-currentheight/currentwidth
    setCurrentHeightAndWidth($scaleByNumber);
    

      

      
      

    //   console.log('You just made a grid and its ' + $currentHeight + ' x ' + $currentWidth);


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

  // error if tab after '0'
  $('input[type=number]').change(function() {
    //   console.log('this is  blur');
    if ($(this).val() < 1) {
        alert('You must enter a number greater than zero!');
        // $(this).focus();
    }
  });

  $('#resetButton').click(resetCanvas);

  // Click on recent colors and change value of color picker
  $('#recentColorArea').on('click', '.recent-color-object', function() {

    let $selectedRecentColor = $(this).css('backgroundColor');

    $colorInput.val(rgb2hex($selectedRecentColor));
  });


  $('#recentColors').on('click', '.recent-color-object', function() {
      
        let $recentColor = rgb2hex($(this).css('backgroundColor'));
        // alert($recentColor);
        $colorInput.val($recentColor);
        $('#colorPickArea .show-at-min').css('color', $recentColor);
    $colorValue = $colorInput.val();    
  });

  
  // Canvas bottom row settings & functions
  $('#innerCircleButton').click(function() {
      let $originalHtml = $('#innerCircleButton').html();


      $('table').toggleClass('inner-circle');

    //   alert($('table').hasClass('inner-circle'));

      if ($('table').hasClass('inner-circle')) {
            $innerCircleButton.html('<i class="material-icons">close</i> No Circle');
      } else {
        $innerCircleButton.html('<i class="material-icons">center_focus_strong</i> Inner Circle');
            
      }






    //   $(this).text('Circle Off');
  });


//   $('.canvas-bottom-row').hide()




// ********* jquery Awesome Cursor *********

$canvas.awesomeCursor('paint-brush', {    
    color: '#7b1fa2',
    size: 30,
    hotspot:'bottom left',
    outline: 'white'
});   

// change cursor to "eraser" using jQuery Awesome Cursor plugin when 'eraser tool' clicked

let eraserOn = false;

$('#eraserButton').click(function() {
    // console.log(eraserOn);
    if (eraserOn === false) {
        // console.log('erase is not on');
        eraserOn = true;
        console.log('eraser is on');


        $('td').awesomeCursor('eraser', {    
            color: '#f06292',
            size: 30,
            hotspot:'bottom left',
            outline: 'white'
        });
        
    } else {
        eraserOn = false;
        console.log('eraser is off');
        $('td').awesomeCursor('paint-brush', {    
            color: '#7b1fa2',
            size: 30,
            hotspot:'bottom left',
            outline: 'white'
        });       
    }    
}); 


// Reset the grid, leaving size in place

$('#resetButton').click(function() {
    makeGrid($currentHeight, $currentWidth);
});





}); //end of $ (jQuery)