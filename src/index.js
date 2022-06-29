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
    const filas = [];
    let ultimaCategoria = null;

    this.props.productos.forEach((producto) => {
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
  render() {
    return (
      <form>
        <input type="text" placeholder="Buscar..." />
        <p>
          <input type="checkbox" /> Mostrar productos en stock
        </p>
      </form>
    );
  }
}

class TablaProductosFiltrable extends React.Component {
  render() {
    return (
      <div>
        <BarraBusqueda />
        <TablaProducto productos={this.props.productos} />
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
    enStock: true,
    nombre: "Balón de Básketbol",
  },
  { categoria: "Electrónica", precio: "$99.99", enStock: true, nombre: "iPod Touch" },
  { categoria: "Electrónica", precio: "$399.99", enStock: true, nombre: "iPhone 5" },
  { categoria: "Electrónica", precio: "$199.99", enStock: true, nombre: "Nexus 7" },
];

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<TablaProductosFiltrable productos={PRODUCTOS} />);
