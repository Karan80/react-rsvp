import React, { Component } from 'react';

import GuestList from './components/GuestList';
import Counter from './components/Counter';
import ConfirmedFilter from './components/ConfirmedFilter';
import Header from './components/Header';

class App extends Component {
    
  state = {
      isFiltered : false,
      pendingGuest: "",
      guests: [
          {
            name: 'Karan',
            isConfirmed: true,
            isEditing: false
          },
          {
            name: 'Guil',
            isConfirmed: false,
            isEditing: false
          },
          {
            name: 'Natalie',
            isConfirmed: true,
            isEditing: true
          }
      ]  
  }

  toggleGuestPropertyAt = (property, indexToChange) => {
      this.setState({ 
         guests: this.state.guests.map((guest, index) => {
             if(index === indexToChange){
                 return {
                   ...guest,
                   [property]: !guest[property]                   
                 };
             }
             return guest;
         })
      })
  }
  
  toggleConfirmationAt = index => 
    this.toggleGuestPropertyAt("isConfirmed", index);

  toggleEditingAt = index => 
    this.toggleGuestPropertyAt("isEditing", index);

  removeGuestAt = index =>
    this.setState({
       guests: [
           ...this.state.guests.slice(0,index),
           ...this.state.guests.slice(index + 1)
       ]
    })

  setNameAt = (name, indexToChange) => {
      this.setState({ 
         guests: this.state.guests.map((guest, index) => {
             if(index === indexToChange){
                 return {
                   ...guest,
                   name                  
                 };
             }
             return guest;
         })
      })
  }
  
  toggleFilter = () =>
      this.setState({ isFiltered: !this.state.isFiltered })
  
  handleNameInput = e => 
     this.setState({ pendingGuest: e.target.value })

  handleSubmit = e => {
      e.preventDefault();
      if(this.state.pendingGuest){
          this.setState({
              guests: [
                  {
                     name: this.state.pendingGuest,
                     isConfirmed: false,
                     isEditing: false
                  },
                  ...this.state.guests
              ],
              pendingGuest: ""        
          })
      }   
  }

  getTotalInvited = () => this.state.guests.length;

  getAttendingGuest = () => 
      this.state.guests.reduce( (total, guest) => guest.isConfirmed ? total + 1 :        total,0);
  
  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuest();
    const numberUnconfirmed = totalInvited - numberAttending;
      
    return (
    <div className="App">
      <Header
             handleSubmit={this.handleSubmit}
             value={this.state.pendingGuest}
             handleNameInput={this.handleNameInput}
      />
        
      <div className="main">
        <ConfirmedFilter                
               toggleFilterAt={this.toggleFilter}
               checked={this.state.isFiltered}/>

        <Counter 
               totalInvited={totalInvited}
               numberAttending={numberAttending}
               numberUnconfirmed={numberUnconfirmed}
        />
        
        <GuestList guests={this.state.guests}
               toggleConfirmationAt = { this.toggleConfirmationAt}
               toggleEditingAt = { this.toggleEditingAt}
               setNameAt = { this.setNameAt}
               isFiltered={this.state.isFiltered}
               removeGuestAt = { this.removeGuestAt}
               pendingGuest = {this.state.pendingGuest}          
        />
      </div>
    </div>
    );
  }
}

export default App;
