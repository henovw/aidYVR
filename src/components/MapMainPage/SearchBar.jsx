import "./SearchBar.css"

function SearchBar({ selectCategory, onSelectCategory, categories, selectItem, orderTypes, selectedOrder, onSelectOrder}) {
    
    function onClickedCategory(item) {
        onSelectCategory(item)
        selectItem(null)
    }

    function onSelectedOrder(item) {
        onSelectOrder(item)
        selectItem(null)
    }


    return (
        <div>
            <div className="searchbar-main">
            <div className="searchbar-categories">
            <span className="searchbar-category-title">Sort by category:</span>
            {categories.map((item) => (
                <span key={item} className={`searchbar-category ${selectCategory === item ? "selected-searchbar" : ""}`}
                    onClick={() => onClickedCategory(item)}>{item}</span>
            ))}
            </div>
        </div>
        <div className="searchbar-main">
            <div className="searchbar-categories">
            <span className="searchbar-category-title">Order by:</span>
            {orderTypes.map((item) => (
                <span key={item} className={`searchbar-category ${selectedOrder === item ? "selected-searchbar" : ""}`}
                    onClick={() => onSelectedOrder(item)}>{item}</span>
            ))}
            </div>
        </div>
        </div>
    )
}

export default SearchBar