import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header';
import Suggestion from './components/suggestion/suggestion';
import api from './api/base';
import rlt from './result';


// class HelloMessage extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       todos: []
//     };
//   }

//   async componentDidMount() {
//     const todos = await api.reloadTodoDatas();
//     this.setState({
//       todos
//     });
//   }

//   render() {
//     const { todos } = this.state;
//     return (
//       <div>
//         <Header/>
//         <div className="container">
//             <h1>Hi {this.props.name}</h1>
//         </div>
//       </div>
//     );
//   }
// }

// const App = document.getElementById("app");
// ReactDOM.render(<HelloMessage name="Caesar" />, App);


const CupidSDK = {
  init: ({ key }) => {
    console.log('your user key is:', key);
  },
  renderProductList: () => {
    const App = document.getElementById("app");
    ReactDOM.render(<Suggestion suggestionTags={rlt.result.suggestionTags} />, App);
  }
}
module.exports = window.CupidSDK = CupidSDK;
