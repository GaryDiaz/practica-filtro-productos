import React from "react";
import ReactDOM from "react-dom/client";
import M from "materialize-css";
import "./css/style.min.css";
//import "./css/index.css";

class FilaCategoriaProducto extends React.Component {
  render() {
    const categoria = this.props.categoria;
    return (
      <tr>
        <th colSpan="2">{categoria}</th>
      </tr>
    );
  }
}

class FilaProducto extends React.Component {
  render() {
    const producto = this.props.producto;
    const nombre = producto.enStock ? (
      producto.nombre
    ) : (
      <span style={{ color: "red" }}>{producto.nombre}</span>
    );
    return (
      <tr>
        <td>{nombre}</td>
        <td>{producto.precio}</td>
      </tr>
    );
  }
}

class TablaProducto extends React.Component {
  render() {
    const textoFiltro = this.props.textoFiltro;
    const soloEnStock = this.props.soloEnStock;

    const filas = [];
    let ultimaCategoria = null;

    this.props.productos.forEach((producto) => {
      if (producto.nombre.indexOf(textoFiltro) === -1) {
        return;
      }
      if (soloEnStock && !producto.enStock) {
        return;
      }
      if (producto.categoria !== ultimaCategoria) {
        filas.push(
          <FilaCategoriaProducto
            categoria={producto.categoria}
            key={producto.categoria}
          />
        );
      }
      filas.push(<FilaProducto producto={producto} key={producto.nombre} />);
      ultimaCategoria = producto.categoria;
    });

    return (
      <table className="highlight">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>{filas}</tbody>
      </table>
    );
  }
}

class BarraBusqueda extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextoFiltroChange = this.handleTextoFiltroChange.bind(this);
    this.handleEnStockChange = this.handleEnStockChange.bind(this);
  }

  componentDidMount() {
    M.updateTextFields();
  }

  componentDidUpdate() {
    M.updateTextFields();
  }

  handleTextoFiltroChange(e) {
    this.props.onTextoFiltroChange(e.target.value);
  }

  handleEnStockChange(e) {
    this.props.onEnStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <div className="input-field">
          <input
            type="text"
            id="txtBuscar"
            value={this.props.textoFiltro}
            onChange={this.handleTextoFiltroChange}
          />
          <label htmlFor="txtBuscar">Buscar</label>
        </div>
        <p>
          <label>
            <input
              type="checkbox"
              checked={this.props.soloEnStock}
              onChange={this.handleEnStockChange}
            />{" "}
            <span>Mostrar productos en stock</span>
          </label>
        </p>
      </form>
    );
  }
}

class TablaProductosFiltrable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textoFiltro: "",
      soloEnStock: false,
    };
  }

  handleTextoFiltroChange = (textoFiltro) => {
    this.setState({
      textoFiltro: textoFiltro,
    });
  };

  handleEnStockChange = (soloEnStock) => {
    this.setState({
      soloEnStock: soloEnStock,
    });
  };

  render() {
    return (
      <div className="container">
        <BarraBusqueda
          textoFiltro={this.state.textoFiltro}
          soloEnStock={this.state.soloEnStock}
          onTextoFiltroChange={this.handleTextoFiltroChange}
          onEnStockChange={this.handleEnStockChange}
        />
        <TablaProducto
          productos={this.props.productos}
          textoFiltro={this.state.textoFiltro}
          soloEnStock={this.state.soloEnStock}
        />
      </div>
    );
  }
}

const PRODUCTOS = [
  {
    categoria: "Art??culos Deportivos",
    precio: "$49.99",
    enStock: true,
    nombre: "Bal??n de F??tbol",
  },
  {
    categoria: "Art??culos Deportivos",
    precio: "$9.99",
    enStock: true,
    nombre: "Pelota de B??isbol",
  },
  {
    categoria: "Art??culos Deportivos",
    precio: "$29.99",
    enStock: false,
    nombre: "Bal??n de B??sketbol",
  },
  { categoria: "Electr??nica", precio: "$99.99", enStock: true, nombre: "iPod Touch" },
  { categoria: "Electr??nica", precio: "$399.99", enStock: false, nombre: "iPhone 5" },
  { categoria: "Electr??nica", precio: "$199.99", enStock: true, nombre: "Nexus 7" },
];

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<TablaProductosFiltrable productos={PRODUCTOS} />);
