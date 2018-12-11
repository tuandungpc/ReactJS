
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
        this.handleTitleChange=this.handleTitleChange.bind(this);
        this.handleSubjectChange=this.handleSubjectChange.bind(this);
        this.state={
            title:'',
            subject:''
        };
    }
    componentDidMount(){
        document.getElementById('addHyperLink').className = "active";
        document.getElementById('homeHyperlink').className = "";
        this.getPostWithId();
    }

    addPost(){
        axios.post('/addPost', {
            title: this.state.title,
            subject: this.state.subject,
            id: this.state.id
        })
        .then((response) =>{
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
        .then((response) => {
            if (response){
                self.setState({title:response.data.title});
                self.setState({subject:response.data.subject});
            }
        })
        .catch((error) => {
            console.log('error is', error);
        })
    }

    handleTitleChange(e){
        this.setState({title:e.target.value})
    }
    handleSubjectChange(e){
        this.setState({subject:e.target.value})
    }
    render(){
        return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
              <br styles="clear:both" />
                <div className="form-group">
                  <input type="text" value={this.state.title} onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
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
      
      this.state = {
        posts:[]
      };
    }
    
    updatePost(id){
        hashHistory.push('/addPost/' + id);
    }
    

    componentDidMount(){
      var self = this;
 
      axios.post('/getPost', {
       
      })
      .then(function (response) {
        self.setState({posts:response.data})
        
      })
      .catch(function (error) {
        console.log('error is ',error);
      });

      document.getElementById('homeHyperlink').className = "active";
      document.getElementById('addHyperLink').className = "";
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
                                <i className="fas fa-times">&nbsp;</i>
                            </td>
                        </tr>
                    }.bind(this))
                }    
            </tbody>   
        </table>
      )
    }
}




ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={ShowPost} path="/"></Route>
        <Route component={AddPost} path="/addPost(/:id)"></Route>
    </Router>,
document.getElementById('app'));