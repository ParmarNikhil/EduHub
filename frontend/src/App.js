import './App.css';
import { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import reactDom from 'react-dom';
class App extends Component {
  state = {
    files: [],
    url:"C:/Users/HP/Documents/django+react/backend2"
  }
  componentDidMount(){
    fetch("http://127.0.0.1:8000/api/fetch")
      .then(response => response.json())
        .then(data => this.setState({files:data},()=>{
          console.log(this.state.files)
        }))     
            
  }

  openFile(id, filename) {
    console.log(id,filename)
    fetch(`http://127.0.0.1:8000/api/open/${id}/`).then(
      response => {
        response.blob().then(blob => {
        console.log(response)
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        console.log(url);
        a.href = url;
        a.download = filename;
        a.click();
      });
    });
  }

  handleSubmit = (event) => {
        let data = event.target;
        console.log("form dataa",data)
        const formdata = new FormData(data);
        fetch("http://127.0.0.1:8000/api/upload", {
          method:"POST",
          body:formdata,
        })
        .catch(function(error){
          console.log(error);
        })
  }

  render(){
    return (
      <div style={{textAlign:'center', margin:50}}>
          <form encType="multi-part/formdata" onSubmit={this.handleSubmit}>
              <input type="text" name="title"  id="title"/>
              <input type="file" accept=".pdf, .pptx, .txt, .zip" name="file" id="file"/>
              <input type="submit" className="submit" value="submit"/>
          </form>
          <ul>
                {this.state.files.map((f)=>(
                    <li key={f.id}>
                      <a href={f.file} rel="noreferrer">
                          {f.file.replace("/media/","")}
                      </a>
                      <button onClick={()=>this.openFile(f.id,f.file.replace("/media/",""))}>Download file</button>
                    </li>                    
                ))}
          </ul>
      </div>
    );
  }
  
}

export default App;
