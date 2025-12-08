import { useState } from "react";
import restaurants from "../data/restaurants.json";
import "./SearchBar.css"

export default function SearchBar({onQueryClick}) {
    const [query, setQuery] = useState("");

    const filtered = restaurants.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search restaurants..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {query !== "" && !filtered.some(r => r.name.toLowerCase() === query.toLowerCase()) && (
                <div className="search-results">
                    {filtered.length > 0 ? (
                        filtered.map((r) => (
                            <div onClick={() => {onQueryClick(r); setQuery(r.name); }} key={r.id} className="search-result-item">
                                <img alt={r.name + " logo"} className="search-result-logo" src={r.icon}/>
                                {r.name}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">No results</div>
                    )}
                </div>
            )}
        </div>
    );
}
