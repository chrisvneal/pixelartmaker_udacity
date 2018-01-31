$(function() {

  // Form inputs
  const $inputHeight = $("#inputHeight");
  const $inputWidth = $("#inputWidth");
  const $colorInput = $("#colorPicker");  
  const $submitButton = $("#submitButton");

  // Form input values  
  let $colorValue = $colorInput.val();


  const $canvas = $("#pixelCanvas");

  let $tr = $('<tr></tr>');
  let $td = $('<td></td>');


  // When size is submitted by the user, call makeGrid()

  function makeGrid(height, width) {
    // alert("You accessed makeGrid! The height is " + height + " and the width is " + width);




  } // end of makeGrid()



  // Call makeGrid() via submitButton;
  $submitButton.click(function(e) {
    e.preventDefault();

    let $heightValue = $inputHeight.val();
    let $widthValue = $inputWidth.val();

    makeGrid($heightValue, $widthValue);    
  });









}); //end of $ (jQuery)