import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TabBar from './components/TabBar'
import Footer from './components/Footer'
import { Profile, Home, Product, Regist, Login, Detail, Wishlist, Transaction, Order, ManageProduct, ManageTransaction, ManageOther, AddProduct, EditProduct } from './pages'

class Routes extends Component {
    render(){
        return(
            <BrowserRouter>
                <TabBar />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/product" exact component={Product} />
                    <Route path="/login" component={Login}/>
                    <Route path="/regist" component={Regist}/>
                    <Route path="/detail" component={Detail} />
                    <Route path="/wishlist" component={Wishlist} />
                    <Route path="/transaction" component={Transaction} />
                    <Route path="/order" component={Order} />
                    <Route path="/manageproduct" component={ManageProduct} />
                    <Route path="/managetransaction" component={ManageTransaction} />
                    <Route path="/manageother" component={ManageOther} />
                    <Route path="/addproduct" component={AddProduct} />
                    <Route path="/editproduct" component={EditProduct} />
                </Switch>
                <Footer />
            </BrowserRouter>
        )
    }
}

export default Routes;