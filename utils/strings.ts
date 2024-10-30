// Helper function to clean up the features HTML and reformat it
export const cleanUpFeatures = (html: string) => {
  // Replace <p></p><br><p> with </li><li> to create separate list items
  let cleanedHtml = html.replace(/<\/p><br><p>/g, "</li><li>");
  
  // Ensure the first <p> and last <p><br> are properly replaced
  cleanedHtml = cleanedHtml.replace("<ul><li><p>", "<ul><li>");

  // Remove any trailing <p></p><br> within the last <li>
  cleanedHtml = cleanedHtml.replace(/<li>(.*?)<p><\/p><br><\/li>/g, "<li>$1</li>");

  return cleanedHtml;
};