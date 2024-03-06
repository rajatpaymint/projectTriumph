// const deploymentType = "local";
// const deploymentType = "devTest";
const deploymentType = "prod";

let URL;

if (deploymentType === "local") {
  URL = {
    appApiUrl: "https://39f2-2401-4900-1ca3-7b94-89d0-b947-92f9-217a.ngrok-free.app/",
  };
} else if (deploymentType === "devTest") {
  URL = {
    appApiUrl: "http://z2puat.in/",
  };
} else if (deploymentType === "prod") {
  URL = {
    appApiUrl: "https://b2z.world",
  };
}
console.log("URL: ", URL);
export { URL };

// rzp_test_yvntbzHNeYGl6O
// 7SVzKoOAGnCXBfVvXkkwBxUO
