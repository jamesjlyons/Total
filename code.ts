if (figma.currentPage.selection.length === 0) {
  figma.notify("Please make a selection of numbers to find the sum of");
} else {
  const nodes = figma.currentPage.selection;
  let sum = 0;

  for (const node of nodes) {
    if (node.type === 'TEXT') {
      // Remove any characters that aren't digits, periods, or minus symbols
      const cleanedString = node.characters.replace(/[^0-9.-]/g, '');
      const number = parseFloat(cleanedString);
      // Check if the string is a valid number
      if (!isNaN(number)) {
        sum += number;
      } else {
        // If any of the selected text nodes are not valid numbers, send an error to UI
        figma.notify('One or more selected nodes are not valid numbers', {
          timeout: 2000
        });
      }
    } else {
      // If any of the selected nodes are not text, send an error to UI
      figma.notify('One or more selected nodes are not text', {
        timeout: 2000
      });
    }
  }

  let totalString = "The sum of your selection is " + sum.toFixed(2);

  figma.notify(totalString, {
    timeout: 30000
  });
}

figma.closePlugin();
