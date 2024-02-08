import { useSearchParams } from "react-router-dom";

export default function SortBySelector() {
    
    const [ searchParams, setSearchParams ] = useSearchParams();
    const currentSortBy = searchParams.get('sort_by') || 'created_at';
    const currentOrder = searchParams.get('order') || 'desc';
    const validSortBys = [ 
        { name: 'created_at', display: 'Date' }, 
        { name: 'comment_count', display: 'Comment Count' }, 
        { name: 'votes', display: 'Votes' } 
    ]

    const onSortByChange = (event) => {
        event.preventDefault();
        setSearchParams((params) => {
            params.set("sort_by", event.target.value);
            return params;
        })
    }

    const onOrderChange = (event) => {
        event.preventDefault();
        setSearchParams((params) => {
            params.set("order", event.target.value);
            return params;
        })
    }

    return (
        <div id='sort-by-selector'>
            <label htmlFor='sortbys'>Sort By:</label>
            <select name='sortbys' id='sortbys' value={currentSortBy} onChange={onSortByChange}>
                {validSortBys.map((sortBy)=> {
                    return <option key={sortBy.name} value={sortBy.name}>{sortBy.display}</option>
                })}
            </select> 
            <select name='order' id='order' value={currentOrder} onChange={onOrderChange}>
                <option key={'asc'} value={'asc'}>Ascending</option>
                <option key={'desc'} value={'desc'}>Descending</option>
            </select> 
        </div>
    )
}