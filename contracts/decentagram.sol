 //SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract decentagram {
    string public name = "decentagram";
    uint public imageCount = 0;
    mapping(uint256 => Image) public images;

    struct Image {
        uint256 id;
        string hash;
        string description;
        // string comment;
        uint256 tipAmount;
        address payable author;
    }

    event ImageCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    event ImageTipped(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );

   
  function uploadImage (string memory _imgHash, string memory _description) public {
     require(bytes(_imgHash).length>0);

     require(bytes(_description).length>0);

     require(msg.sender != address(0*0));
    // Increment image id
    imageCount ++;

    // Add Image to the contract
    images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender);
    // Trigger an event
    emit ImageCreated(imageCount, _imgHash, _description,0, msg.sender);
  }

  // function tipImageOwner(uint _id) public payable {
  //   // Make sure the id is valid
  //   require(_id > 0 && _id <= imageCount);
  //   // Fetch the image
  //   Image memory _image = images[_id];
  //   // Fetch the author
  //   address payable _author = _image.author;
  //   // Pay the author by sending them Ether
  //   address(_author).transfer(msg.value);
  //   // Increment the tip amount
  //   _image.tipAmount = _image.tipAmount + msg.value;
  //   // Update the image
  //   images[_id] = _image;
  //   // Trigger an event
  //   emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);
  // }
//   function comment(uint  _comment) public{
//  // Fetch the image
//     Image memory _image = images[_comment];
//       // Update the image
//     images[_comment] = _image;

//   }
}
