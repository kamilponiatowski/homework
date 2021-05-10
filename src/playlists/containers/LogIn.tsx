import React, { useState } from 'react'
import { MyInput } from '../../core/components/MyInput'
import { theme } from '../../core/styles/data'

interface Props {

}

export const LogIn = (props: Props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function validateForm() {
        console.log('validate')
    }

    function submit(e: React.MouseEvent) {
        e.preventDefault();
        validateForm();
        console.log('after validate')
        setEmail('')
        setPassword('')
    }

    return (
        <form className="col-sm-10 col-md-8 col-lg-6 mx-auto mt-4" noValidate>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <MyInput
                    type="email"
                    id="exampleInputEmail1"
                    className="form-control"
                    placeholder="Enter email"
                    aria-describedby="emailHelp"
                    value={email}
                    theme={theme}
                    primary={true}
                    onBlur={(e) => validateForm()}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <MyInput
                    required
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    theme={theme}
                    primary={true}
                    value={password}
                    onBlur={(e) => validateForm()}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-check d-flex align-items-center mb-2">
                <input
                    required
                    type="checkbox"
                    id="exampleCheck1"
                    className="form-check-input"
                    onClick={(e) => validateForm()}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">you must accept cakes to log in</label>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => submit(e)}
            >
                Submit
            </button>
        </form>
    )
}