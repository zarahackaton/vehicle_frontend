import React, {Component} from 'react';
import InsertCar from './InsertCar';
import ViewCar from './ViewCar';
import axios from 'axios';
import Slide from 'react-reveal/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {HashLoader} from 'react-spinners';
import Add from '@material-ui/icons/Add';

/*
 * This component is in charge of the inventory view functionality.
 */
class Inventory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allCars: [],
            carPressed: false,
            isDoneFetching: false
        };
    }

    /*
     * Handle the pressed car data.
     */
    showCarDetails = async (car) => {
        this.setState({carPressed: true, car: car});
    };

    /*
     * Handle the car details modal visibility.
     */
    hideCarDetailsModal = () => {
        this.setState({carPressed: false});
    };

    /*
     * Render relevant car from the car list.
     */
    showCar = (car, index) => {
        const carImg = require(`../img/${car.type.toLowerCase()}.png`);
        return (
            <Slide left key={index}>
                <Button disableRipple className="carButton" onClick={() => this.showCarDetails(car)}>
                    <div>
                        <img src={carImg} className="carImage"/>
                        <div>
                            <strong className="capitalizeText">{car.name}</strong>
                        </div>
                    </div>
                </Button>
            </Slide>
        );
    };

    /*
     * Handle the insert car modal visibility.
     */
    showInsertCarModal = () => {
        this.setState({addPressed: true});
    };

    /*
     * Handle the insert car modal visibility.
     */
    hideInsertCarModal = () => {
        this.setState({addPressed: false});
    };

    /*
     * Handle the boolean which determines if any request is done.
     */
    fetchData = () => {
        this.setState({isDoneFetching: true});
    };

    /*
     * Get all cars in case of any request is done.
     */
    async componentDidUpdate(prevProps, prevState) {
        if (this.state.isDoneFetching !== prevState.isDoneFetching)
        {
            const cars = await axios.get('http://localhost/get_cars');
            this.setState({allCars: cars.data, isDoneFetching: false});
        }
    }

    /*
     * Retrieve the cars data after the component first render (initialize).
     */
    async componentDidMount() {
        const cars = await axios.get('http://localhost/get_cars');
        this.setState({allCars: cars.data});
    }

    render() {
        return (
            <div id="page-wrap">
                <h1 className="mt-5">Inventory</h1>
                <IconButton className="addButton" onClick={this.showInsertCarModal}>
                    <Add/>
                </IconButton>
                {this.state.addPressed &&
                <InsertCar visible={this.hideInsertCarModal} fetchData={this.fetchData}/>
                }
                {this.state.carPressed &&
                <ViewCar visible={this.hideCarDetailsModal} car={this.state.car} fetchData={this.fetchData}/>
                }
                {this.state.allCars.length > 0 ?
                    <div className="form-inline justify-content-center">
                        <div className="row justify-content-center w-50">
                            {this.state.allCars.map(this.showCar)}
                        </div>
                    </div>
                    :
                    <div className="mt-4 d-inline-block">
                        <HashLoader/>
                    </div>
                }
            </div>
        );
    }
}

export default Inventory;