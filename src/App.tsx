import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { FadeLoader } from "react-spinners";
import Header from "./components/Header";
import ScrollToTop from "./components/scrollTop";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const Favorites = lazy(() => import("./pages/Favorites"));
const EditProduct = lazy(()=> import("./pages/EditProduct"))
const NotFound = lazy(() => import("./pages/notFound/NotFound"));

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center h-[93vh]">
                  <FadeLoader />
                </div>
              }
            >
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center h-[93vh]">
                  <FadeLoader />
                </div>
              }
            >
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center h-[93vh]">
                  <FadeLoader />
                </div>
              }
            >
              <Products />
            </Suspense>
          }
        />
        <Route
          path="/products/:id"
          element={
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center h-[93vh]">
                  <FadeLoader />
                </div>
              }
            >
              <SingleProduct />
            </Suspense>
          }
        />
        <Route
          path="/create-product"
          element={
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center h-[93vh]">
                  <FadeLoader />
                </div>
              }
            >
              <CreateProduct />
            </Suspense>
          }
        />
        <Route
          path="/favorites"
          element={
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center h-[93vh]">
                  <FadeLoader />
                </div>
              }
            >
              <Favorites />
            </Suspense>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center h-[93vh]">
                  <FadeLoader />
                </div>
              }
            >
              <EditProduct />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center h-[93vh]">
                  <FadeLoader />
                </div>
              }
            >
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;
