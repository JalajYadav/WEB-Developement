import React, { cloneElement } from 'react';

const date = new Date();
var year = date.getFullYear();
function Footer(){
    return(
        <footer>
            <p>copyright © {year}</p>
        </footer>
    );
}
export default Footer;