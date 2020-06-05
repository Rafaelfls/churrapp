import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class MyTimePicker extends Component {
  constructor(props){
    super(props)
    this.state = {time:"15:00"}
  }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="time"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            borderRadius:8,
            marginLeft: 36
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}