import React, { useEffect, useState } from 'react'
import { MyInput } from '../../core/components/MyInput'

interface Props {

}


export interface DefaultTheme {
    primary: {
        color: string;
        background: string
        border?: string
    }
    company: {
        color: string
        background: string
        border: string
    }
}

const theme: DefaultTheme = {
    primary: {
        color: 'grey',
        background: '#eee',
        border: '#BADA55',
    },
    company: {
        color: 'rebeccapurple',
        background: '#ecc05f',
        border: 'rebeccapurple',
    }
}

export const LogIn = (props: Props) => {

    return (
        <form className="col-6 mx-auto mt-4">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <MyInput theme={theme} primary={true} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <MyInput theme={theme} primary={true} required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-check d-flex align-items-center mb-2">
                <input type="checkbox" required className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">you must accept cakes to log in</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
