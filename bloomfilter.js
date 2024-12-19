// var abi = [
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "certificate",
//         type: "string",
//       },
//     ],
//     name: "addCertificate",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "name",
//         type: "string",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "authorizedAddress",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "bool",
//         name: "isAuthorized",
//         type: "bool",
//       },
//     ],
//     name: "AuthorizationChanged",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "issuer",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "bytes32",
//         name: "certificateHash",
//         type: "bytes32",
//       },
//     ],
//     name: "CertificateAdded",
//     type: "event",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "authorizedAddress",
//         type: "address",
//       },
//       {
//         internalType: "bool",
//         name: "isAuthorized",
//         type: "bool",
//       },
//       {
//         internalType: "string",
//         name: "name",
//         type: "string",
//       },
//     ],
//     name: "changeAuthorization",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "a",
//         type: "address",
//       },
//       {
//         internalType: "string",
//         name: "n",
//         type: "string",
//       },
//     ],
//     name: "ininElection",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bool",
//         name: "x",
//         type: "bool",
//       },
//     ],
//     name: "Vote",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getAddress",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "a",
//         type: "address",
//       },
//     ],
//     name: "getAuthorisedStatus",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getKeys",
//     outputs: [
//       {
//         internalType: "address[]",
//         name: "",
//         type: "address[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getName",
//     outputs: [
//       {
//         internalType: "string",
//         name: "",
//         type: "string",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "a",
//         type: "address",
//       },
//     ],
//     name: "getNamee",
//     outputs: [
//       {
//         internalType: "string",
//         name: "",
//         type: "string",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getVotingStatus",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "auth",
//         type: "address",
//       },
//     ],
//     name: "verifyAuthority",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "certificate",
//         type: "string",
//       },
//     ],
//     name: "verifyCertificate",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];
// var address = "0x29E244EA1846704B2796bc6FE02BD7EE79DB0f5B";

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function Bloom() {
  var output = document.getElementById("balance");
  output.style.display = "none";

  var load = document.getElementById("loading");
  load.style.display = "flex";
  if (window.ethereum) {
    var accounts = await ethereum.request({ method: "eth_requestAccounts" });
    var certificate = document.getElementById("cert_id").value;
    var web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(abi, address);
    var validUser = false;
    await contract.methods
      .verifyAuthority(accounts[0])
      .call()
      .then(function (result) {
        validUser = result;
      });
    if (validUser == false) {
      load.style.display = "none";
      output.style.display = "flex";
      output.textContent = "You are not authorised for this action";
      output.style.background = "rgb(255, 36, 36)";
      output.style.color = "white ";
      output.style.boxShadow = "10px 10px 8px  #3a3a3a";
    } else {
      var status = false;
      await contract.methods
        .verifyCertificate(certificate)
        .call()
        .then(function (result) {
          status = result;
        });
      console.log(status);
      if (status == false) {
        await contract.methods
          .addCertificate(certificate)
          .send({ from: accounts[0] })
          .then(function () {
            load.style.display = "none";
            output.style.display = "flex";
            output.textContent = "The document is Added";
            output.style.background = "rgba(136, 255, 0, 0.5)";
            output.style.color = "rgb(33, 33, 33) ";
            output.style.boxShadow = "10px 10px 8px  #3a3a3a";
          })
          .catch(function (error) {
            load.style.display = "none";
            output.style.display = "flex";
            output.textContent = "Transaction Failed";
            output.style.background = "rgb(255, 36, 36)";
            output.style.color = "white ";
            output.style.boxShadow = "10px 10px 8px  #3a3a3a";
          });
      } else {
        load.style.display = "none";
        output.style.display = "flex";
        output.textContent = "The document already exists";
        output.style.background = "rgb(255, 36, 36)";
        output.style.color = "white ";
        output.style.boxShadow = "10px 10px 8px  #3a3a3a";
      }
    }
  } else {
    load.style.display = "none";
    output.style.display = "flex";
    output.textContent = "Please check metamask";
    output.style.background = "rgba(20, 20, 20, 0.5)";
    output.style.color = "rgb(255, 223, 223)";
    output.style.boxShadow = "10px 10px 8px  #3a3a3a";
  }

  var certificate = document.getElementById("cert_id").value;
  
  var sizeoffilter = 1000000;
  var x = await sha256(certificate);
  var x = "0x" + x;
  console.log(typeof(x));
  console.log((BigInt(x) % BigInt(sizeoffilter)))
  var remaining = Number(BigInt(x) % BigInt(sizeoffilter));
  localStorage.setItem(remaining, true);

  // console.log(localStorage.getItem("lastname"));
}
