import React ,{useRef} from 'react';
import {AiOutlineHeart} from "react-icons/ai";
import {FaRegComment} from "react-icons/fa";
import '../main/main.css'


const Main = (props) => {
var imageDescription = useRef();
 


    return (
      <div className="container">
        <div className='form'>
              <h2>Share Image</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = imageDescription.value;
                props.uploadImage(description)
              }} >
                <div className='inputBtn'>
                <input   type='file' accept=".jpg, .jpeg, .png, .bmp, .gif"   onChange={props.captureFile} />
                    <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input)=> imageDescription= input }
                        className="description"
                        placeholder="Image description..."
                        required />
                <button type="submit" className='btn' >Upload!</button>
                </div>
              </form>
              </div>
              <p>&nbsp;</p>
              { props.images.map((image, key) => {
                return(
                  <div className="card mb-4" key={key} >
                        <img key={key} src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}}/>
                        <p>{image.description}</p>
                        <AiOutlineHeart />
                        <FaRegComment/>
                  </div>
                )
              })}
            </div>
            
    );
  }


export default Main;




// import React, { Component } from 'react';

// class Main extends Component {


//   render() {
//     return (
//       <div className="container-fluid mt-5">
//         <div className="row">
//           <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
//             <div className="content mr-auto ml-auto">
//               <p>&nbsp;</p>
//               <h2>Share Image</h2>
//               <form onSubmit={(event) => {
//                 event.preventDefault()
//                 const description = this.imageDescription.value
//                 this.props.uploadImage(description)
//               }} >
//                 <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
//                   <div className="form-group mr-sm-2">
//                     <br></br>
//                       <input
//                         id="imageDescription"
//                         type="text"
//                         ref={(input) => { this.imageDescription = input }}
//                         className="form-control"
//                         placeholder="Image description..."
//                         required />
//                   </div>
//                 <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
//               </form>
//               <p>&nbsp;</p>
//               { this.props.images.map((image, key) => {
//                 return(
//                   <div className="card mb-4" key={key} >
                    
//                     <ul id="imageList" className="list-group list-group-flush">
//                       <li className="list-group-item">
//                         <p class="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}}/></p>
//                         <p>{image.description}</p>
//                       </li>
//                     </ul>
//                   </div>
//                 )
//               })}
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }
// }

// export default Main;