pragma solidity ^0.8;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract blockporb is ERC721("HelloNft", "HNFT") {
    // property struct
    // TODO rename, Block?
    struct Property {
        uint128 x;
        uint128 y;
        uint128 size;
        address owner;
        uint256 propertyID;
    }

    //Owner struct
    struct Owner {
        address taxID;
        address payable etheriumID;
        string name;
    }


    /*** data structures ***/
    address[] ownerArr;
    // id to property struct
    mapping(uint256 => Property) public idToProperties;
    // owner address to id list
    mapping(address => Owner) public idToOwner;
    // TODO maybe nested mapping?
    mapping(address => uint256[]) public ownerToPropertyList;

    /*** events ***/
    //TODO compare https://stackoverflow.com/questions/67485324/solidity-typeerror-overriding-function-is-missing-override-specifier
    // either inherit ERC721 or implement these events
    //event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    //event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    //event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    /*** own functions ***/
    // assign initial property to caller of constructor
    constructor() public {
        Property memory init = Property(0, 0, maxSize(), msg.sender, 0);
        addStructToAddress(init, msg.sender);
        // TODO save msg.sender as authority
    }

    // return the maximum size a property object can have
    function maxSize() public view returns (uint128) {
        // half of max uint256 because id is uint256
        return 2 ** 128 - 1;
    }

    // create ID by writing x and y in one variable which produces unique identifier
    function getId(Property memory prob) public returns (uint256) {
        uint256 id = prob.y * maxSize();
        id = id & prob.x;
        return id;
    }

    // convinience function to add a Property to an address in all relevant data structures
    function addStructToAddress(Property memory prob, address owner) private {
        prob.owner = owner;
        uint256 id = getId(prob);
        idToProperties[id] = prob;

        uint256[] storage list = ownerToPropertyList[owner];
        list.push(id);
        ownerToPropertyList[owner] = list;
    }

    // extension of balanceOf returning the total size of the owner's property
    function areaBalanceOf(address _owner) external view returns (uint256) {
        uint256[] memory list = ownerToPropertyList[_owner];
        uint256 totalArea = 0;
        for (uint i=0; i<list.length; i++) {
            uint256 iArea = idToProperties[list[i]].size;
            totalArea += iArea ** 2;
        }
        return totalArea;
    }

    /*** ERC721 functions ***/
    // number of tokens for given owner
    function balanceOf(address _owner) public override view returns (uint256) {
        uint256[] memory list = ownerToPropertyList[_owner];
        return list.length;
    }
    // owner for property
    function ownerOf(uint256 _tokenId) public override view returns (address) {
        return idToProperties[_tokenId].owner;
    }

    // function for the land registry to registry owners
    function registrateOwner(address _taxID, address payable _etheriumID, string memory _name) private returns (bool) {
            if(ownerArr.)
            idToOwner[_taxID] = Owner(_taxID, _etheriumID, _name);

            ownerArr.push(_taxID);
            return true;
    }


    // TODO transfer

}
