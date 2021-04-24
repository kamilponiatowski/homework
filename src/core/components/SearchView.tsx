import React from 'react'
import { SearchForm } from '../../core/components/SearchForm'
import { useFetch } from '../../core/hooks/useSearchAlbums'
import { Album } from '../../model/Search'

interface Props {
    fetchMethod: (query: string) => any
    card: () => Album
}

export const SearchView = ({ fetchMethod, card }: Props) => {
    const [{ isLoading, message, results }, setQuery] = useFetch(fetchMethod)

    return (
        <div>
            <div className="row">
                <div className="col">
                    <SearchForm onSearch={setQuery} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoading && <p className="alert alert-info">Loading</p>}
                    {message && <p className="alert alert-danger">{message}</p>}

                    {results && card}
                </div>
            </div>
        </div>
    )
}
