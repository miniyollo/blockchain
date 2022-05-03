// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;



contract solidity{
    struct File{
        string hash;
        string filename;
        string filetype;
        uint date;
    }

    mapping(address=>File[])files;

    function add(string memory _hash, string memory _filename, string memory _filetype, uint _date)
        public{
files[msg.sender].push(File({hash:_hash, filename:_filename, filetype:_filetype,date:_date}));

        }

        function getFile(uint _index) public view returns(string memory, string memory, string memory, uint){
File memory file =files[msg.sender][_index]; //gives index of the file 
return(file.hash,file.filename,file.filetype,file.date);  
        
}
        //to iterate 
        function getlength() public view returns(uint){
            return files[msg.sender].length;
        }
}
