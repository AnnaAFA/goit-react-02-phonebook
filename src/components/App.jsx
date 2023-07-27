import { Component } from "react";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import BookForm from "./BookForm/BookForm";
// import booksData from "./BookForm/books.json";
// import BookList from "./BookList/BookList";
import Modal from "./Modal/Modal";
import { fetchPostDetails, fetchPosts } from "services/api";


// const books = booksData.books;

const toastConfig = {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
}

export class App extends Component {
  state = {
    modal: { isOpen: false, visibleData: null },
    posts: [],
    isLoading: false,
    error: null,
    selectedPostId: null,
  };



  onOpenModal = (data) => {
    this.setState({
      modal: {
        isOpen: true,
        visibleData: data,
      }
    })
  }

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        visibleData: null,
      }
    })
  }

  onSelectPostId = (postId) => {
  this.setState({selectedPostId: postId})
}

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const posts = await fetchPosts();
      console.log(posts);
      this.setState({ posts: posts });
      toast.success("Success", toastConfig);
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(error.message, toastConfig);
    } finally {
      this.setState({ isLoading: false });
    }
}

  async componentDidUpdate(prevProps, prevState) {
    // console.log('Update');
    if (prevState.modal.isOpen !== this.state.modal.isOpen) {
      console.log('Update modal');
    }
    // console.log(this.state.modal);
    // console.log(prevState.modal);
    if (prevState.selectedPostId !== this.state.selectedPostId) {
      console.log("Selected post id:" + this.state.selectedPostId);
      try {
        this.setState({ isLoading: true });
        const postDetails = await fetchPostDetails(this.state.selectedPostId);
        // console.log(postDetails);
        this.setState({ modal: { isOpen: true, visibleData: postDetails } })
        toast.success("Success", toastConfig);
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(error.message, toastConfig);
      } finally {
        this.setState({ isLoading: false });
      }
    }
}

  render() {
    return (
      <div>
        <h1>React</h1>
        {this.state.modal.isOpen === true && <Modal
          visibleData={this.state.modal.visibleData}
          onCloseModal={this.onCloseModal} />}
        {this.state.error !== null && (
          <p className="c-error">Error: {this.state.error}</p>
        )}
        
        {this.state.isLoading && <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />}

        {this.state.posts.length > 0 && this.state.posts.map(post => {
          return (
            <button
              className="post"
              onClick={() => this.onSelectPostId(post.id)}
              type="button"
              key={post.id}>
              <strong>Id: {post.id}</strong>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
         </button>
       )
     })}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"/>
      </div>
    );
}

};
