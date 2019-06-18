import React from 'react';
import {ipcRenderer, remote} from 'electron';
// const example = remote.require('./example'); メインプロセスで動作したほうがよい重い処理

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      outputValue: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.rePly = this.rePly.bind(this);
    ipcRenderer.on('asynchronous-reply', this.rePly);
  }

  rePly(event, message) {
    this.setState({
      outputValue: message,
    });
  }

  changeHandler(event) {
    this.setState({
      inputValue: event.target.value,
    });
    ipcRenderer.send('asynchronous-message', event.target.value);
  }

  render() {
    return (
      <div>
        <textarea
          value={this.state.inputValue}
          onChange={this.changeHandler}
        />
        <div>{this.state.outputValue}</div>
      </div>
    );
  }

}

export default Form;
