
var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var browserHistory = window.ReactRouter.browserHistory;
var Link = window.ReactRouter.Link;

//Add Post
class AddPost extends React.Component{

    constructor(props){
        super(props);
        this.addPost = this.addPost.bind(this);
        this.getPostWithId = this.getPostWithId.bind(this);
        this.handleTitleChange=this.handleTitleChange.bind(this);
        this.handleSubjectChange=this.handleSubjectChange.bind(this);
        this.state={
            title:'',
            subject:'',
            id:''
        };
    }
    componentDidMount(){
        document.getElementById('addHyperLink').className = "nav-link active";
        document.getElementById('homeHyperlink').className = "nav-link";
        document.getElementById('profileHyperLink').className="nav-link";
        this.getPostWithId();
    }

    addPost(){
        axios.post('/addPost', {
            title: this.state.title,
            subject: this.state.subject,
            id: this.state.id
        })
        .then(function(response){
            console.log('response from add post is ', response);
            hashHistory.push('/')
        })
        .catch(function(error){
            console.log(error);
        });
    }

    getPostWithId(){
        var id = this.props.params.id;
        var self = this;

        axios.post('/getPostWithId', {
            id: id
        })
        .then(function(response) {
            console.log('get post with id ',response);
            if (response){
                self.setState({title:response.data.title});
                self.setState({subject:response.data.subject});
            }
        })
        .catch(function(error){
            console.log('error is', error);
        })
    }

    handleTitleChange(event){
        this.setState({title:event.target.value})
    };
    handleSubjectChange(event){
        this.setState({subject:event.target.value})
    };
    render(){
        return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
              <br styles="clear:both" />
                <div className="form-group">
                  <input value={this.state.title} onChange={this.handleTitleChange} className="form-control" type="text" id="title" name="title" placeholder="Title" required />
                </div>
            
                <div className="form-group">
                    <textarea value={this.state.subject} onChange={this.handleSubjectChange} className="form-control" type="textarea"  id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                </div>
                   
              <button type="button" onClick={this.addPost} id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
              </form>
          </div>
        </div>
        )
    }
}
//Show post
class ShowPost extends React.Component {
    constructor(props) {
      super(props);
      this.updatePost = this.updatePost.bind(this);
      this.deletePost = this.deletePost.bind(this);
      this.getPost = this.getPost.bind(this);
      this.state = {
        posts:[]
      };
    }
    
    updatePost(id){
        hashHistory.push('/addPost/' + id);
    }
    
    deletePost(id){
        if(confirm('Are you sure ?')){
          var self = this;
          axios.post('/deletePost', {
            id: id
          })
          .then(function (response) {
            self.getPost();
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
        }
    }

    getPost(){
        var self = this;
        axios.post('/getPost', {
        })
        .then(function (response) {
            console.log('response is ',response);
            self.setState({posts:response.data})
        })
        .catch(function (error) {
            console.log('error is ',error);
        });
    }

    componentDidMount(){
        this.getPost();

        document.getElementById('homeHyperlink').className = "nav-link active";
        document.getElementById('addHyperLink').className = "nav-link";
        document.getElementById('profileHyperLink').className="nav-link";
    }
    
    render() {
      return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Subject</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.posts.map(function(post, index){
                        return <tr key ={index} >
                            <td>{index + 1}</td>
                            <td>{post.title}</td>
                            <td>{post.subject}</td>
                            <td><i onClick={this.updatePost.bind(this,post._id)} className="fas fa-pencil-alt">&nbsp;</i></td>
                            <td>
                                <i onClick={this.deletePost.bind(this,post._id)} className="fas fa-times">&nbsp;</i>
                            </td>
                        </tr>
                    }.bind(this))
                }    
            </tbody>   
        </table>
      )
    }
}

class ShowProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.state = {
            name:'',
            email:'',
            password:'',
            id:''
        }
    }
    handleNameChange(e){
        this.setState({name:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    componentDidMount(){
        document.getElementById('addHyperLink').className="nav-link";
        document.getElementById('homeHyperlink').className="nav-link";
        document.getElementById('profileHyperLink').className="nav-link active";
        this.getProfile();
    }

    updateProfile(){
        var self = this;
        axios.post('/updateProfile', {
            name: this.state.name,
            password: this.state.password
        })
        .then(function(response){
            if(response){
                hashHistory.push('/')
            }
        })
        .catch(function(erro){
            console.log('error is, error');
        })
    }

    getProfile(){
        var self = this;
        axios.post('/getProfile', {
        })
        .then(function(response){
            if(response){
                self.setState({name:response.data.name});
                self.setState({email:response.data.email});
                self.setState({password:response.data.password});
            }
        })
        .catch(function(error){
            console.log('error is ', error);
        })    
    }
    render(){
        return (
            <div className="col-md-5">
                <div className="form-area">
                    <form action="" role="form">
                        <br styles="clear:both" />
                        <div className="fomr-group">
                            <input type="text" value={this.state.name} onChange={this.handleNameChange} className="form-control" placeholder="Name" required />
                        </div>
                        <div className="form-group">
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                        </div>
                        <button type="button" onClick={this.updateProfile} id="submit" name="submit" className="btn btn-primary float-right" >Update</button>
                    </form>
                </div>
            </div>
        )
    }
}



ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={ShowPost} path="/"></Route>
        <Route component={AddPost} path="/addPost(/:id)"></Route>
        <Route component={ShowProfile} path="/showProfile"></Route>
    </Router>,
document.getElementById('app'));