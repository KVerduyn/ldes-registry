// @ts-check

/**
 * Downloads the list of LDES streams endpoints.
 * @returns {Promise<Array<{url: string, title: string}>>} The array of endpoint URLs with their titles.
 */
export const getEndpointUrls = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/kverduyn/ldes-registry/main/urls.txt"
  );

  const data = await response.text();
  const lines = data.replace(/\r\n/g, "\n").split("\n").map(line => line.trim());

  return lines
    .filter(line => line.length > 0)
    .map((urlWithTitle, index) => {
      // Extract URL and title by splitting only at the first comma
      const [url, ...titleParts] = urlWithTitle.split(",");
      const title = titleParts.join(",").trim(); // Join remaining parts for title
      
      // Trim the URL and title to ensure no extra spaces
      let item = { url: url.trim(), title: title || url.trim() };
      
      // Debugging each item
      console.log(`Parsed item ${index + 1}:`, item);
      
      return item;
    });
};

