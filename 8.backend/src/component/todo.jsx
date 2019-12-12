import React, {Component} from 'react';
import config from '../config.json';
import http from '../services/httpService';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Raven from 'raven-js';

// Handling https requests in separate module using axios

const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';

class Todo extends Component {

    state = {
        posts: [],
    };

    async componentDidMount() {
        const promise = http.get(config.apiEndPoint);
        const {data: posts} = await promise;
        this.setState({posts});
    }

    handleUpdate = async (post, e) => {
        post.title = 'Updated';

        const {data} = await http.put(config.apiEndPoint + '/' + post.id, post); // updated the whole object
        // const {data} = await http.patch(config.apiEndPoint + '/' + post.id, {[post.title] : "Updated"}); // only update the property of object

        const posts = [...this.state.posts];
        const index = posts.indexOf(post);
        posts[index] = data;
        this.setState({posts});
        toast.success('Post Updated Successfully');
    };


    handleDelete = async post => {
        // Here we are Using optimistic approach(update the ui first the send call to server) , Premistic approach = opposite of optimistic
        const originalPosts = [...this.state.posts];

        const posts = [...this.state.posts];
        const newPosts = posts.filter(item => post !== item);
        this.setState({posts: newPosts}); // changing the state i.e ui before calling to server

        try {
            const {data, status} = await http.delete('ff'+ config.apiEndPoint + '/' + post.id, post);
            toast.success('Post Deleted Successfully');
            if (status !== 200) throw new Error("Couldn't able to delete the post");
            // console.log(status, data);
        } catch (ex) {

            // Errors : 2 Types
            // 1. Expected Errors (ex : 404:not found, 400: bad request) - CLIENT ERRORS
            //  - Display a specific error message
            //
            // 2. Unexpected Errors (network down, server down, db down, bug)
            //  - Log them
            //  - Display a generic & friendly error message

            // if expected error then axios will give 'exception.request' & 'exception.response'

            if (ex.response && ex.response === 404)
                toast.error('This post has already been deleted...');
                Raven.captureException(ex);

            this.setState({posts: originalPosts}); // reverting back to original state
        }

    };

    handleAdd = async () => {
        const post = {title: 'a', body: 'b'};
        const {data} = await http.post(config.apiEndPoint, post);
        const posts = [data, ...this.state.posts];
        this.setState({posts});
        toast('Course Added Successfully')
    };


    render() {
        return (
            <div>
                <ToastContainer/>
                <button className="btn btn-primary btn-bg" onClick={this.handleAdd}>Add +</button>

                <table className="table mt-4">
                    <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Title</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.posts.map((post, index) => (
                        <tr key={post.id}>
                            <td>{index + 1}</td>
                            <td>{post.title}</td>
                            <td>
                                <button className="btn btn-sm btn-info"
                                        onClick={(e) => this.handleUpdate(post, e)}>Update
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-danger"
                                        onClick={(e) => this.handleDelete(post, e)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        );
    }
}

export default Todo;