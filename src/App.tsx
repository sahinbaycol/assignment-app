import { CSSProperties, useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { Checkbox, Skeleton, Tag } from "antd";
import dropdownIcon from "./assets/arrow-down-sign-to-navigate (1).png";
import SearchBar from "./components/searchbar";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import deleteIcon from "./assets/delete.png";

function App() {
  const [data, setData] = useState<any | null>();
  const [value, setValue] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const deleteTagRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const styles = {
    containerStyle: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    } as CSSProperties,
    listItemStyle: {
      display: "flex",
      flexDirection: "row",
      padding: "20px",
      borderBottom: "1px solid gray",
      width: "100%",
    } as CSSProperties,
    charactersImageStyle: {
      width: "80px",
      height: "80px",
      borderRadius: "8px",
    } as CSSProperties,
    listContainerStyle: {
      display: "flex",
      flexDirection: "column",
      width: "60%",
      alignItems: "start",
      height: "70vh",
      overflowY: "auto",
      border: "1px solid gray",
      borderRadius: "8px",
      marginTop: "20px",
    } as CSSProperties,
    nameEpisodeContainerStyle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      marginLeft: "50px",
    } as CSSProperties,
    charactersImageContainerStyle: {
      marginLeft: "50px",
    } as CSSProperties,
    searchbarStyle: {
      width: "500px",
      padding: "20px",
      borderRadius: "16px",
      border: "none",
      fontSize: "24px",
    } as CSSProperties,
    dropdownIcon: {
      width: "20px",
      height: "20px",
      cursor: "pointer",
      marginRight: "20px",
    } as CSSProperties,
    deleteIcon: {
      width: "20px",
      height: "20px",
      cursor: "pointer",
    } as CSSProperties,
    tagTextStyle: {
      fontSize: "20px",
      fontWeight: "bold",
      padding: "10px",
    } as CSSProperties,
    textStyle: {
      fontSize: "20px",
    } as CSSProperties,
    avatarStyle:{
      marginLeft:"60px",
      width:"80px",
      height:"80px",
    } as CSSProperties,
    skeletonStyle:{
      display:"flex",
      alignItems:"center",
      padding:"20px"
    } as CSSProperties,
    skeletonsContainerStyle:{
      display:"flex",
      flexDirection:"column"
    } as CSSProperties
  };

  const fetchData = async () => {
    try {
      const response: any = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      setData(response?.data?.results);
    } catch (error) {}
    console.log(data);
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    const filtered = data.filter((result: { name: string }) =>
      result.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredResults(filtered);
    setLoading(false);
  };

  const handleCheckboxChange = (event: CheckboxChangeEvent, name: string) => {
    if (event.target.checked) {
      setSelectedNames((prevNames) => [...prevNames, name]);
    } else {
      setSelectedNames((prevNames) => prevNames.filter((n) => n !== name));
    }
  };

  const handleDeleteTag = (name: string) => {
    setSelectedNames((prevNames) => prevNames.filter((n) => n !== name));
  };

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };
  const handleListItemKeyDown = (event: any, index: number) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSelectedIndex(index);
      handleCheckboxChange(
        {
          target: {
            checked: !selectedNames.includes(filteredResults[index].name),
          },
        } as CheckboxChangeEvent,
        filteredResults[index].name
      );
    }
  };

  return (
    <div style={styles.containerStyle}>
      <div className="input-container">
        <div className="tags-container">
          {selectedNames.map((name, index) => (
            <Tag
              style={styles.tagTextStyle}
              key={index}
              closable
              ref={index === selectedNames.length - 1 ? deleteTagRef : null}
              onClose={() => handleDeleteTag(name)}
              closeIcon={
                <img
                  tabIndex={0}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handleDeleteTag(name);
                    }
                  }}
                  style={styles.deleteIcon}
                  src={deleteIcon}
                />
              }
            >
              {name}
            </Tag>
          ))}
        </div>
        <input
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              setLoading(true);
              setTimeout(() => {
                handleSearch();
              }, 1000);
            }
          }}
          type="text"
          style={styles.searchbarStyle}
          onChange={handleInputChange}
          className="searchbar"
          value={value}
        />
        <img
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              handleSearch();
            }, 1000);
            
          }}
          style={styles.dropdownIcon}
          src={dropdownIcon}
        />
      </div>
      <div style={styles.listContainerStyle}>
        {isLoading ? (
          <div style={styles.skeletonsContainerStyle}>
            <Skeleton style={styles.skeletonStyle} title={false} paragraph={{rows:2,width:[200,200]}} avatar={{shape:"square",style:styles.avatarStyle}} loading={isLoading}></Skeleton>
            <Skeleton style={styles.skeletonStyle} title={false} paragraph={{rows:2,width:[200,200]}} avatar={{shape:"square",style:styles.avatarStyle}} loading={isLoading}></Skeleton>
            <Skeleton style={styles.skeletonStyle} title={false} paragraph={{rows:2,width:[200,200]}} avatar={{shape:"square",style:styles.avatarStyle}} loading={isLoading}></Skeleton>
            <Skeleton style={styles.skeletonStyle} title={false} paragraph={{rows:2,width:[200,200]}} avatar={{shape:"square",style:styles.avatarStyle}} loading={isLoading}></Skeleton>
          </div>
        ) : filteredResults.length > 0 ? (
          filteredResults.map((item: any, index) => {
            return (
              <div
                onKeyDown={(e) => handleListItemKeyDown(e, index)}
                key={item.id}
                style={styles.listItemStyle}
              >
                <Checkbox
                  checked={selectedNames.includes(item.name)}
                  onChange={(e) => handleCheckboxChange(e, item.name)}
                />
                <div style={styles.charactersImageContainerStyle}>
                  <img style={styles.charactersImageStyle} src={item.image} />
                </div>
                <div style={styles.nameEpisodeContainerStyle}>
                  <div style={styles.textStyle}>
                    {getHighlightedText(item.name, value)}
                  </div>
                  <div>{item.episode.length + " Episodes"}</div>
                </div>
              </div>
            );
          })
        ) : null}
      </div>
    </div>
  );
}

export default App;
