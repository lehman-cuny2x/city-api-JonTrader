import './App.css';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
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
            
        }
        catch (error)
        {
            this.setState({ isFound: false })
            console.log(error)
        }

    }

    foundZips = () =>
    {
        let isFound = this.state.isFound;
        let zipsArray = this.state.zips;

        this.foundCities();
        
        if (isFound)
        {

            return (
                <ListGroup>
                    { zipsArray.map(zip => <ListGroup.Item>{zip}</ListGroup.Item>) }
                </ListGroup>
                
            )
                

        }
        else
        {
            return <h4>No Results Found</h4>
        }
    }

    foundCities = async () =>
    {

        let zipValues = this.state.zips;
        let citiesValues = [];

        for (let value of zipValues)
        {
            try
            {
                const response = await axios.get(`http://ctp-zip-api.herokuapp.com/zip/${value}`)
                console.log(response.data)
                citiesValues.push(response.data);
                
            }
            catch(error)
            {
                console.log(error);
            }

        }

        
        // console.log(citiesValues);
        
    }

    render()
    {
        return (

            <Container>
                <div className="text-center top">
                    <h2>City Search App</h2>
                </div>

                <form action="" className="text-center" onSubmit={this.results}>
                    <label htmlFor="">City:</label>
                    <input type="text" id="city" className="mr-2 ml-2" />
                    <button>Search</button>
                </form>


                <this.foundZips />
                {/* <this.foundCities /> */}
                

            </Container>

        )
    }




    
}

export default App;
