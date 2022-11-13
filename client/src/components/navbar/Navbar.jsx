import React from 'react';
import { FiPlusSquare } from "react-icons/fi";
import { MdHomeFilled } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { RiMessengerLine,RiCompass3Line} from "react-icons/ri";
import {AiOutlineHeart,AiOutlineUser} from "react-icons/ai";
import "../navbar/navbar.css";

const Navbar = (props) => {
  return (
      <div>
      <div className='container1'>
          <div className='nav'>
              <div className='navbar'>
                  <div className='navimg'>
                      <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" className='navbarimg' />
                  </div>
                  <div className='search'>
                      <div className='searchbar'>
                          <BsSearch style={{ margin: "6px", color: "#949494", marginLeft: "12px" }} className='sr' />
                          <input type="text" placeholder='Search' />
                      </div>
                  </div>
                  <div className='rightbox'>
                      <div className='righticons'>
                          <MdHomeFilled />
                          <RiMessengerLine />
                          <button onClick={props.uploadImage} ><FiPlusSquare /></button>
                          <RiCompass3Line />
                          <AiOutlineHeart />
                          <AiOutlineUser />
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
  )
}

export default Navbar;



// import React, { Component } from 'react';
// // import Identicon from 'identicon.js';

// class Navbar extends Component {

//   render() {
//     return (
//       <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
//         <ul className="navbar-nav px-3">
//           <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
//             <small className="text-secondary">
//               <small id="account">{this.props.account}</small>
//             </small>
//             {/* { this.props.account
//               ? <img
//                 className='ml-2'
//                 width='30'
//                 height='30'
//                 src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
//               />
//               : <span></span>
//             } */}
//           </li>
//         </ul>
//       </nav>
//     );
//   }
// }

// export default Navbar;