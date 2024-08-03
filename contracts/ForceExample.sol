// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@patronumlabs/force-transfer/contracts/ForceTransferLib.sol";

contract ForceExample {
    function forceTransferToAddress(
        address payable recipient
    ) external payable {
        ForceTransferLib.force(recipient, msg.value);
    }
}
