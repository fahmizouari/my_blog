import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PageCounter from '../Pages/PageCounter/PageCounter';
import PageListUser from '../Pages/PageUsers/PageListUsers';
import { PageHooks } from '../Pages/PageWithHooks/PageHooks';
import ListPosts from "../Pages/post/ListPosts";

const MainRoute = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ListPosts} />
          <Route exact path="/posts" component={ListPosts} />
          <Route exact path="/users" component={PageListUser} />
          <Route exact path="/counter" component={PageCounter} />
          <Route exact path="/counterHooks" component={PageHooks} />
          <Route exact path="*" component={ListPosts} />
        </Switch>
      </Router>
    );
  };
  export default MainRoute;