/**
 * Fetches JSON data from APIs
 *
 * @param {string} url - api endpoint url
 * @param {Object} options - request options
 * @param {string} useProxy - optional proxy server
 *
 * @returns {Object} response json data
 */
const fetchData = async (url, options = {}, useProxy) => {
  // Construct new url if proxy in use
  if (useProxy === 'allorigins') {
    url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  } else if (useProxy === 'fazer-php') {
    const subPath = url.split('menu/')[1];
    url = `https://users.metropolia.fi/~jesseraj/WTMP/Proxy/proxy-server/fazer-proxy.php/${subPath}`;
  }
  let jsonData;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    jsonData = await response.json();
    // Allorigins returns json payload in data.contents property as a string
    if (useProxy === 'allorigins') {
      jsonData = JSON.parse(jsonData.contents);
    }
  } catch (error) {
    console.error('fetchData() error', error);
    jsonData = {};
  }
  return jsonData;
};

export {fetchData};
