import React from 'react'

const ListGroup = () => {
    let items = ['Karachi', 'Sukkur', 'Hyderabad', 'Mithi', ' Tharparkar'];
    items = [];

    // if (items.length === 0) {
    //     return <> <h1>Cities</h1>
    //         <p>No items found</p>
    //     </>
    // }


    // const message = items.length === 0 ? <p>No items found</p> : null

    const getMessage = (value: number) => {
        return (value === 0 ? <p>No items found</p> : <ul>
            {items.map((item, index) => (<li key={`${item}-${index}`}>{item}</li>))}
        </ul>)
    }

    return (

        <>
            <h1>Cities</h1>
            {getMessage(items.length)}
            <ul>
                {items.map((item, index) => (<li key={`${item}-${index}`}>{item}</li>))}
            </ul>
        </>



        // <>
        // <h1>Cities</h1>
        // {items.length === 0 && <p>No items found</p>}
        // <ul>
        //     {items.map((item, index) => (<li key={`${item}-${index}`}>{item}</li>))}
        // </ul>
        // </>


        // <>
        //     <h1>Cities</h1>
        //     {items.length === 0
        //         ? <p>No items found</p>
        //         : <ul>
        //             {items.map((item, index) => (<li key={`${item}-${index}`}>{item}</li>))}
        //         </ul>
        //     }
        // </>

        // <>
        //     <h1>Cities</h1>
        //     {items.length === 0
        //         ? () => {
        //             // declartion and calculation
        //             return (<p>No items found</p>)
        //         }
        //         : () => {
        //             // declartion and calculation
        //             return (<ul>
        //                 {items.map((item, index) => (<li key={`${item}-${index}`}>{item}</li>))}
        //             </ul>)
        //         }
        //     }
        // </>



    );
}


export default ListGroup