import React ,{useState,useEffect}from 'react';
import './bootstrap.min.css'
import './App.css';
import Card from './components/Card';
function App() {
   const [links,setLinks]=useState([]);
   const [url,setUrl] = useState('https://api.github.com/search/users?q=location:bangalore');
   const [results,setResults]=useState([]);
   const [searchText,setSearchText]=useState('');
   const [noResults,setNoResults] = useState();

  useEffect(()=>{
     fetch(url)
          .then(response=>{
            let LinkPresent = response.headers.get("link");
            if(LinkPresent===null){
              setLinks([]);
              return response.json();
            }
            else{
              let Links= response.headers.get("link").split(",");
              let LinkArray = buildNavigationLinks(Links);
              if(LinkArray.length===4){
                formatLinks(LinkArray);
              }
              setLinks(LinkArray);
              return response.json()
            }
          })
          .then(resData=>{
            if(resData.items.length===0){
                 setNoResults(true);

            }
            else{
              setNoResults(false);
              setResults(resData.items);
            } 
          })
          
  },[url])

  const buildNavigationLinks=(Links)=>{
    let NavLinks=Links.map(Link=>{
      return ({
        url:Link.split(";")[0].replace(">","").replace("<",""),
        title:Link.split(";")[1]
      });
    })
    return NavLinks;
  }

  const formatLinks = (LinkArray)=>{
    let temp = LinkArray[3];
    for(let i=3;i>=0;i--){
      LinkArray[i]=LinkArray[i-1];
    }
    LinkArray[0]=temp;
  }
  
const searchUser =()=>{
  if(searchText==='') return
  else{
    setUrl(`https://api.github.com/search/users?q=${searchText}+location:bangalore`); 
  }
  
}
  
  return (
    <div className="App">
         
          <nav className="navbar navbar-light bg-primary">
            <a className="navbar-brand" href="/">
              <img src="https://github.githubassets.com/images/modules/open_graph/github-octocat.png" width="50" height="50" alt="" 
              loading="lazy"/>
              <h5 style={{display:'inline',marginLeft:'10px'}}>GitHub Search</h5>
            </a>
          </nav>
          
          <div className="container  mt-4 mb-4">
                <input type="search" 
                   value={searchText} style={{width:'60%'}}
                   onChange={(e)=>setSearchText(e.target.value)}
                   className="searchBar"
                  placeholder="search By Name"/>
                 <button type="button" 
                 className="btn btn-primary btn-lg mx-3 d-inline"
                 onClick={searchUser}>
                   Search
                </button>
            </div>
            { noResults?<h1 className='text-info'>No Results Found!</h1>:
            <div className="d-flex flex-wrap justify-content-center">
              {
                       results.map(result=>{
                        return (
                           <Card key={result.node_id} img={result.avatar_url} 
                           name={result.login} githubUrl={result.html_url}/>
                        );
                    })
              }
            </div>  
          }
        {
          links.map((link,i)=>{
          return (<button key={i} type="button" className="btn btn-primary m-2" onClick={()=>setUrl(link.url)}>{link.title.replace('rel=',"").replace('"',"").replace('"',"")}</button>);
          })
        }
        
    </div>
  );
}

export default App;
