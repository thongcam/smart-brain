import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import LinkForm from './components/LinkForm/LinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import 'tachyons';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      input:'',
      imageUrl: '',
      box:'',
      route:'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
    this.particlesParam =
        {particles: {
          number: {
            value:70,
            density: {
              enable:true,
              value_area:800,
            }
          }
        }
      };
  }

  loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.name,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }
  componentDidMount() {
    fetch('https://pure-ridge-87477.herokuapp.com/')
      .then(response => response.json())
      .then(console.log)
  }

  calculateFaceLocation = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol:width - ClarifaiFace.right_col * width,
      bottomRow: height - ClarifaiFace.bottom_row * height
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }


  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    fetch('https://pure-ridge-87477.herokuapp.com/imageURL', {
      method: 'post',
      headers: {'Content-Type':  'application/json'},
      body: JSON.stringify({
        url : this.state.input,
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://pure-ridge-87477.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify({
              id : this.state.user.id,
            })
          })
          .then(count => {

            return count.json();
          })
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response));

      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {

    if(route==='signout'||route==='signin'){
      this.setState({isSignedIn:false});
    } else if (route==='home') {
      this.setState({isSignedIn:true});
    }
    this.setState({input:''});
    this.setState({imageUrl:''});
    this.setState({route:route});
  }

  renderSwitch = () => {
    switch (this.state.route) {
      case 'signin':
        return <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      case 'register':
        return <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      case 'home':
        return (
            <div>
              <Logo/>
              <Rank entries={this.state.user.entries} name={this.state.user.name}/>
              <LinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
            </div>)
      default:
        return <SignIn onRouteChange={this.onRouteChange}/>
    }
  }

  render () {
    return (
      <div className="App">
        <Particles params={this.particlesParam} className='particles' />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {this.renderSwitch()}
      </div>
    );
  }
}

export default App;
