import React from 'react'

const ListGroup = () => {
    const items = ['Karachi', 'Sukkur', 'Hyderabad', 'Mithi', ' Tharparkar'];
    return (
        <>
            <h1>Cities</h1>
            <ul>

                {items.map((item, index) => (<li key={`${item}-${index}`}>{item}</li>))}
            </ul>
        </>
    );
}


export default ListGroup