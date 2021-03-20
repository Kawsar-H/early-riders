import React, { useState } from 'react';
import Book from '../Book/Book';
import './Head.css'
import fakeData from '../../fakeData';
import Home from '../Home/Home';

const Head = () => {
    const destinationList = fakeData;
    const [places, setplaces] = useState(destinationList);

    return (
        <div>
            <Home></Home>            
            {
                places.map(place => <Book key={place.id} place={place}></Book>)
            }
        </div>
    );
};

export default Head;