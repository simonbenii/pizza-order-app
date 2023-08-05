export async function fetchData(url, reqMethod, reqBodyContent) {
  try {
    const reqConfig = {
      method: reqMethod ? reqMethod : 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (reqBodyContent) {
      reqConfig.body = JSON.stringify(reqBodyContent);
    }
    const response = await fetch(url, reqConfig);
    return response.json();
  } catch (err) {
    console.error(`Error fetching from ${url}: ${err.message}`);
    return { 'ERROR': 'Failed to fetch from server' };
  }
}
