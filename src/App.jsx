import RouteComponent from "Layout/Routes/RouteComponent";
import CartProvider from "Context/CartContext";
import BookMarksProvider from "Context/BookMarksContext";
import UserProvider from "Context/UserContext";
const App = () => {
  return (
    <UserProvider>
      <CartProvider >
        <BookMarksProvider>
          <RouteComponent />
        </BookMarksProvider>
      </CartProvider>
    </UserProvider>
  )
}

export default App;