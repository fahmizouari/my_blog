import React from "react";
import Post from "../../Organisms/OrganismCardPost/OrganismPost";
import CustomModel from "../../Templates/model/Model";
import CustomToast from "../../Atome/Toast/toast";
import { HEADERS_API, HEADERS_API_DOWNLOAD, POST_SERVICE_URL } from "../../config";
import { FaPlus, FaParagraph, FaQuoteRight, FaDownload, FaFileExcel } from "react-icons/fa";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import load from "../../assets/images/loading.gif";
import OrganismNavBar from "../../Organisms/OrganismsNavbar/OrganismNavbar";
var page = 0;
const per = 5;
var isLastPage = false;
class ListPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isFetching: true,
      show: false,
      toastTitle: "",
      toastBody: "",
      modalShow: false,
      isAddForm: true,
      form: { id: "", title: "", body: "" },
      formError: { isValidate: false, titleError: "", bodyError: "" },
    };
  }

  myRef = React.createRef();
  handleScroll = (e) => {
    this.loadData();
  };
  componentDidMount() {
    page = 0;
    isLastPage = false;
    this.getListPosts();
    window.addEventListener("scroll", this.handleScroll, true);
  }

  async deletePost(id) {
    var response = await fetch(POST_SERVICE_URL + "/" + id, {
      method: "delete",
      headers: HEADERS_API,
    });
    if (response.status === 200 || response.status === 201) {
      let data = await response.json();
      this.setState({
        show: true,
        toastTitle: "Succès",
        toastBody: "Suppression réussie",
        posts: this.state.posts.filter((post) => post._id !== data._id),
      });
    } else {
      this.setState({
        show: true,
        toastTitle: "Erreur",
        toastBody: "Une erreur est survenue",
      });
    }
    return response;
  }

  async getListPosts() {
    this.setState({ ...this.state, isFetching: true });
    fetch(POST_SERVICE_URL + "/" + page + "/" + per, {
      method: "get",
      headers: HEADERS_API,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.length < per) {
          isLastPage = true;
        }
        this.setState({
          posts: [
            ...this.state.posts,
            ...result,
          ] /* this.state.posts.concat(result) */,
          isFetching: false,
        });
      })
      .catch((e) => {
        this.setState({ ...this.state, isFetching: false });
      });
  }

  closeToast() {
    this.setState({
      show: false,
    });
  }
  setModalShow(val) {
    this.setState({
      modalShow: val,
    });
  }
  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({
      form: { ...this.state.form, [fieldName]: fleldVal },
    });
  }
  getform() {
    return (
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FaQuoteRight />
          </InputGroup.Text>
          <FormControl
            type="text"
            placeholder="Title"
            name="title"
            defaultValue={this.state.form.title}
            onChange={this.handleChange.bind(this)}
            isInvalid={this.state.formError.titleError !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {this.state.formError.titleError}
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FaParagraph />
          </InputGroup.Text>
          <FormControl
            type="text"
            as="textarea"
            placeholder="Body"
            name="body"
            defaultValue={this.state.form.body}
            onChange={this.handleChange.bind(this)}
            isInvalid={this.state.formError.bodyError !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {this.state.formError.bodyError}
          </Form.Control.Feedback>
        </InputGroup>
        <div className="float-end">
          <Button
            onClick={() => this.setModalShow(false)}
            variant="outline-danger"
          >
            Close
          </Button>
          <Button
            onClick={() =>
              this.state.isAddForm ? this.addPost() : this.updatePost()
            }
            className="ms-3"
            variant="dark"
          >
            {this.state.isAddForm ? "Add" : "update"}
          </Button>
        </div>
      </Form>
    );
  }
  async verifyData() {
    if (this.state.form.title === "") {
      await this.setState({
        formError: {
          ...this.state.formError,
          titleError: "title field is required",
          isValidate: false,
        },
      });
    } else {
      await this.setState({
        formError: {
          ...this.state.formError,
          titleError: "",
          isValidate: true,
        },
      });
    }

    if (this.state.form.body === "") {
      await this.setState({
        formError: {
          ...this.state.formError,
          bodyError: "body field is required",
          isValidate: false,
        },
      });
    } else {
      await this.setState({
        formError: {
          ...this.state.formError,
          bodyError: "",
          isValidate: this.state.formError.isValidate,
        },
      });
    }
  }

  clearFormPost() {
    this.setState({
      form: { ...this.state.form, title: "", body: "" },
    });
    this.setModalShow(false);
  }
  clearPage() {
    this.setState({
      posts: [],
    });
    page = 0;
    isLastPage = false;
  }

  async addPost() {
    await this.verifyData();
    if (this.state.formError.isValidate) {
      var response = await fetch(POST_SERVICE_URL, {
        method: "post",
        headers: HEADERS_API,
        body: JSON.stringify(this.state.form),
      });
      if (response.status === 200 || response.status === 201) {
        this.clearFormPost();
        this.clearPage();
        this.getListPosts();
        this.setState({
          show: true,
          toastTitle: "Succès",
          toastBody: "Ajout réussie",
        });
      } else {
        this.setState({
          show: true,
          toastTitle: "Erreur",
          toastBody: "Une erreur est survenue",
        });
      }
      return response;
    }
  }

  async updatePost() {
    await this.verifyData();
    if (this.state.formError.isValidate) {
      var response = await fetch(POST_SERVICE_URL + "/" + this.state.form.id, {
        method: "put",
        headers: HEADERS_API,
        body: JSON.stringify(this.state.form),
      });
      if (response.status === 200 || response.status === 201) {
        let data = await response.json();
        this.clearFormPost();
        let items = [...this.state.posts];
        let index = items.findIndex((i) => i._id === data._id);
        items[index] = data;
        this.setState({
          show: true,
          toastTitle: "Succès",
          toastBody: "modification réussie",
          posts: items,
        });
      } else {
        this.setState({
          show: true,
          toastTitle: "Erreur",
          toastBody: "Une erreur est survenue",
        });
      }
      return response;
    }
  }

  showUpdatePost(id, title, body) {
    this.setState({
      isAddForm: false,
      form: { ...this.state.form, id: id, title: title, body: body },
      formError: { isValidate: false, titleError: "", bodyError: "" },
    });
    this.setModalShow(true);
  }

  showAddPost() {

    this.setState({
      isAddForm: true,
      form: { ...this.state.form, id: null, title: "", body: "" },
      formError: { isValidate: false, titleError: "", bodyError: "" },
    });
    this.setModalShow(true);
  }
  async downloadPosts(){
    var fileName="";
    await fetch(POST_SERVICE_URL + "/download" , {
      method: "get",
      headers: HEADERS_API_DOWNLOAD,
    }).then((response) =>  {fileName=response.headers.get("Content-Disposition").split("fileName=")[1];console.log(fileName);response.blob();})
    .then((blob) => {
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${fileName}`,
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }

  loadData() {
    if (this.myRef.current) {
      var isBottom =
        Math.abs(this.myRef.current.getBoundingClientRect().top) + 800 >=
        this.myRef.current.getBoundingClientRect().height;
      if (isBottom && !this.state.isFetching && !isLastPage) {
        page = page + 1;
        this.getListPosts();
      }
    }
  }

  render() {
    return (
      <div>
        <OrganismNavBar></OrganismNavBar>
        <Container fluid>
          <Row>
            <Col xs="9">
              <h1>List of posts</h1>
            </Col>
            <Col  xs="3" className="d-flex justify-content-end">
              <div className="justify-content-center align-items-center" style={{background:"red", borderRadius:30, height: 50}}>
              <FaPlus className="icon-btn m-3" onClick={() => this.showAddPost()}/>
              <FaDownload className="icon-btn m-3" onClick={() => this.downloadPosts()}/>
              <FaFileExcel className="icon-btn m-3" onClick={() => this.showAddPost()}/>
              
                </div>
             
            </Col>
          </Row>
        </Container>

        <CustomModel
          modalShow={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          title={this.state.isAddForm ? "Add post" : "Update post"}
          body={this.getform()}
        ></CustomModel>
        <CustomToast
          closeToast={() => this.closeToast()}
          show={this.state.show}
          title={this.state.toastTitle}
          body={this.state.toastBody}
        ></CustomToast>
        <div ref={this.myRef} onScroll={this.handleScroll}>
          {this.state.posts.map((post, index) => {
            return (
              <Post
                key={index}
                title={index + 1 + "- " + post.title}
                body={post.body}
                deleteFN={() => this.deletePost(post._id)}
                updateFN={() =>
                  this.showUpdatePost(post._id, post.title, post.body)
                }
              ></Post>
            );
          })}
        </div>

        {this.state.isFetching && (
          <center className="mt-5">
            <img src={load} alt="" width="50" height="50" />
          </center>
        )}
      </div>
    );
  }
}
export default ListPosts;
