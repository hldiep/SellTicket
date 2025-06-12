import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import SeeMore from "./components/Home/SeeMore";
import MovieDetailPage from "./components/Detail/MovieDetailPage";
import NavPromotion from "./components/Home/NavPromotion";
import Login from "./components/UserLogin/Login";
import Register from "./components/UserLogin/Register";
import ForgetPwd from "./components/UserLogin/ForgetPwd";
import Payment from "./components/Payment/Payment";
import PaymentMethod from "./components/Payment/PaymentMethod";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import InfoTicketSuccess from "./components/Payment/InfoTicketSuccess";
import NavIntro from "./components/Home/NavIntro";
import Contact from "./components/Home/Contact";
import ScrollToTop from "./ScrollToTop";
import PrivacyPolicy from "./components/Home/PrivacyPolicy";
import AQs from "./components/Home/AQs";
import VerifyCode from "./components/UserLogin/VerifyCode";
import ResetPassword from "./components/UserLogin/ResetPassword";
import Verification from "./components/UserLogin/Verification";
import Booking from "./components/Detail/Booking";
import TheaterManage from "./components/ManageTheater/TheaterManage";
import EmployeesManage from "./components/ManageEmployees/EployeesManage";
import CustomersManage from "./components/ManageCustomers/CustomersManage";
import InfoAccount from "./components/Account/InfoAccount";
import PurchaseHistory from "./components/Account/PurchaseHistory";
import Home from "./components/ManageFilm/Home";
import TicketReportManage from "./components/ManageTicketReport/TicketReportManage";
import RevenueByMovie from "./components/Revenue/RevenueByMovie";
import AddMovie from "./components/ManageFilm/AddMovie";
import ListMovie from "./components/ManageFilm/ListMovie";
import SliderManager from "./components/ManageFilm/SliderManager";
import MovieDetail from "./components/ManageFilm/MovieDetail";
import AddTheater from "./components/ManageTheater/AddTheater";
import RevenueByCinema from "./components/Revenue/RevenueByCinema";
import TheaterDetail from "./components/ManageTheater/TheaterDetail";
import Showtime from "./components/ManageShowtimes/Showtime";
import PhimDangChieu from "./components/Home/PhimDangChieu";
import PhimSapChieu from "./components/Home/PhimSapChieu";
import InfoAccountManage from "./components/ManageAccount/InfoAccountManage";
import UserLayout from "./layout/UserLayout";
import AddRoom from "./components/ManageTheater/AddRoom";
import EditRoom from "./components/ManageTheater/EditRoom";
import EditRoomPage from "./components/ManageTheater/EditRoomPage";
import AddTicketForm from "./components/ManageTicketReport/AddTicketForm";
import XuatChieu from "./components/ManageXuatChieu/XuatChieu";

function App() {
  return (
    <div>
      <ScrollToTop />
      {/* User */}
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="see-more" element={<SeeMore />} />
          <Route path="phim-dang-chieu" element={<PhimDangChieu />} />
          <Route path="phim-sap-chieu" element={<PhimSapChieu />} />
          <Route path="movie/:id" element={<MovieDetailPage />} />
          <Route path="dat-ve" element={<Booking />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="xac-minh" element={<Verification />} />
          <Route path="forgetPwd" element={<ForgetPwd />} />
          <Route path="ma-xac-minh" element={<VerifyCode />} />
          <Route path="doi-mat-khau" element={<ResetPassword />} />
          <Route path="payment" element={<Payment />} />
          <Route path="continue-payment" element={<PaymentMethod />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="payment-success-viewticket" element={<InfoTicketSuccess />} />
          <Route path="khuyen-mai" element={<NavPromotion />} />
          <Route path="gioi-thieu" element={<NavIntro />} />
          <Route path="lien-he" element={<Contact />} />
          <Route path="chinh-sach-bao-mat" element={<PrivacyPolicy />} />
          <Route path="cau-hoi" element={<AQs />} />
          <Route path="account" element={<InfoAccount />} />
          <Route path="lich-su-mua-hang" element={<PurchaseHistory />} />
        </Route>
        <Route path="/admin" element={<Home />} />
        <Route path="/doanh-thu-theo-phim" element={<RevenueByMovie />} />

        <Route path="/quan-ly-phim" element={<ListMovie />} />
        <Route path="/quan-ly-phim/them-phim" element={<AddMovie />} />
        <Route path="/quan-ly-phim/chi-tiet-phim/:id" element={<MovieDetail />} />
        <Route path="/quan-ly-phim/quanlyslider" element={<SliderManager />} />

        <Route path="/quan-ly-rap" element={<TheaterManage />} />
        <Route path="/quan-ly-rap/them-rap" element={<AddTheater />} />
        <Route path="/quan-ly-rap/them-rap/them-phong" element={<AddRoom />} />
        <Route path="quan-ly-rap/chi-tiet-rap/:id" element={<TheaterDetail />} />
        <Route path="/quan-ly-rap/chi-tiet-rap/:id/chi-tiet-phong/:idRoom" element={<EditRoomPage />} />
        <Route path="quan-ly-rap/chi-tiet-rap/phong" element={<EditRoom />} />
        <Route path="quan-ly-lich-chieu" element={<Showtime />} />
        <Route path="quan-ly-suat-chieu" element={<XuatChieu />} />

        <Route path="quan-ly-ve" element={<TicketReportManage />} />
        <Route path="bao-cao-so-luong-ve/them-ve" element={<AddTicketForm />} />
        <Route path="doanh-thu-theo-phim" element={<RevenueByMovie />} />
        <Route path="doanh-thu-theo-rap" element={<RevenueByCinema />} />

        <Route path="quan-ly-nv" element={<EmployeesManage />} />
        <Route path="quan-ly-kh" element={<CustomersManage />} />

        <Route path="manager-account" element={<InfoAccountManage />} />

      </Routes>
    </div>
  );
}

export default App;