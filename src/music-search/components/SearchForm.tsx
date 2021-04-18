import React, { useState } from 'react'

interface Props {
    onSearch: (query: string) => any
}

export const SearchForm = ({ onSearch }: Props) => {
    const [query, setQuery] = useState('')

    const search = () => {
        console.log(query)
    }
    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={event => setQuery(event.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={search}>Search</button>
            </div>
        </div>
    )
}
