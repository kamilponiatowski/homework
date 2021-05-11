import React from 'react'
import { useForm } from "react-hook-form";

interface Props {

}

export const RegisterView = (props: Props) => {

    return (
        <div>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input id="password" type="text" className="form-control" />
            </div>

            <div className="form-group">
                <button className="btn btn-danger">Cancel</button>
                <button className="btn btn-sucess">Register</button>
            </div>
        </div>
    )
}
