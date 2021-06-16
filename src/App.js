import './App.css';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
            isFound: true,
            citiesFound: false
        }
    }

    results = async (event) =>
    {
        event.preventDefault();

        try
        {

            
            const city = document.getElementById("city").value.toUpperCase();

            const res = await axios.get(`http://ctp-zip-api.herokuapp.com/city/${city}`)
            let citiesValues = [];

            this.setState({ isFound: true })
            this.setState({ zips: [...res.data] })

            try
            {
                for (let value of this.state.zips)
                {
                    const response = await axios.get(`http://ctp-zip-api.herokuapp.com/zip/${value}`)

                    citiesValues.push(response);
                }

                this.setState({ cities: citiesValues, citiesFound: true})
            }
            catch(error)
            {
                console.log(error)
            }

        }
        catch (error)
        {
            this.setState({ isFound: false })
            console.log(error)
        }

    }

    foundZips = () =>
    {
        let isFound = this.state.isFound && this.state.citiesFound;
        let zipsArray = this.state.zips;

        
        
        
        if (isFound)
        {

            return (

                <Row className="justify-content-center">
                    <Col xs={3}>
                        <ListGroup>
                            { zipsArray.map(zip => <ListGroup.Item>{zip}</ListGroup.Item>) }
                        </ListGroup>
                    </Col>
                </Row>
                
            )
                

        }
        else
        {
            return <h4 className="text-center">No Results Found</h4>
        }
    }

    

    foundCities()
    {
        
        let cityFound = this.state.citiesFound;

        if (cityFound)
        {
            console.log(this.state.cities);
        }

        return <h1>hello</h1>
        
        
        
        // if (isFound)
        // {
        //     for (let value of zipsArray)
        //     {
        //         try
        //         {
        //             const res = await axios.get(`http://ctp-zip-api.herokuapp.com/zip/${value}`)
        //             console.log(res); 
                    
        //         }
        //         catch(error)
        //         {
        //             console.log(error);
                    
        //         }

        //     }
        // }

        
        
    }

    render()
    {

        return (

            <Container>
                <div className="text-center top">
                    <h2>City Search App</h2>
                </div>

                <form action="" className="text-center mb-5" onSubmit={this.results}>
                    <label htmlFor="">City:</label>
                    <input type="text" id="city" className="mr-2 ml-2" />
                    <button>Search</button>
                </form>


                <this.foundZips />
                {/* <this.citiesFound /> */}
                
            </Container>
        )
    }




    
}

export default App;
