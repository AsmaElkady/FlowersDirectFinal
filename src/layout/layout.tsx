import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar/navbar.tsx";
import Footer from "../components/footer/footer.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartApi } from "../redux/slices/cartApi.ts";
import type { AppDispatch } from "../redux/store.ts";
import { fetchFavApi } from "../redux/slices/favSlice.ts";

export default function LayOut() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchCartApi());
        dispatch(fetchFavApi());
    }, [dispatch]);
    return (
        <>
            <NavbarComponent />
            <Outlet />
            <Footer />
        </>
    )
}