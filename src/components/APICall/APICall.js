import React from 'react';
import axios from "axios";
var convert = require('xml-js');
const site = "https://www.boardgamegeek.com/xmlapi2/";


export default class APICall extends React.Component {
  state = {
    persons: []
  }

  componentDidMount () {
    axios.get( site + 'thing?id=1')
    .then(res => {
      console.log(convert.xml2json(res.data, {compact: true, spaces: 4}));
      this.setState({ person: res.data });
    })
  }
  render() {
    return (
      <div></div>
    )
  }
}