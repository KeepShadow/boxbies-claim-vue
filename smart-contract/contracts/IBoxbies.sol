// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

interface IBoxbies {

    function isWhitelisted(address _user) external view returns (bool);

    function isOGlisted(address _user) external view returns (bool);

    function tokensByOwner(address _owner) external view returns (uint256[] memory);

}
