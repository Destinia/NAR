import React, { Component } from 'react';
import moment from 'moment';
import Datetime from 'react-datetime'
import logo from './logo.svg';
import ImageGallery from "react-image-gallery";
import './App.css';
import 'react-datetime/css/react-datetime.css';
import 'react-image-gallery/styles/css/image-gallery.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curTime: moment(),
      valid: moment('', 'YYYY-MM-DD-HH-mm'),
      validTime: [],
    }
  }
  componentDidMount(){
    fetch("/static/date_list.json").then(res => res.json()).then(json => {
      console.log(json);
        this.setState({ validTime: json });
      });
  }
  handleDatetimeChange = (m) => {
    console.log(m);
    this.setState({
      curTime: m,
    })
  }
  validMoment = (m) => {
    return m.isAfter(this.state.valid);
  }
  render() {
    console.log(this.state);
    const { validTime } = this.state;
    const time = validTime.filter((m_str) => moment(m_str,'YYYY-MM-DD-HH-mm').isAfter(this.state.curTime))[0] || validTime[validTime.length-1];

    const images = [
      {
        originalTitle: 'frequency_x',
        original: `/static/${time}_frequency_x.png`,
        thumbnail: `/static/${time}_frequency_x.png`,
      },
      {
        originalTitle: 'frequency_y',
        original: `/static/${time}_frequency_y.png`,
        thumbnail: `/static/${time}_frequency_y.png`,
      },
      {
        originalTitle: 'frequency_z',
        original: `/static/${time}_frequency_z.png`,
        thumbnail: `/static/${time}_frequency_z.png`,
      },
      {
        originalTitle: 'time_x',
        original: `/static/${time}_time_x.png`,
        thumbnail: `/static/${time}_time_x.png`,
      },
      {
        originalTitle: 'time_y',
        original: `/static/${time}_time_y.png`,
        thumbnail: `/static/${time}_time_y.png`,
      },
      {
        originalTitle: 'time_z',
        original: `/static/${time}_time_z.png`,
        thumbnail: `/static/${time}_time_z.png`,
      },

    ]
    return <div className="App">
        <header className="App-header">
          <img src="/banner.jpg" className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        <div className="Datetime-container">
          <Datetime
            value={this.state.curTime}
            onChange={this.handleDatetimeChange}
            // onBlur={}
            // isValidDate={this.validMoment}
          />
        </div>
        <div className="gallery-container">
          <ImageGallery items={images} />
        </div>
      </div>;
  }
}

export default App;
