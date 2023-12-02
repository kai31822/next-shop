'use client';
import React from 'react';
import Test from './test';
const Header = (props: any) => {
    return (
        <header>
            <h1>Header</h1>
            <p>{props.name}</p>
            <Test {...props}></Test>
            {props.children}
        </header>
    );
};

export default Header;
