import React, {Component} from 'react';
import InsertCar from './InsertCar';
import ViewCar from './ViewCar';
import axios from 'axios';
import Slide from 'react-reveal/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {HashLoader} from 'react-spinners';
import Add from '@material-ui/icons/Add';

class Inventory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allCars: [],
            carPressed: false,
            isDoneFetching: false
        };
    }

    showCarDetails = async (car) => {
        this.setState({carPressed: true, car: car});
    };

    hideCarDetailsModal = () => {
        this.setState({carPressed: false});
    };

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

    showInsertCarModal = () => {
        this.setState({addPressed: true});
    };

    hideInsertCarModal = () => {
        this.setState({addPressed: false});
    };

    fetchData = () => {
        this.setState({isDoneFetching: true});
    };

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.isDoneFetching !== prevState.isDoneFetching)
        {
            const cars = await axios.get('http://localhost/get_cars');
            this.setState({allCars: cars.data, isDoneFetching: false});
        }
    }

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