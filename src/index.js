import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";

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
      <table>
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

  handleTextoFiltroChange(e) {
    this.props.onTextoFiltroChange(e.target.value);
  }

  handleEnStockChange(e) {
    this.props.onEnStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Buscar..."
          value={this.props.textoFiltro}
          onChange={this.handleTextoFiltroChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.soloEnStock}
            onChange={this.handleEnStockChange}
          />{" "}
          Mostrar productos en stock
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
      <div>
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
    categoria: "Artículos Deportivos",
    precio: "$49.99",
    enStock: true,
    nombre: "Balón de Fútbol",
  },
  {
    categoria: "Artículos Deportivos",
    precio: "$9.99",
    enStock: true,
    nombre: "Pelota de Béisbol",
  },
  {
    categoria: "Artículos Deportivos",
    precio: "$29.99",
    enStock: false,
    nombre: "Balón de Básketbol",
  },
  { categoria: "Electrónica", precio: "$99.99", enStock: true, nombre: "iPod Touch" },
  { categoria: "Electrónica", precio: "$399.99", enStock: false, nombre: "iPhone 5" },
  { categoria: "Electrónica", precio: "$199.99", enStock: true, nombre: "Nexus 7" },
];

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<TablaProductosFiltrable productos={PRODUCTOS} />);
