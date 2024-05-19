import {React} from 'react'
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Traders from '../components/Traders';

export default function TraderPage() {
  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      <h1><center>Here is The list of our super Traders</center></h1>
      <Traders/>
      </div>
  );

}
