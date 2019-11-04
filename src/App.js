import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home/Home';
import About from './components/About';
import Search from './components/Search/Search';
import Footer from './components/Footer';
import TicketsContext from './contexts/TicketsContext';
import TicketPageContainer from './components/Home/Tickets/TicketPageContainer';
import CreateTicketForm from './components/Home/Tickets/CreateTicket/CreateTicketForm';

const API_URL = 'http://localhost:5000/tickets/all'

function App() {
  const [tickets, setTickets] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [setTickets, forceUpdate])

  return (
    <BrowserRouter>
        <Navbar />
        <Header />
        <TicketsContext.Provider value={{tickets, setTickets, setForceUpdate}}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/ticket/:id" component={TicketPageContainer} />
            <Route exact path="/create/ticket" component={CreateTicketForm} />
            <Route exact path="/about" component={About} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </TicketsContext.Provider>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
