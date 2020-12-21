import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/app'


class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading: true
    };
    this.db = firebase.firestore();
  }

  componentDidMount(){
    this.db.collection("products")
    .onSnapshot(Snapshot => {
      const products =Snapshot.docs.map(doc => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({products : products,
      loading : false})
    });
  }

  handleIncreaseQuantity = (product) => {
    
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // })

    const docRef=this.db.collection("products").doc(products[index].id);
    docRef
    .update({ qty: products[index].qty +1})
    .then(() => {
      console.log("Document updated successfully");
    })
    .catch(error => {
      console.log(error);
    });
  }
  handleDecreaseQuantity = (product) => {
    
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // })
    const docRef=this.db.collection("products").doc(products[index].id);
    docRef
    .update({ qty: products[index].qty -1})
    .then(() => {
      console.log("Document updated successfully");
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  handleDeleteProduct = id => {
   // const { products } = this.state;

    const docRef = this.db.collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("Deleted sucessfully");
      })
      .catch(err => {
        console.log(err);
      });

    // const items = products.filter(product => product.id !== id);

    // this.setState({
    //   products: items
    // });
  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if(product.qty>0){
        cartTotal = cartTotal + product.qty * product.price
    }
    return '';
    });
      

    return cartTotal;
  }

  addProduct = () => {
    this.db
    .collection("products")
    .add({
      img:"",
      price:909,
      qty:3,
      title:"anything"
    })
    //it returns a promise and this is how to handle promise in React
    .then(docRef =>{
      docRef.get().then(Snapshot =>{
        console.log("Products has been added",Snapshot.data());
      });
    })
    .catch(error =>{
      console.log(error);
    });
  };

  render () {
    const { products , loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20, borderRadius: '2%' }}>
          Add a Product
        </button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        { loading && <h1>Loading Products.....</h1>}
        <div style={ {padding: 10, fontSize: 20} }>
          TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
