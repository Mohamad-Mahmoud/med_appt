function getApiUrl() {
    const { protocol, hostname } = window.location;

    if (hostname === "localhost") {
      return "http://localhost:8181";
    }

    if (hostname.includes("-3000")) {
      const apiHost = hostname.replace("-3000", "-8181");
      return `${protocol}//${apiHost}`;
    }
    return `${protocol}//${hostname}`;
  }
  
  export const API_URL = getApiUrl();
  
  console.log("API_URL :", API_URL);
  

// export const API_URL = window.location.hostname === "localhost" ? "http://localhost:8181" : "http://localhost:8181";
// console.log(
//     "API_URL :",
//     API_URL
// );