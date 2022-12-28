// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./IRoomShare.sol";

contract RoomShare is IRoomShare {
    // Fields
    uint256 public roomId = 0;
    mapping(uint256 => Room) public roomId2room;

    uint256 public rentId = 0;
    mapping(address => Rent[]) public renter2rent;
    mapping(uint256 => Rent[]) public roomId2rent;

    // Methods
    function getMyRents() external view override returns (Rent[] memory) {
        /* 함수를 호출한 유저의 대여 목록을 가져온다. */
        return renter2rent[msg.sender];
    }

    function getRoomRentHistory(uint256 _roomId)
        external
        view
        override
        returns (Rent[] memory)
    {
        /* 특정 방의 대여 히스토리를 보여준다. */
        return roomId2rent[_roomId];
    }

    function shareRoom(
        string calldata name,
        string calldata location,
        uint256 price
    ) external override {
        /**
         * 1. isActive 초기값은 true로 활성화, 함수를 호출한 유저가 방의 소유자이며, 365 크기의 boolean 배열을 생성하여 방 객체를 만든다.
         * 2. 방의 id와 방 객체를 매핑한다.
         */
        roomId2room[roomId] = Room(
            roomId,
            name,
            location,
            true,
            price,
            msg.sender,
            new bool[](365)
        );
        emit NewRoom(roomId++);
    }

    function rentRoom(
        uint256 _roomId,
        uint256 checkInDate,
        uint256 checkOutDate
    ) external payable override {
        /**
         * 1. roomId에 해당하는 방을 조회하여 아래와 같은 조건을 만족하는지 체크한다.
         *    a. 현재 활성화(isActive) 되어 있는지
         *    b. 체크인날짜와 체크아웃날짜 사이에 예약된 날이 있는지
         *    c. 함수를 호출한 유저가 보낸 이더리움 값이 대여한 날에 맞게 지불되었는지(단위는 1 Finney, 10^15 Wei)
         * 2. 방의 소유자에게 값을 지불하고 (msg.value 사용) createRent를 호출한다.
         */

        require(checkInDate < checkOutDate, "Rental period is incorrect.");
        Room memory room = roomId2room[_roomId];
        require(room.isActive, "This room is inactive.");
        for (uint256 i = checkInDate; i < checkOutDate; i++) {
            require(!room.isRented[i], "This room is already rented.");
        }
        uint256 price = (checkOutDate - checkInDate) * room.price * 1e15;
        require(msg.value == price, "The price you paid is incorrect.");

        _sendFunds(room.owner, msg.value);
        _createRent(_roomId, checkInDate, checkOutDate);
    }

    function _createRent(
        uint256 _roomId,
        uint256 checkInDate,
        uint256 checkOutDate
    ) internal {
        /**
         * 1. 함수를 호출한 사용자 계정으로 대여 객체를 만들고, 변수 저장 공간에 유의하며 체크인날짜부터 체크아웃날짜에 해당하는 배열 인덱스를 체크한다(초기값은 false이다.).
         * 2. 계정과 대여 객체들을 매핑한다. (대여 목록)
         * 3. 방 id와 대여 객체들을 매핑한다. (대여 히스토리)
         */
        for (uint256 i = checkInDate; i < checkOutDate; i++) {
            roomId2room[_roomId].isRented[i] = true;
        }
        Rent memory rent = Rent(
            rentId,
            _roomId,
            checkInDate,
            checkOutDate,
            msg.sender
        );
        renter2rent[msg.sender].push(rent);
        roomId2rent[_roomId].push(rent);
        emit NewRent(_roomId, rentId++);
    }

    function _sendFunds(address owner, uint256 value) internal {
        payable(owner).transfer(value);
    }

    function recommendDate(
        uint256 _roomId,
        uint256 checkInDate,
        uint256 checkOutDate
    ) external view override returns (uint256[2] memory) {
        /**
         * 대여가 이미 진행되어 해당 날짜에 대여가 불가능 할 경우,
         * 기존에 예약된 날짜가 언제부터 언제까지인지 반환한다.
         * checkInDate(체크인하려는 날짜) <= 대여된 체크인 날짜 , 대여된 체크아웃 날짜 < checkOutDate(체크아웃하려는 날짜)
         */
        Room memory room = roomId2room[_roomId];
        uint256[2] memory rentedDate;
        bool rentedCheckIn = false;
        bool isRented;
        uint256 date;

        for (date = checkInDate; date < checkOutDate; date++) {
            isRented = room.isRented[date];
            if (!rentedCheckIn) {
                if (isRented) {
                    rentedDate[0] = date;
                    rentedCheckIn = true;
                }
            } else {
                if (!isRented) {
                    rentedDate[1] = date;
                    break;
                }
            }
        }
        if (rentedCheckIn && date == checkOutDate) {
            rentedDate[1] = checkOutDate;
        }
        return rentedDate;
    }
}
