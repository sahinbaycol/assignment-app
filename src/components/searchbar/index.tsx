import React, { CSSProperties } from 'react'

type SearchBarProps={
    value:string;
    onchange:()=> void;
}

const SearchBar = ({value,onchange}:SearchBarProps) => {

    const styles={
        searchbarStyle:{
            width:"500px",
            padding:"20px",
            borderRadius:"16px",
            border:"1px solid gray",
            fontSize:"24px"
        } as CSSProperties
    }

  return (
    <div>
        <input type='text' style={styles.searchbarStyle} onChange={onchange} className='searchbar' value={value} />
    </div>
  )
}

export default SearchBar