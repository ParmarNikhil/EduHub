import './App.css';
import { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

class FetchData extends Component {
    state = {
        files: [],
        logged_in: true,
      }
      
  componentDidMount() {
      setTimeout( () => {
        if (localStorage.getItem("token") !== "") {
          fetch("http://127.0.0.1:8000/api/fetch", {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`
            }
            })
            .then(response => response.json())
              .then(data => this.setState({ files: data, logged_in:true }))
        }
        else {
          console.log("Helllowoowowo")
          this.setState({logged_in: false})
        }
    },800)
  }

  openFile(id, filename) {
    fetch(`http://127.0.0.1:8000/api/open/${id}/`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    }).then(
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
    event.preventDefault()
    let data = event.target;
    const formdata = new FormData(data);
    fetch("http://127.0.0.1:8000/api/upload", {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
      .catch(function (error) {
        console.log(error);
      })
      .then(alert("your file has been uploaded"))
  }

  render() {
    return <>
      {!this.state.logged_in ?
        <Redirect to="/" /> :
        <div style={{ textAlign: 'center', margin: 50 }}>

          <form encType="multi-part/formdata" onSubmit={this.handleSubmit}>
            <input type="text" name="title" id="title" />
            <input type="file" accept=".pdf, .pptx, .txt, .zip" name="file" id="file" />
            <input type="submit" className="submit" value="submit" />
            <Link to="/">
              <input type="button" className="logout-btn" value="logout" onClick={() => localStorage.removeItem("token")} />
            </Link>
          </form>

          <ul>
            {this.state.files.map((f) => (
              <li key={f.id}>
                <a href={f.file} rel="noreferrer">
                  {f.file.replace("/media/", "")}
                </a>
                <button onClick={() => this.openFile(f.id, f.file.replace("/media/", ""))}>Download file</button>
              </li>
            ))}
          </ul>
        </div>

      }
    </>
  }

}

export default FetchData;
