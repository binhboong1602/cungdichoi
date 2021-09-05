import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function Result() {
    const history = useHistory();

    function handleClick(e) {
        e.preventDefault();
        history.push('/');
    }



    return (
        <div>
            <h1>Share this link to invite your friends</h1>
            <p>https://www.udemy.com/</p>
            <Button onClick={handleClick}>Create new session</Button>
        </div>
    )
}
