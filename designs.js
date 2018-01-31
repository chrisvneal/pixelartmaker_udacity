$(function() {

  // Form inputs
  const $inputHeight = $("#inputHeight");
  const $inputWidth = $("#inputWidth");
  const $colorInput = $("#colorPicker");  
  const $submitButton = $("#submitButton");

  // Form input values  
  let $colorValue = $colorInput.val();


  const $canvas = $("#pixelCanvas");

 


  // When size is submitted by the user, call makeGrid()

  function makeGrid(height, width) {
    // alert("You accessed makeGrid! The height is " + height + " and the width is " + width);


    // ...establish/create the number of columns needed (width); put into a columns variable (tds) as HTML...

    // ...create a row (tr) variable and append those columns (tds)...

    // ...multiply those rows by (height) and insert into a "build" variable...

    // ...create a variable holding the html for the rows and columns...

    // ...append that variable to #pixelCanvas (the table element)
    $canvas.append();
    






  } // end of makeGrid()



  // Call makeGrid() via submitButton;
  $submitButton.click(function(e) {
    e.preventDefault();

    let $heightValue = $inputHeight.val();
    let $widthValue = $inputWidth.val();

    makeGrid($heightValue, $widthValue);    
  });









}); //end of $ (jQuery)