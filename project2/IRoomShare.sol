// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IRoomShare {
    struct Room {
        uint256 id;
        string name;
        string location;
        bool isActive;
        uint256 price;
        address owner;
        bool[] isRented;
    }

    struct Rent {
        uint256 id;
        uint256 rId;
        uint256 checkInDate;
        uint256 checkOutDate;
        address renter;
    }

    event NewRoom(uint256 indexed roomId);
    event NewRent(uint256 indexed roomId, uint256 indexed rentId);
    event Transfer(address sender, address recipient, uint256 amount);

    function getMyRents() external view returns (Rent[] memory);

    function getRoomRentHistory(uint256 _roomId)
        external
        view
        returns (Rent[] memory);

    function shareRoom(
        string calldata name,
        string calldata location,
        uint256 price
    ) external;

    function rentRoom(
        uint256 _roomId,
        uint256 checkInDate,
        uint256 checkOutDate
    ) external payable;

    function recommendDate(
        uint256 _roomId,
        uint256 checkInDate,
        uint256 checkOutDate
    ) external view returns (uint256[2] memory);
}
