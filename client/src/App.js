import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
// https://api.tvmaze.com/search/shows?q=all
import Main from './components/main/Main'
import Web3 from 'web3';
import decentagram from '../src/contracts/decentagram.json'

const App = () => {
  const [state, setState] = useState({ loading: false });
  const [data, setData] = useState(null)
  const [accountData, setAccountData] = useState('')
  const [imageData, setImageData] = useState([])


  const IPFS = require('ipfs-api');
  const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

  useEffect(async () => {
    await web3get()
    await loadData()
  }, [])

  const web3get = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    setAccountData(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = decentagram.networks[networkId]
    if (networkData) {
      const decent1 = new web3.eth.Contract(decentagram.abi, networkData.address)
      setData(decent1)
      const imagesCount = await decent1.methods.imageCount().call()
       let arr = []
      for (var i = 1; i <= imagesCount; i++) {
        const image = await decent1.methods.images(i).call()
         arr.push(image)  
        
      }
      setImageData(arr)
      
      setState({ loading: false });
    } else {
      window.alert("'Decentagram contract not deployed to detected network")
    }
  }


  const captureFile = (event) => {
    console.log(event , "event")
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setState({ buffer: Buffer(reader.result) })
    }
  }


  const uploadImage = (description) => {
    //adding file to the IPFS
    ipfs.add(state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if (error) {
        return
      }

      setState({ loading: true })
      data.methods.uploadImage(result[0].hash, description).send({ from: accountData }).on('transactionHash', (hash) => {
        setState({ loading: false })
      })

    })
  }

  return (
    <div>
      <Navbar uploadImage= {uploadImage} />
      {state.loading
        ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
        : <Main
          images={imageData}
          captureFile={captureFile}
          uploadImage={uploadImage}

        />
      }
    </div>
  )
};

export default App;



// import decentagram from '../src/contracts/decentagram.json'
// import React, { Component } from 'react';
// import Navbar from './components/Navbar'
// import Main from './components/Main'
// import Web3 from 'web3';
// import Identicon from 'identicon.js';


// //Declare IPFS
// const IPFS = require('ipfs-api');
// const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

// class App extends Component {

//   async componentWillMount() {
//     await this.loadWeb3()
//     await this.loadBlockchainData()
//   }

//   async loadWeb3() {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum)
//       await window.ethereum.enable()
//     }
//     else if (window.web3) {
//       window.web3 = new Web3(window.web3.currentProvider)
//     }
//     else {
//       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//     }
//   }

//   async loadBlockchainData() {
//     const web3 = window.web3
//     // Load account
//     const accounts = await web3.eth.getAccounts()
//     this.setState({ account: accounts[0] })
//     // Network ID
//     const networkId = await web3.eth.net.getId()
//     const networkData = decentagram.networks[networkId]
//     if(networkData) {
//       const decentragram = new web3.eth.Contract(decentagram.abi, networkData.address)
//       this.setState({ decentragram })
//       const imagesCount = await decentragram.methods.imageCount().call()
//       this.setState({ imagesCount })
//       // Load images
//       for (var i = 1; i <= imagesCount; i++) {
//         const image = await decentragram.methods.images(i).call()
//         this.setState({
//           images: [...this.state.images, image]
//         })
//       }
//       // Sort images. Show highest tipped images first
//       // this.setState({
//       //   images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
//       // })
//       // this.setState({ loading: false})
//     } else {
//       window.alert('Decentragram contract not deployed to detected network.')
//     }
//   }

//   captureFile = event => {

//     event.preventDefault()
//     const file = event.target.files[0]
//     const reader = new window.FileReader()
//     reader.readAsArrayBuffer(file)

//     reader.onloadend = () => {
//       this.setState({ buffer: Buffer(reader.result) })
//       console.log('buffer', this.state.buffer)
//     }
//   }

//   uploadImage = (description) => {
//     console.log("Submitting file to ipfs...")

//     //adding file to the IPFS
//     ipfs.add(this.state.buffer, (error, result) => {
//       console.log('Ipfs result', result)
//       if(error) {
//         console.error(error)
//         return
//       }

//       this.setState({ loading: true })
//       this.state.decentragram.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
//         this.setState({ loading: false })
//       })
//     })
//   }

//   // tipImageOwner(id, tipAmount) {
//   //   this.setState({ loading: true })
//   //   this.state.decentragram.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
//   //     this.setState({ loading: false })
//   //   })
//   // }
//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '',
//       decentragram: null,
//       images: [],
//       loading: false
//     }

//     this.uploadImage = this.uploadImage.bind(this)
//     // this.tipImageOwner = this.tipImageOwner.bind(this)
//     this.captureFile = this.captureFile.bind(this)
//   }

//   render() {
//     return (
//       <div>
//         <Navbar account={this.state.account} />
//         { this.state.loading
//           ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
//           : <Main
//               images={this.state.images}
//               captureFile={this.captureFile}
//               uploadImage={this.uploadImage}
//               // tipImageOwner={this.tipImageOwner}
//             />
//         }
//       </div>
//     );
//   }
// }

// export default App;