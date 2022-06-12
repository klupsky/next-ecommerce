import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      {/* prop drill */}
      <Header
        productInCart={props.productInCart}
        setProductInCart={props.setProductInCart}
      />
      {
        // Page content
        props.children
      }
    </div>
  );
}
