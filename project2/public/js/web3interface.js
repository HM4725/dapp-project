let web3;
let user;

const mEthPrice = 1600;
const currentYear = 2022;

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roomId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "rentId",
				"type": "uint256"
			}
		],
		"name": "NewRent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roomId",
				"type": "uint256"
			}
		],
		"name": "NewRoom",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getMyRents",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "checkInDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "checkOutDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "renter",
						"type": "address"
					}
				],
				"internalType": "struct IRoomShare.Rent[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roomId",
				"type": "uint256"
			}
		],
		"name": "getRoomRentHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "checkInDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "checkOutDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "renter",
						"type": "address"
					}
				],
				"internalType": "struct IRoomShare.Rent[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roomId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "checkInDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "checkOutDate",
				"type": "uint256"
			}
		],
		"name": "recommendDate",
		"outputs": [
			{
				"internalType": "uint256[2]",
				"name": "",
				"type": "uint256[2]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rentId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roomId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "checkInDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "checkOutDate",
				"type": "uint256"
			}
		],
		"name": "rentRoom",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "renter2rent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "checkInDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "checkOutDate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "renter",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "roomId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roomId2rent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "checkInDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "checkOutDate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "renter",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roomId2room",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "shareRoom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]; // ??????????????? ????????? abi ?????? ????????????

const contract_address = "0x304a1e2704BB4111954126be1004fc4744e62a0f"; // ????????? ?????? ????????? ?????? ????????????

const logIn = async () => {
  const ID = prompt("choose your ID");
  // ?????? ??? (ganache)
  // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

  // ?????? ?????? ??? (metamask)
  web3 = await metamaskRequest();
  
  user = await getAccountInfos(Number(ID));

  await _updateUserAddress(user);
  await _updateUserBalance(user);

  _updateRooms();
  _updateRents();
}

const metamaskRequest = async () => {
  // metamask request 
  if (window.ethereum != null) {
    web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      await web3.eth.requestAccounts()
      // Acccounts now exposed
      if (await web3.eth.net.getId() !== 11155111) alert("change to Sepolia test network")
    } catch (error) {
      // User denied account access...
      alert("Access Denied")
    }
  }
  return web3;
}

const getAccountInfos = async (id) => {
  const account = await web3.eth.getAccounts().catch(e => {
    console.log('getAccountError: ', e);
  });
  console.log(account);
  return account[id];
}

const getBalance = async (address) => {
  const balance = await web3.eth.getBalance(address).catch(e => {
    console.log('getBalanceError: ', e);
  });
  console.log(balance);
  return web3.utils.fromWei(balance, 'ether');
}

const _updateUserAddress = async (address) => {
  document.getElementById("address").text = address;
}

const _updateUserBalance = async (address) => {
  document.getElementById("balanceAmount").text = await getBalance(address);
}

const _updateRooms = () => {
  displayAllRooms();
  listAllRooms();
}

const _updateRents = () => {
  displayMyRents();
  displayRoomHistory();
}

let RoomShare;

const getRoomShareContract = () => {
  RoomShare = new web3.eth.Contract(abi, contract_address);
  return RoomShare
}

let checkInDatedom;
let checkOutDatedom;
let roomsSelect;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('logIn').addEventListener("click", logIn);
  document.getElementById('rentRoom').addEventListener("click", rentRoom);
  document.getElementById('shareRoom').addEventListener("click", shareRoom);

  checkInDatedom = document.getElementById('checkInDate');
  checkOutDatedom = document.getElementById('checkOutDate');
  mEth2krwdom = document.getElementById('mEth2krw');
  pricedom = document.getElementById('price');

  checkInDatedom.addEventListener("input", () => {
    const datevalformatted = checkInDatedom.value.replace(/(\d{4})(\d{2})(\d{2})|(\d{4})-(\d{2})(\d{2})/, "$1$4-$2$5-$3$6");
    checkInDatedom.value = datevalformatted;
  });

  checkOutDatedom.addEventListener("input", () => {
    const datevalformatted = checkOutDatedom.value.replace(/(\d{4})(\d{2})(\d{2})|(\d{4})-(\d{2})(\d{2})/, "$1$4-$2$5-$3$6");
    checkOutDatedom.value = datevalformatted;

    const checkInDate = getDayOfYear(checkInDatedom.value);
    const checkOutDate = getDayOfYear(datevalformatted);

    updateTotalPrice(checkInDate, checkOutDate);
  });

  pricedom.addEventListener("input", () => {
    const methval = pricedom.value;
    mEth2krwdom.innerText = `${methval * mEthPrice} KRW`;
  });

  roomsSelect = document.getElementById("rooms-select");
  roomsSelect.addEventListener('change', displayRoomHistory);
});

const getDayOfYear = (date) => {
  const now = new Date(date);
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day
}

function dateFromDay(year, day) {
  var date = new Date(String(year), 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day)); // add the number of days
}

const shareRoom = async () => {
  const shareRoomForm = document.forms.shareRoom;
  const name = shareRoomForm.elements.name.value;
  const location = shareRoomForm.elements.location.value;
  const price = shareRoomForm.elements.price.value;

  await _shareRoom(name, location, price);
  await _updateUserBalance(user);
  _updateRooms();
}

const _shareRoom = async (name, location, price) => {
  // RoomShareContract??? shareRoom ????????? ????????????.
  // ??? ??????, ??????, ????????? ?????? ????????? ???????????? ??????????????? ????????????.
  // ?????? ????????? call ?????? send ????????? ??????????????? from, gas ?????? ?????? ????????? ???????????? ????????????. (e.g. {from: ..., gas: 3000000, ...})
  // ??????????????? ???????????? ???????????? ?????? ????????? ?????????. (e.g. alert("??????"))
  // ????????? ???????????? ??????.
  try {
    const contract = await getRoomShareContract();
    await contract.methods.shareRoom(name, location, price).send({ from: user, gas: 3000000 });
    alert("??????");
  } catch (e) {
    console.error(e);
  }
}

const _getMyRents = async () => {
  // ?????? ????????? ??? ???????????? ????????????.
  let myRents = [];
  try {
    const contract = await getRoomShareContract();
    myRents = await contract.methods.getMyRents().call({ from: user });
  } catch (e) {
    console.error(e);
  }
  return myRents;
}

const displayMyRents = async () => {
  const myRents = await _getMyRents();
  let html = "";
  for (let i = 0; i < myRents.length; ++i) {
    html += "<tr>";
    html += "<td>" + myRents[i].id + "</td>"
    html += "<td>" + myRents[i].rId + "</td>"
    html += "<td>" + dateFromDay(currentYear, myRents[i].checkInDate).toDateString() + "</td>"
    html += "<td>" + dateFromDay(currentYear, myRents[i].checkOutDate).toDateString() + "</td>"
    html += "</tr>";
  }
  document.getElementById('myRents').innerHTML = html;
}

const _getAllRooms = async () => {
  // Room ID ??? ???????????? ??????????????? ????????? ?????? ??? ????????? ???????????? ????????????.
  const rooms = [];
  try {
    const contract = await getRoomShareContract();
    const nRooms = await contract.methods.roomId().call({ from: user });
    for (let i = 0; i < nRooms; i++) {
      const room = await contract.methods.roomId2room(i).call({ from: user });
      rooms.push(room);
    }
  } catch (e) {
    console.error(e);
  }
  return rooms;
}

const displayAllRooms = async () => {
  const allRooms = await _getAllRooms();
  let html = "";
  for (let i = 0; i < allRooms.length; ++i) {
    html += "<tr>";
    html += "<td>" + allRooms[i].id + "</td>"
    html += "<td>" + allRooms[i].name + "</td>"
    html += "<td>" + allRooms[i].location + "</td>"
    html += "<td>" + allRooms[i].isActive + "</td>"
    html += "<td>" + allRooms[i].price + "</td>"
    html += "<td>" + allRooms[i].owner.slice(0, 7) + "..." + "</td>"
    html += "</tr>";
  }
  document.getElementById('allRooms').innerHTML = html;
}

const listAllRooms = async () => {
  const allRooms = await _getAllRooms();
  let html = "<option value=''>- Rooms Available -</option>";
  for (let i = 0; i < allRooms.length; ++i) {
    if (allRooms[i].isActive == false)
      continue;
    const jsonstr = JSON.stringify(allRooms[i]).replaceAll(" ", "+");
    html += `<option value=${jsonstr}>`;
    html += allRooms[i].id + " | "
    html += allRooms[i].name + " | "
    html += allRooms[i].location.replaceAll("+", " ") + " | "
    html += allRooms[i].isActive + " | "
    html += allRooms[i].price + " | "
    html += allRooms[i].owner.slice(0, 17) + "..."
    html += "</option>";
  }
  roomsSelect.innerHTML = html;
}

const returnOptionsJSON = () => {
  const obj = roomsSelect.options[roomsSelect.selectedIndex];
  if (obj && obj.value) {
    const jsonobj = JSON.parse(obj.value.replaceAll("+", " "));
    return jsonobj;
  }
  return null;
}

const calculatePrice = (checkInDate, checkOutDate) => {
  try {
    const jsonobj = returnOptionsJSON();
    const price = Number(jsonobj.price);
    const _price = (checkOutDate - checkInDate) * price;
    return _price;
  } catch (e) {
    return NaN;
  }
}

const updateTotalPrice = (checkInDate, checkOutDate) => {
  const _price = calculatePrice(checkInDate, checkOutDate);
  const totalfeedom = document.getElementById('totalfee');
  totalfeedom.innerText = `${_price * mEthPrice} KRW`;
}

const rentRoom = async () => {
  const checkInDate = getDayOfYear(checkInDatedom.value);
  const checkOutDate = getDayOfYear(checkOutDatedom.value);

  const _price = calculatePrice(checkInDate, checkOutDate);
  const jsonobj = returnOptionsJSON();
  const roomId = jsonobj.id;

  await _rentRoom(roomId, checkInDate, checkOutDate, _price);
  await _updateUserBalance(user);
  _updateRents();
}

const _rentRoom = async (roomId, checkInDate, checkOutDate, price) => {
  // ????????? ????????? ???????????? ????????? ??????, ????????? ?????? ????????? ????????? ??????????????? ????????????. 
  // ????????? ???????????? ??????????????? ???????????? ?????? ????????? ?????????.
  // ????????? ?????? ?????? ????????? ??????????????? ??????????????? ???????????? ?????? ????????? ?????????. (Solidity??? require??? ?????????)
  // ????????? finney = milli Eth (10^15)
  // Room ID??? ???????????? ?????? ?????????????????? ????????? ??????????????? ???????????? ???????????? _recommendDate ????????? ????????????.
  // ????????? ???????????? ??????.
  try {
    const contract = await getRoomShareContract();
    if(price > 0) {
      const priceWei = price * Math.pow(10, 15);
      await contract.methods.rentRoom(roomId, checkInDate, checkOutDate).send({ from: user, gas: 3000000, value: priceWei });
      alert("?????? ??????");
    }
  } catch (e) {
    await _recommendDate(roomId, checkInDate, checkOutDate);
    console.error(e);
  }
}

const _recommendDate = async (roomId, checkInDate, checkOutDate) => {
  // Room ID??? ???????????? ?????? ?????????????????? ????????? ??????????????????,
  // ????????? ????????? ????????? ???????????? ?????????????????? ?????? ???????????? ????????????.
  // checkInDate <= ????????? ????????? ?????? , ????????? ???????????? ?????? < checkOutDate
  // ????????? ?????? ?????? dateFromDay ??? ????????????.
  try {
    const contract = await getRoomShareContract();
    const rentedDate = await contract.methods.recommendDate(roomId, checkInDate, checkOutDate).call({ from: user });
    const sRentedData = [
      dateFromDay(currentYear, rentedDate[0]).toDateString(),
      dateFromDay(currentYear, rentedDate[1]).toDateString()
    ];
    console.log(rentedDate[0], rentedDate[1]);
    alert(`?????? ?????? ??????: ${sRentedData[0]} ~ ${sRentedData[1]}`);
  } catch (e) {
    console.error(e);
  }
}

const getRoomRentHistory = async () => {
  // ????????? ?????? ?????? ????????? ???????????? ???????????? ??????(????????????)??? ????????????.
  // ??? ????????? ????????? ????????? ?????? ?????? returnOptionsJSON ??? ???????????? ????????? ?????? ID ?????? ????????? ??????????????? ????????????.
  let history = [];
  try {
    const jsonobj = returnOptionsJSON();
    if (jsonobj) {
      const roomId = jsonobj.id;
      const contract = await getRoomShareContract();
      history = await contract.methods.getRoomRentHistory(roomId).call({ from: user });
    }
  } catch (e) {
    console.error(e);
  }
  return history;
}

const displayRoomHistory = async () => {
  const history = await getRoomRentHistory();
  let html = "";
  for (let i = 0; i < history.length; ++i) {
    html += "<tr>";
    html += "<td>" + history[i].id + "</td>"
    html += "<td>" + dateFromDay(currentYear, history[i].checkInDate).toDateString() + "</td>"
    html += "<td>" + dateFromDay(currentYear, history[i].checkOutDate).toDateString() + "</td>"
    html += "<td>" + history[i].renter.slice(0, 12) + "..." + "</td>"
    html += "</tr>";
  }
  document.getElementById('roomHistory').innerHTML = html;
}
