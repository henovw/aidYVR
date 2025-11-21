import "./SearchBar.css"

function SearchBar({ selectCategory, onSelectCategory, categories, selectItem }) {
    
    function onClickedCategory(item) {
        onSelectCategory(item)
        selectItem(null)
    }


    return (
        <div className="searchbar-main">
            <div className="searchbar-categories">
            {categories.map((item) => (
                <span className={`searchbar-category ${selectCategory === item ? "selected-searchbar" : ""}`}
                    onClick={() => onClickedCategory(item)}>{item}</span>
            ))}
            </div>
        </div>
    )
}

export default SearchBar