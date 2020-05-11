import React from 'react';
import axios from "axios";
var convert = require('xml-js');
const site = "https://www.boardgamegeek.com/xmlapi/";


export default class APICall extends React.Component {
  state = {
    persons: []
  }

  componentDidMount () {
    axios.get(site + 'search?search=')
    .then(res => {
      console.log(convert.xml2json(res.data, {compact: true, spaces: 4}));
      this.setState({ persons: res.data });
    })
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map(person => {
            return (
              <li key={person}>
              {/* <a href={"/books/" + book.id}> */}
                  <strong>
                    {person}
                  </strong>
              {/* </a> */}
              {/* <DeleteBtn onClick={() => deleteBook(book.id)} /> */}
              {/* <FormBtn
                  // disabled={!(formObject.author && formObject.title)}
                  onClick={handleFormSubmit}
                  value={book.id}
              >
                  Save Book
              </FormBtn> */}
              </li>
            );          
            })}
        </ul>

      </div>
    )
  }
}