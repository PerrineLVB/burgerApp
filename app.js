// créer un élément en JS classique
// const titre = document.createElement('h1');
// titre.setAttribute('id', 'titreJS');
// titre.classList.add('text-center');
// titre.innerText = 'Hello World !';

// créer un composant React sans JSX
// const titre2 = React.createElement('h1', { id: "titreReact", className: "text-center" }, "Hello World of React !")

// avec JSX
// const titre3 = <h1 id="titreJSX" className="text-center">Hello World of JSX !</h1>

// composant avec une fonction, à noter : on l'appelle avec la syntace <Component /> (mettre une majuscule) (fonction fléchée)
// const Titre4 = (props) => <h1 id="titreFC" className="text-center">{props.content}</h1>

// composant dans une classe
// class Titre5 extends React.Component {
//     state = {
//         content: "Mon composant Class"
//     }
//     render() {
//         return (
//             <React.Fragment>
//                 <h1 className="text-center">{this.state.content}</h1>
//                 <button className="btn btn-primary">Mon Bouton</button>
//             </React.Fragment>
//         )
//     }
// }

const Product = (props) => {
    return <div className="card m-3">
        <div id={props.details.id} className="card-body text-center" style={{ width: 15 + 'rem' }}>
            <img src={props.details.img} className="card-img-top"></img>
            <h3 className="card-title text-start">{props.details.name}</h3>
            <h5 className="card-text text-end">{props.details.price}€</h5>
            <button onClick={props.addProduct} className="btn btn-outline-warning fa-solid fa-burger"></button>
        </div>
    </div>
}

const Order = (props) => {
    return <div className="row mb-2">
        <div className="col-5">{props.details.name}</div>
        <div className="col-3">{props.details.price}€</div>
        <div id={props.details.id} className="col-4"><button onClick={props.addProduct} className="btn btn-warning fa-solid fa-plus me-1"></button>{props.details.quantity}<button onClick={props.removeProduct} className="btn btn-warning fa-solid fa-minus ms-1"></button></div>
    </div>
}

class App extends React.Component {
    state = {
        products: [
            { id: 1, name: "Cheeseburger", price: 4.95, img: "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt5718be23ff804bbe/61d86677d562a95eb8bd4179/cheeseburger.png?auto=webp" },
            { id: 2, name: "CBO", price: 8.95, img: "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt9690f742e9764e1d/6216470a494e504b3ac7704a/CBO.png?auto=webp" },
            { id: 3, name: "Filet-O-Fish", price: 3.95, img: "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt6e07b794013d8694/61f0131b31d27121704958d1/FILET_O_FISH_-_2050.png?auto=webp" },
            { id: 4, name: "280", price: 7.95, img: "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt6f16eb3040712590/61a623cc5e4d8458d1a71e8f/090eeba3e36f2aeaf47e0b0a6eda8c880cae345d.png?auto=webp" },
            { id: 5, name: "Big Mac", price: 6.95, img: "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt4e32a970bffd0792/61d866010f60435c58f20a0a/big-mac.png?auto=webp" },
            { id: 6, name: "Big Tasty", price: 7.95, img: "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/bltd394865a471196df/63b43a1fe17c5d0f58a716f4/BIG_TASTY.png?auto=webp" },
            { id: 7, name: "Croque McDo", price: 2.95, img: "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt8f125a846d60b3e7/607ffe5cf77631234c4b45db/66789245c6dd98a5cd0730195536ee9b46c494bb.png?auto=webp" },
            { id: 8, name: "Nuggets (x4)", price: 1.95, img: "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt8e73c57a90276fd9/620fd69aab1b594c886855ca/SACHET_4_MCNUGGETS_DD.png?auto=webp" }
        ],
        ordered: []
    }

    addProduct = (e) => {
        const clickedElementId = e.target.parentNode.id; // renvoie l'id de la div dans laquelle est le btn
        const clickedProduct = this.state.products.find(element => element.id == clickedElementId); // cherche l'élément qui correspond à l'id de l'élément cliqué
        const copiedOrdered = [...this.state.ordered]; // on crée une copie du tableau à modifier avec le spread operator ... qui permet de créer une copie
        let orderedProduct = this.state.ordered.find(element => element.id == clickedElementId);
        if (!orderedProduct) {      // on check si le produit n'existe pas dans la liste des produits commandés
            orderedProduct = { ...clickedProduct }; // copie de l'objet concerné
            orderedProduct.quantity = 0;             // initialisation de sa quantité
            copiedOrdered.push(orderedProduct); // on ajoute l'élément cliqué au tableau copié
        }
        orderedProduct.quantity++;
        this.setState({ ordered: copiedOrdered });
    }

    removeProduct = (e) => {
        const clickedElementId = e.target.parentNode.id; // renvoie l'id de la div dans laquelle est le btn
        const copiedOrdered = [...this.state.ordered]; // on crée une copie du tableau à modifier avec le spread operator ... qui permet de créer une copie
        let orderedProduct = this.state.ordered.find(element => element.id == clickedElementId);
        if (orderedProduct.quantity > 1) {
            orderedProduct.quantity--;
            this.setState({ ordered: copiedOrdered });
        } else {
            const result = copiedOrdered.filter(item => item.id != clickedElementId)
            this.setState({ ordered: result });
        }

    }

    render() {
        const productsList = this.state.products.map(product =>
            <Product key={product.id} details={product} addProduct={this.addProduct} />
        )

        const orderedProducts = this.state.ordered.map(order =>
            <Order key={order.id} details={order} addProduct={this.addProduct} removeProduct={this.removeProduct} />
        )

        return (
            <div className="row">
                <div id="menu" className="d-flex flex-wrap justify-content-center border col-8">
                    {productsList}
                </div>
                <div id="order" className="border p-3 col-4 bg-white">
                    <h1 className="text-center">YOUR ORDER</h1>
                    <hr></hr>
                    {orderedProducts}
                    <hr></hr>
                    <h2>TOTAL :</h2>
                </div>
            </div>
        )
    }
}

// on rend l'élément dans le DOM en JS classique
const root = document.querySelector('#app');
// root.appendChild(titre);

// on rend l'élément dans le DOM via la méthode render() de ReactDOM
// ReactDOM.render(
//     titre3,
//     root
// );
// ReactDOM.render(
//     <Titre4 content="Le contenu du titre" />,
//     root
// );
// ReactDOM.render(
//     <Titre5 />,
//     root
// );

ReactDOM.render(
    <App />,
    root
);