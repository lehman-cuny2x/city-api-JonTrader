import './App.css';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import axios from 'axios';

class App extends Component
{

    constructor()
    {
        super()

        this.state =
        {
            zips: [],
            cities: [],
            isFound: true
        }
    }

    results = async (event) =>
    {
        event.preventDefault();

        try
        {
            this.setState({ isFound: true })
            const city = document.getElementById("city").value.toUpperCase();


            const res = await axios.get(`http://ctp-zip-api.herokuapp.com/city/${city}`)

            this.setState({ zips: [...res.data] })
            console.log(this.state.zips);

            let zipValues = this.state.zips;

            for (let value of zipValues)
            {
                try
                {
                    const response = await axios.get(`http://ctp-zip-api.herokuapp.com/zip/${value}`)
                    console.log(response.data);
                }
                catch(error)
                {
                    console.log(error);
                }

            }

        }
        catch (error)
        {
            this.setState({ isFound: false })
            console.log(error)
        }

    }

    
}

export default App;
